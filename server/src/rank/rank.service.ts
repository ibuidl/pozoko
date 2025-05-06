import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ChannelInfo } from '../program/channel.entity';
import { RankDto } from './rank.dto';

@Injectable()
export class RankService {
  constructor(
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
  ) {}

  async getNftMintCountRank(dto: RankDto) {
    const { limit, offset } = dto;

    const [items, total] = await this.channelRepository.findAndCount({
      where: {
        nft_mint_amount: MoreThan(0),
      },
      order: {
        nft_mint_amount: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    return {
      items,
      total,
      pagination: {
        limit,
        offset,
      },
    };
  }

  async getNftRewardRank(dto: RankDto) {
    const { limit, offset } = dto;

    const channelRewardQb = this.channelRepository
      .createQueryBuilder('channel')
      .leftJoin('channel.episodes', 'episode')
      .select('channel.id', 'channelId')
      .addSelect('SUM(episode.reward) / 2', 'reward')
      .groupBy('channel.id')
      .having('reward > 0');

    const channelQb = this.channelRepository
      .createQueryBuilder('channel')
      .innerJoin(
        `(${channelRewardQb.getQuery()})`,
        'sub',
        'sub.channelId = channel.id',
      )
      .setParameters(channelRewardQb.getParameters())
      .select([
        'channel.id AS id',
        'channel.name AS name',
        'channel.description AS description',
        'channel.avatar AS avatar',
        'channel.public_key AS publicKey',
        'sub.reward AS reward',
      ])
      .orderBy('sub.reward', 'DESC')
      .limit(limit)
      .offset(offset);

    const items = await channelQb.getRawMany();

    return {
      items,
      pagination: {
        limit,
        offset,
      },
    };
  }
}
