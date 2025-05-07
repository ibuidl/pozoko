import { Injectable } from '@nestjs/common';
import { ProgramService } from './program.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelInfo, TypeOfCost } from './channel.entity';
import { check_transaction } from 'src/common/check_transaction';

@Injectable()
export class ChannelService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
  ) {}

  async verifyAndCompleteChannel(
    txHash: string,
    supplementalData: {
      language: string;
      itunesType: string;
      category: string;
      subcategory: string;
    },
  ): Promise<{ success: boolean; error?: string }> {
    // check transaction
    const tx = await check_transaction(txHash, this.programService);

    const event = this.programService.parseChannelNftCreateEvent(
      tx.meta.logMessages,
    );
    if (!event) throw new Error('User creation not found in transaction');

    try {
      await this.channelRepository.upsert(
        {
          id: crypto.randomUUID(),
          public_key: event.public_key.toString(),
          name: event.name,
          symbol: event.symbol,
          description: '',
          avatar: '',
          nft_mint_account: event.channel_nft_mint.toString(),
          language: supplementalData.language || 'en',
          itunesType: supplementalData.itunesType || 'episodic',
          created_at: event.created_at.toNumber(),
          category: supplementalData.category || '',
          subcategory: supplementalData.subcategory || '',
          num_of_audios: 0,
          is_enabled: false,
          type_of_cost: TypeOfCost.Free,
          nft_mint_amount: 0,
          main_creator_id: null,
          creators: [],
        },
        {
          conflictPaths: ['public_key'],
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
