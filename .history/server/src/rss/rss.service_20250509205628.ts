import { BN } from '@coral-xyz/anchor';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Podcast } from 'podcast';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';

@Injectable()
export class RssService {
  constructor(
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
  ) {}

  async getChannel(channelId: string): Promise<ChannelInfo> {
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ['episodes', 'main_creator'],
    });

    if (!channel) {
      throw new BadRequestException('Channel not found');
    }
    return channel;
  }

  async generateRssFeed(channel: ChannelInfo): Promise<string> {
    // Validate channel status
    if (channel.is_enabled !== true) {
      throw new BadRequestException(
        'Channel is disabled. Please enable it first.',
      );
    }

    // Validate environment variables
    const requiredEnvVars = {
      RSS_FEED_URL: process.env.RSS_FEED_URL,
      SITE_URL: process.env.SITE_URL,
      EP_URL: process.env.EP_URL,
      EP_AUDIO_URL: process.env.EP_AUDIO_URL,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      throw new BadRequestException(
        `Missing required environment variables: ${missingVars.join(', ')}`,
      );
    }

    // Filter published episodes
    const publishedEpisodes = channel.episodes.filter((ep) => ep.is_published);
    if (publishedEpisodes.length === 0) {
      throw new BadRequestException('No published episodes available');
    }

    // Helper functions
    const getTimestamp = (time: BN | number): number => {
      return time instanceof BN ? time.toNumber() : (time as number);
    };

    const formatDuration = (seconds: number): string => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);

      return hours > 0
        ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        : `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    // Create podcast feed
    const feed = new Podcast({
      title: channel.name,
      description: channel.description,
      feedUrl: `${requiredEnvVars.RSS_FEED_URL}/${channel.id}`,
      siteUrl: requiredEnvVars.SITE_URL,
      imageUrl: channel.avatar,
      docs: 'https://help.apple.com/itc/podcasts_connect/',
      author: channel.main_creator.nickname,
      managingEditor: channel.main_creator.email,
      webMaster: channel.main_creator.email,
      copyright: `© ${new Date().getFullYear()} ${channel.name}`,
      language: channel.language.toLowerCase(),
      categories: [channel.category].concat(
        channel.subcategory ? [channel.subcategory] : [],
      ),
      pubDate: new Date().toUTCString(),

      // iTunes specific fields
      itunesAuthor: channel.main_creator.nickname,
      itunesSubtitle: channel.description.substring(0, 255), // Apple's max length
      itunesSummary: channel.description,
      itunesOwner: {
        name: channel.main_creator.nickname,
        email: channel.main_creator.email,
      },
      itunesExplicit: channel.itunesExplicit || false,
      itunesCategory: [
        {
          text: channel.category,
          subcats: channel.subcategory ? [{ text: channel.subcategory }] : [],
        },
      ],
      itunesImage: channel.avatar,
      itunesType: channel.itunesType,
    });

    // Add episodes
    publishedEpisodes.forEach((episode) => {
      if (!episode.metadata_cid) {
        console.warn(`Skipping episode ${episode.id} - missing metadata_cid`);
        return;
      }

      feed.addItem({
        title: episode.name,
        description: episode.description,
        url: `${requiredEnvVars.EP_URL}/${episode.id}`,
        guid: episode.id,
        date: new Date(
          getTimestamp(episode.pubDate || episode.created_at) * 1000,
        ),
        enclosure: {
          url: `${requiredEnvVars.EP_AUDIO_URL}/${episode.metadata_cid}`,
          size: episode.fileSize,
          type: episode.mimeType || 'audio/mpeg',
        },
        itunesAuthor: channel.main_creator.nickname,
        itunesSubtitle: episode.name.substring(0, 255),
        itunesSummary: episode.description,
        itunesDuration: formatDuration(episode.duration),
        itunesImage: `${requiredEnvVars.EP_AUDIO_URL}/${episode.metadata_cid}`,
        itunesExplicit: false,
        itunesEpisodeType: 'full',
        customElements: [
          { 'content:encoded': episode.description },
          { 'dc:creator': channel.main_creator.nickname },
        ],
      });
    });

    return feed.buildXml('  '); // 2-space indentation
  }
}
