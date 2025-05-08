import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';

import RSS from 'rss';
import { BN } from '@coral-xyz/anchor';

@Injectable()
export class RssService {
  constructor(
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
  ) {}
  async getChannel(channelId: string) {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ['episodes', 'main_creator'],
    });

    if (!channel) {
      throw new Error('channel is not found');
    }
    return channel;
  }

  async generateRssFeed(channel: ChannelInfo): Promise<string> {
    const publishedEpisodes = channel.episodes.filter((ep) => ep.is_published);
    const env_feed_url = process.env.RSS_FEED_URL;
    const env_site_url = process.env.SITE_URL;
    const env_ep_url = process.env.EP_URL;
    const env_ep_audio_url = process.env.EP_AUDIO_URL;

    const getTimestamp = (time: BN | number): number => {
      if (time instanceof BN) {
        return time.toNumber();
      }
      return time as number;
    };

    const rss = new RSS({
      title: channel.name,
      description: channel.description || '',
      feed_url: `${env_feed_url}/${channel.id}`,
      site_url: env_site_url,
      language: channel.language || 'en',
      pubDate: new Date(getTimestamp(channel.created_at) * 1000).toUTCString(),
      itunesAuthor: channel.main_creator.nickname,
      itunesSummary: channel.description,
      itunesOwner: {
        name: channel.main_creator?.nickname,
        email: channel.main_creator?.email || '',
      },
      itunesImage: channel.avatar || '',
      itunesCategories: channel.category
        ? [
            {
              text: channel.category,
              subcategories: channel.subcategory
                ? [{ text: channel.subcategory }]
                : [],
            },
          ]
        : [],
      itunesType: channel.itunesType || 'episodic',
      itunesExplicit: false,
    });

    publishedEpisodes.forEach((episode) => {
      rss.item({
        title: episode.name,
        description: episode.description || '',
        url: `${env_ep_url}/${episode.id}`,
        guid: episode.id,
        date: new Date(episode.pubDate || episode.created_at).toUTCString(),
        custom_elements: [
          { 'echo3:episodeId': episode.id },
          { 'echo3:channelId': channel.id },
          { 'echo3:duration': episode.duration },
          { 'echo3:fileSize': episode.fileSize },
        ],
        enclosure: {
          url: `${env_ep_audio_url}/${episode.metadata_cid}`,
          size: episode.fileSize || 0,
          type: episode.mimeType || 'audio/mpeg',
        },
        itunesAuthor: channel.main_creator?.nickname,
        itunesSubtitle: episode.name,
        itunesSummary: episode.description || '',
        itunesDuration: episode.duration || 0,
        itunesImage: episode.metadata_cid || '',
        itunesEpisodeType: 'full',
        itunesExplicit: false,
      });
    });

    return rss.xml({ indent: true });
  }
}
