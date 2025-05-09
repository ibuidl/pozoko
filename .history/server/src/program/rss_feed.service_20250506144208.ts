import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelInfo } from './channel.entity';
import RSS from 'rss';

@Injectable()
export class RssFeedService {
  constructor(
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
  ) {}

  async generateRssFeed(channelId: string): Promise<string> {
    console.log('generateRssFeed', channelId);
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ['episodes', 'main_creator'],
    });

    if (!channel) {
      throw new Error('channel is not found');
    }

    const publishedEpisodes = channel.episodes.filter((ep) => ep.is_published);
    const env_feed_url = process.env.RSS_FEED_URL;
    const env_site_url = process.env.SITE_URL;

    const rss = new RSS({
      title: channel.name,
      description: channel.description || '',
      feed_url: `${env_feed_url}/${channel.id}`,
      site_url: env_site_url,
      language: channel.language || 'en',
      pubDate: channel.created_at,
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
        url: `https://your-domain.com/api/episodes/${episode.id}`,
        guid: episode.id,
        date: new Date(episode.pubDate || episode.created_at).toUTCString(),
        enclosure: {
          url: `https://your-domain.com/audio/${episode.metadata_cid}`,
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
