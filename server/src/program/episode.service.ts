import { Injectable } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioMimeType, EpisodeInfo } from './episode.entity';
import { ChannelInfo } from './channel.entity';
import { check_transaction } from 'src/common/check_transaction';
import { RssFeedService } from './rss_feed.service';

@Injectable()
export class EpisodeService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
    private rssFeedService: RssFeedService,
  ) {}

  async verifyAndCompleteEpisode(
    txHash: string,
    supplementalData: {
      fileSize: number;
      mimeType: AudioMimeType;
      duration: number;
      description?: string;
      is_published?: boolean;
      pubDate?: number;
    },
  ): Promise<{ success: boolean; error?: string }> {
    const tx = await check_transaction(txHash, this.programService);

    const event = this.programService.parseEpisodeCreateEvent(
      tx.meta.logMessages,
    );
    if (!event) throw new Error('User creation not found in transaction');
    console.log('event:', event);

    try {
      const channel = await this.channelRepository.findOne({
        where: { public_key: event.channel.toString() },
      });
      await this.episodeRepository.upsert(
        {
          id: crypto.randomUUID(),
          name: event.episode_name,
          symbol: event.episode_symbol,
          metadata_cid: event.metadata_cid,
          created_at: event.created_at,
          description: supplementalData.description || '',
          reward: 0,
          fileSize: supplementalData.fileSize || 0,
          mimeType: supplementalData.mimeType || AudioMimeType.MP3,
          duration: supplementalData.duration || 0,
          is_published: supplementalData.is_published || false,
          pubDate: supplementalData.pubDate || null,
          channel_id: channel.id,
          creator_id: channel.main_creator_id,
          likers: [],
        },
        {
          conflictPaths: ['metadata_cid'],
        },
      );

      // if (supplementalData.is_published) {
      //   const updatedEpisode = await this.episodeRepository.findOne({
      //     where: { metadata_cid: event.metadata_cid },
      //     relations: ['channel'],
      //   });
      //   if (updatedEpisode) {

      //       this.rssFeedService.generateRssFeed(
      //         updatedEpisode.channel,
      //       ),
      //     }

      // }
      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

  //   async findByPublicKey(publicKey: string): Promise<UserInfo | null> {
  //     return this.channelRepository.findOne({
  //       where: { public_key: publicKey },
  //     });
  //   }

  //   async findByEmail(email: string): Promise<UserInfo | null> {
  //     return this.channelRepository.findOne({
  //       where: { email },
  //     });
  //   }

  //   async findAll(options?: {
  //     role?: UserRole;
  //     skip?: number;
  //     take?: number;
  //   }): Promise<[UserInfo[], number]> {
  //     const where = options?.role ? { role: options.role } : {};
  //     return this.channelRepository.findAndCount({
  //       where,
  //       skip: options?.skip || 0,
  //       take: options?.take || 10,
  //       order: { created_at: 'DESC' },
  //     });
  //   }

  async getChannelEpisodes(channelId: string, page: number, limit: number) {
    const episodes = await this.episodeRepository.find({
      where: { channel_id: channelId },
      skip: (page - 1) * limit,
      take: limit,
    });

    return episodes;
  }

  async likeEpisode(episodeId: string, userId: string) {
    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'likers')
      .of(episodeId)
      .add(userId);

    return { success: true, action: 'like', episodeId, userId };
  }

  async unlikeEpisode(episodeId: string, userId: string) {
    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'likers')
      .of(episodeId)
      .remove(userId);

    return { success: true, action: 'unlike', episodeId, userId };
  }

  async subscribeEpisode(episodeId: string, userId: string) {
    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'subscribers')
      .of(episodeId)
      .add(userId);

    return { success: true, action: 'subscribe', episodeId, userId };
  }

  async unsubscribeEpisode(episodeId: string, userId: string) {
    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'subscribers')
      .of(episodeId)
      .remove(userId);

    return { success: true, action: 'unsubscribe', episodeId, userId };
  }
}
