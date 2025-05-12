import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpisodeInfo } from '../episode/episode.entity';
import { findByChannelIdDto, findByIdDto, userActionDto } from './episode.dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(EpisodeInfo)
    private readonly episodeRepository: Repository<EpisodeInfo>,
  ) {}

  async findById(dto: findByIdDto) {
    const episode = await this.episodeRepository.findOneOrFail({
      where: { id: dto.episodeId },
      select: {
        id: true,
        name: true,
        symbol: true,
        description: true,
        is_published: true,
        play_count: true,
        tip_amount: true,
        tip_count: true,
      },
    });
    return episode;
  }

  async findByChannelId(dto: findByChannelIdDto) {
    const { channelId, offset, limit } = dto;

    return this.episodeRepository.find({
      where: { channel_id: channelId },
      select: {
        id: true,
        name: true,
        symbol: true,
        description: true,
        is_published: true,
        play_count: true,
        tip_amount: true,
        tip_count: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async likeEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'likers')
      .of(episodeId)
      .add(userId);

    return { success: true, action: 'like', episodeId, userId };
  }

  async unlikeEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'likers')
      .of(episodeId)
      .remove(userId);

    return { success: true, action: 'unlike', episodeId, userId };
  }

  async collectEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'collectors')
      .of(episodeId)
      .add(userId);

    return { success: true, action: 'collect', episodeId, userId };
  }

  async uncollectEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'collectors')
      .of(episodeId)
      .remove(userId);

    return { success: true, action: 'uncollect', episodeId, userId };
  }

  async subscribeEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'subscribers')
      .of(episodeId)
      .add(userId);

    return { success: true, action: 'subscribe', episodeId, userId };
  }

  async unsubscribeEpisode(dto: userActionDto) {
    const { episodeId, userId } = dto;

    await this.episodeRepository
      .createQueryBuilder()
      .relation(EpisodeInfo, 'subscribers')
      .of(episodeId)
      .remove(userId);

    return { success: true, action: 'unsubscribe', episodeId, userId };
  }

  async playEpisode(id: string) {
    await this.episodeRepository.increment({ id }, 'play_count', 1);

    return { success: true, action: 'playCount', episodeId: id };
  }
}
