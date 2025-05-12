import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check_transaction } from 'src/common/check_transaction';
import { UpdateEpisodeDto } from 'src/dto/update_ep_dto';
import { RssService } from 'src/rss/rss.service';
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
    private readonly rssService: RssService,
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
      const channel = await this.channelRepository.findOneOrFail({
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

  async updateEpisode(
    metadata_cid: string,
    updateData: UpdateEpisodeDto,
    userId: string,
  ) {
    try {
      const episode = await this.episodeRepository.findOneOrFail({
        where: { metadata_cid },
      });

      if (!episode) {
        throw new NotFoundException('EP is not found');
      }
      if (episode.creator_id !== userId) {
        throw new Error('User is not EP Creator');
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

      return {
        success: true,
        data: result.generatedMaps[0],
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'update failed ',
      };
    }
  }

  async findById(id: string) {
    return this.episodeRepository.findOneOrFail({
      where: { id },
    });
  }

  async findByChannelId(channelId: string, page: number, limit: number) {
    return this.episodeRepository.find({
      where: { channel_id: channelId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
