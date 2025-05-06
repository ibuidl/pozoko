import { Injectable } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AudioMimeType, EpisodeInfo } from './episode.entity';
import { ChannelInfo } from './channel.entity';

@Injectable()
export class EpisodeService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
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
    // check transaction
    const tx =
      await this.programService.program.provider.connection.getParsedTransaction(
        txHash,
        {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0,
        },
      );
    if (!tx) throw new Error('Transaction not found');
    console.log('Events:', tx.meta?.logMessages);

    const event = this.programService.parseEpisodeCreateEventEvent(
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
}
