import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check_transaction } from 'src/common/check_transaction';
import { UpdateEpisodeDto } from 'src/dto/update_ep_dto';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';
import { ProgramService } from '../program/program.service';
import { AudioMimeType, EpisodeInfo } from './episode.entity';

@Injectable()
export class EpisodeService {
  constructor(
    private readonly programService: ProgramService,
    @InjectRepository(EpisodeInfo)
    private readonly episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
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

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { success: false, error: errorMessage };
    }
  }

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

  async updateEpisode(metadata_cid: string, updateData: UpdateEpisodeDto) {
    try {
      const episode = await this.episodeRepository.findOne({
        where: { metadata_cid },
      });

      if (!episode) {
        throw new NotFoundException('EP is not found');
      }

      const result = await this.episodeRepository.upsert(
        {
          ...episode,
          ...updateData,
        },
        {
          conflictPaths: ['metadata_cid'],
        },
      );
      if (updateData.is_published) {
        const updatedEpisode = await this.episodeRepository.findOne({
          where: { metadata_cid },
          relations: ['channel'],
        });

        if (updatedEpisode) {
          await this.rssFeedService.generateRssFeed(updatedEpisode.channel);
        }
      }

      return {
        success: true,
        data: result.generatedMaps[0],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '更新失败',
      };
    }
  }
}
