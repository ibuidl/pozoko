import { Injectable } from '@nestjs/common';
import { ProgramService } from '../program/program.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelInfo, TypeOfCost } from './channel.entity';
import { check_transaction } from 'src/common/check_transaction';

@Injectable()
export class ChannelService {
  constructor(
    private readonly programService: ProgramService,
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
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

  async getUserChannels(userId: string, page: number, limit: number) {
    const channel = await this.channelRepository.find({
      where: { main_creator_id: userId },
      skip: (page - 1) * limit,
      take: limit,
    });

    return channel;
  }

  async getChannelInfo(id: string) {
    const channel = await this.channelRepository.findOne({
      where: { id },
    });

    return channel;
  }

  async likeChannel(channelId: string, userId: string) {
    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'likers')
      .of(channelId)
      .add(userId);

    return { success: true, action: 'like', channelId, userId };
  }

  async unlikeChannel(channelId: string, userId: string) {
    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'likers')
      .of(channelId)
      .remove(userId);

    return { success: true, action: 'unlike', channelId, userId };
  }

  async subscribeChannel(channelId: string, userId: string) {
    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'subscribers')
      .of(channelId)
      .add(userId);

    return { success: true, action: 'subscribe', channelId, userId };
  }

  async unsubscribeChannel(channelId: string, userId: string) {
    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'subscribers')
      .of(channelId)
      .remove(userId);

    return { success: true, action: 'unsubscribe', channelId, userId };
  }
}
