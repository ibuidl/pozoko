import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';

import { BN } from '@coral-xyz/anchor';
import RSS from 'rss';

@Injectable()
export class RssService {
  constructor(
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
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
    if (channel.is_enabled !== true) {
      throw new BadRequestException(
        'channel status is disabled,please enable it first',
      );
    }
    const publishedEpisodes = channel.episodes.filter((ep) => ep.is_published);
    const env_feed_url = process.env.RSS_FEED_URL;
    const env_site_url = process.env.SITE_URL;
    const env_ep_url = process.env.EP_URL;
    const env_ep_audio_url = process.env.EP_AUDIO_URL;

    if (!env_feed_url || !env_site_url || !env_ep_url || !env_ep_audio_url) {
      throw new BadRequestException(
        'need to set env_feed_url, env_site_url, env_ep_url, env_ep_audio_url',
      );
    }

    const getTimestamp = (time: BN | number): number => {
      if (time instanceof BN) {
        return time.toNumber();
      }
      return time as number;
    };

    const rss = new RSS({
      title: channel.name,
      description: channel.description,
      feed_url: `${env_feed_url}/${channel.id}`,
      site_url: env_site_url,
      language: channel.language,
      generator: 'RSS for Node',
      pubDate: new Date(getTimestamp(channel.created_at) * 1000).toUTCString(),
      lastBuildDate: new Date().toUTCString(),
      copyright: `© ${new Date().getFullYear()} ${channel.name}`,
      itunesAuthor: channel.main_creator.nickname,
      itunesImage: {
        url: channel.avatar,
      },
      itunesExplicit: false,
      itunesCategory: [
        {
          text: channel.category,
          subcats: channel.subcategory ? [{ text: channel.subcategory }] : [],
        },
      ],
      itunesOwner: {
        name: channel.main_creator?.nickname,
        email: channel.main_creator?.email,
      },
      itunesType: channel.itunesType,
      customNamespaces: {
        itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
        dc: 'http://purl.org/dc/elements/1.1/',
        content: 'http://purl.org/rss/1.0/modules/content/',
        atom: 'http://www.w3.org/2005/Atom',
      },
    });

    publishedEpisodes.forEach((episode) => {
      const formatDuration = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return [hours, minutes, remainingSeconds]
          .map((val) => val.toString().padStart(2, '0'))
          .join(':');
      };

      rss.item({
        title: episode.name,
        description: episode.description,
        url: `${env_ep_url}/${episode.id}`,
        guid: {
          guid: episode.id,
          isPermaLink: false,
        },
        date: new Date(episode.pubDate || episode.created_at).toUTCString(),
        custom_elements: [
          { 'echo3:episodeId': episode.id },
          { 'echo3:channelId': channel.id },
          { 'echo3:duration': episode.duration },
          { 'echo3:fileSize': episode.fileSize },
        ],
        enclosure: {
          url: `${env_ep_audio_url}/${episode.metadata_cid}`,
          size: episode.fileSize,
          type: episode.mimeType,
        },
        itunesAuthor: channel.main_creator?.nickname,
        itunesSubtitle: episode.name,
        itunesSummary: episode.description,
        itunesDuration: episode.duration,
        itunesImage: episode.metadata_cid,
        itunesEpisodeType: 'full',
        itunesExplicit: false,
      });
    });

    return rss.xml({ indent: true });
  }
}
