import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChannelInfo } from '../channel/channel.entity';
import { findByIdDto, findByUserIdDto, userActionDto } from './channel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
  ) {}

  async findById(dto: findByIdDto) {
    return this.channelRepository.findOne({
      where: { id: dto.channelId },
      select: {
        id: true,
        name: true,
        symbol: true,
        description: true,
        avatar: true,
        play_count: true,
      },
    });
  }

  async findByUserId(dto: findByUserIdDto) {
    const { userId, offset, limit } = dto;

    return this.channelRepository.find({
      where: { main_creator_id: userId },
      select: {
        id: true,
        name: true,
        symbol: true,
        description: true,
        avatar: true,
        play_count: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async likeChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'likers')
      .of(channelId)
      .add(userId);

    return { success: true, action: 'like', channelId, userId };
  }

  async unlikeChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'likers')
      .of(channelId)
      .remove(userId);

    return { success: true, action: 'unlike', channelId, userId };
  }

  async collectChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'collectors')
      .of(channelId)
      .add(userId);

    return { success: true, action: 'collect', channelId, userId };
  }

  async uncollectChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'collectors')
      .of(channelId)
      .remove(userId);

    return { success: true, action: 'uncollect', channelId, userId };
  }

  async subscribeChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'subscribers')
      .of(channelId)
      .add(userId);

    return { success: true, action: 'subscribe', channelId, userId };
  }

  async unsubscribeChannel(dto: userActionDto) {
    const { channelId, userId } = dto;

    await this.channelRepository
      .createQueryBuilder()
      .relation(ChannelInfo, 'subscribers')
      .of(channelId)
      .remove(userId);

    return { success: true, action: 'unsubscribe', channelId, userId };
  }
}
