import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';

import { BN } from '@coral-xyz/anchor';
import Podcast from 'podcast';

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

    const feed = new Podcast({
      title: channel.name,
      description: channel.description,
      feedUrl: `${env_feed_url}/${channel.id}`,
      siteUrl: env_site_url,
      imageUrl: channel.avatar,
      docs: 'https://help.apple.com/itc/podcasts_connect/',
      author: channel.main_creator.nickname,
      managingEditor: channel.main_creator.email,
      webMaster: channel.main_creator.email,
      copyright: `© ${new Date().getFullYear()} ${channel.name}`,
      language: channel.language,
      categories: [channel.category].concat(
        channel.subcategory ? [channel.subcategory] : [],
      ),
      pubDate: new Date().toUTCString(),
      itunesAuthor: channel.main_creator.nickname,
      itunesSubtitle: channel.description,
      itunesSummary: channel.description,
      itunesOwner: {
        name: channel.main_creator?.nickname,
        email: channel.main_creator?.email,
      },
      itunesExplicit: false,
      itunesCategory: [
        {
          text: channel.category,
          subcats: channel.subcategory ? [{ text: channel.subcategory }] : [],
        },
      ],
      itunesImage: channel.avatar,
      itunesType: channel.itunesType,
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

      feed.addItem({
        title: episode.name,
        description: episode.description,
        url: `${env_ep_url}/${episode.id}`,
        guid: {
          guid: episode.id,
          isPermaLink: false,
        },
        date: new Date(
          getTimestamp(episode.pubDate || episode.created_at) * 1000,
        ).toUTCString(),
        enclosure: {
          url: `${env_ep_audio_url}/${episode.metadata_cid}`,
          size: episode.fileSize,
          type: episode.mimeType,
        },
        itunesAuthor: channel.main_creator?.nickname,
        itunesSubtitle: episode.name,
        itunesSummary: episode.description,
        itunesDuration: formatDuration(episode.duration),
        itunesImage: {
          url: episode.metadata_cid,
        },
        itunesEpisodeType: 'full',
        itunesExplicit: false,
        custom_elements: [
          { 'content:encoded': episode.description },
          { 'dc:creator': channel.main_creator?.nickname },
        ],
      });
    });

    return feed.buildXml('  ');
  }
}
