// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { RssFeed } from './rss_feed.entity';
// import { ChannelInfo } from './channel.entity';
// import { EpisodeInfo } from './episode.entity';
// import * as RSS from 'rss';

// @Injectable()
// export class RssFeedService {
//   constructor(
//     @InjectRepository(RssFeed)
//     private readonly rssFeedRepository: Repository<RssFeed>,
//   ) {}

//   async generateRssFeed(feedId: number): Promise<string> {
//     const feed = await this.rssFeedRepository.findOne({
//       where: { id: feedId },
//       relations: ['channel', 'episodes'],
//     });

//     if (!feed || !feed.channel || !feed.episodes) {
//       throw new Error('RSS feed not found or incomplete');
//     }

//     const channel = feed.channel;
//     const episodes = feed.episodes;

//     const rss = new RSS({
//       title: channel.name,
//       description: channel.description,
//       feed_url: `https://echo3.fm/rss/${feed.id}`,
//       site_url: 'https://echo3.fm',
//       language: channel.language || 'en',
//       pubDate: new Date().toUTCString(),
//       itunesAuthor: channel.main_creator,
//       itunesSummary: channel.description,
//       itunesOwner: {
//         name: channel.main_creator,
//         email: channel.main_creator.email,
//       },
//       itunesImage: channel.avatar,
//       itunesCategories: [
//         {
//           text: channel.category,
//           subcategories: channel.subcategory
//             ? [{ text: channel.subcategory }]
//             : [],
//         },
//       ],
//       itunesType: 'episodic',
//     });

//     episodes.forEach((episode) => {
//       rss.item({
//         title: episode.name,
//         description: episode.description,
//         url: `https://echo3.fm/episodes/${episode.id}`,
//         guid: episode.id.toString(),
//         date: episode.pubDate.toUTCString(),
//         enclosure: {
//           url: episode.metadata_cid,
//           size: episode.fileSize,
//           type: episode.mimeType,
//         },
//         itunesAuthor: channel.main_creator,
//         itunesSubtitle: episode.name,
//         itunesSummary: episode.description,
//         itunesDuration: episode.duration,
//         itunesImage: channel.avatar,
//         itunesEpisodeType: 'full',
//       });
//     });

//     return rss.xml({ indent: true });
//   }
// }
