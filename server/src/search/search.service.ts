import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { UserInfo } from '../program/user.entity';
import { ChannelInfo } from '../program/channel.entity';
import { EpisodeInfo } from '../program/episode.entity';
import { SearchDto } from './search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    @InjectRepository(ChannelInfo)
    private readonly channelRepository: Repository<ChannelInfo>,
    @InjectRepository(EpisodeInfo)
    private readonly episodeRepository: Repository<EpisodeInfo>,
  ) {}

  async search(dto: SearchDto) {
    const [users, channels, episodes] = await Promise.all([
      this.searchUsers(dto),
      this.searchChannels(dto),
      this.searchEpisodes(dto),
    ]);

    return {
      users,
      channels,
      episodes,
      pagination: {
        page: dto.page,
        limit: dto.limit,
      },
    };
  }

  async searchUsers(dto: SearchDto) {
    const { keyword, page, limit } = dto;

    const [items, total] = await this.userRepository.findAndCount({
      where: [
        { nickname: Like(`%${keyword}%`) },
        { public_key: Like(`%${keyword}%`) },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
    };
  }

  async searchChannels(dto: SearchDto) {
    const { keyword, page, limit } = dto;

    const [items, total] = await this.channelRepository.findAndCount({
      where: [
        { name: Like(`%${keyword}%`) },
        { symbol: Like(`%${keyword}%`) },
        { public_key: Like(`%${keyword}%`) },
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
    };
  }

  async searchEpisodes(dto: SearchDto) {
    const { keyword, page, limit } = dto;

    const [items, total] = await this.episodeRepository.findAndCount({
      where: [{ name: Like(`%${keyword}%`) }, { symbol: Like(`%${keyword}%`) }],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
    };
  }
}
