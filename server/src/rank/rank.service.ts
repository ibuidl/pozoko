import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { ChannelInfo } from '../program/channel.entity';
import { RankDto } from './rank.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { createHash } from 'crypto';

const PODCAST_INDEX_HOST = 'https://api.podcastindex.org';
const PODCAST_INDEX_USER_AGENT = 'Pozoko/v1.0';

@Injectable()
export class RankService {
  constructor(
    private readonly httpService: HttpService,
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

  async getHottestChannelRank(dto: RankDto) {
    const { limit, offset } = dto;

    const [items, total] = await this.channelRepository.findAndCount({
      where: {
        play_count: MoreThan(0),
      },
      order: {
        play_count: 'DESC',
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

  async getClassicHotChannelRank(dto: RankDto) {
    const { limit } = dto;
    const unixTime = Math.floor(Date.now() / 1000);
    const authorization = createHash('sha1')
      .update(
        process.env.PODCAST_INDEX_API_KEY +
          process.env.PODCAST_INDEX_API_SECRET +
          unixTime,
      )
      .digest('hex');

    const { data } = await firstValueFrom(
      this.httpService.get(`${PODCAST_INDEX_HOST}/api/1.0/podcasts/trending`, {
        params: {
          max: limit,
        },
        headers: {
          'User-Agent': PODCAST_INDEX_USER_AGENT,
          'X-Auth-Key': process.env.PODCAST_INDEX_API_KEY,
          'X-Auth-Date': unixTime,
          Authorization: authorization,
        },
      }),
    );

    return {
      items: data,
    };
  }
}
