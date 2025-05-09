import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { check_transaction } from 'src/common/check_transaction';
import { UpdateChannelDto } from 'src/dto/update_channel_dto';
import { RssService } from 'src/rss/rss.service';
import { Repository } from 'typeorm';
import { ProgramService } from '../program/program.service';
import { ChannelInfo, FeedItunesType, TypeOfCost } from './channel.entity';

@Injectable()
export class ChannelService {
  constructor(
    private readonly programService: ProgramService,
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
    private readonly rssService: RssService,
  ) {}

  async verifyAndCompleteChannel(
    txHash: string,
    supplementalData: {
      language: string;
      itunesType: FeedItunesType;
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
          itunesType: supplementalData.itunesType,
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

  async updateChannel(
    public_key: string,
    updateData: UpdateChannelDto,
    main_creator: string,
  ) {
    try {
      const channel = await this.channelRepository.findOne({
        where: { public_key },
        relations: ['main_creator'],
      });

      if (!channel) {
        throw new NotFoundException('channel is not found');
      }

      if (channel.main_creator.public_key !== main_creator) {
        throw new UnauthorizedException(
          'only channel main creator can update,but you are not',
        );
      }
      await this.channelRepository.upsert(
        {
          ...channel,
          ...updateData,
        },
        {
          conflictPaths: ['public_key'],
        },
      );

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'update failed',
      };
    }
  }

  async findById(id: string) {
    return this.channelRepository.findOne({
      where: { id },
    });
  }

  async findByUserId(userId: string, page: number, limit: number) {
    return this.channelRepository.find({
      where: { main_creator_id: userId },
      skip: (page - 1) * limit,
      take: limit,
    });
  }
}
