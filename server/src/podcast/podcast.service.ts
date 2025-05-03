import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ChannelInfo } from '../database/channel.entity';
import { EpisodeInfo } from '../database/episode.entity';
import { UserInfo } from '../database/user.entity';

@Injectable()
export class PodcastService {
  constructor(
    @InjectRepository(ChannelInfo)
    private channelRepository: Repository<ChannelInfo>,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(UserInfo)
    private userRepository: Repository<UserInfo>,
  ) {}

  // 搜索播客，支持合约地址、NFT名称、频道名称搜索
  async searchPodcast(searchParam: string) {
    // 判断是否为合约地址
    if (searchParam.length === 44) {
      // 合约地址格式为44个字符
      const channel = await this.channelRepository.findOne({
        where: { public_key: searchParam },
        relations: ['episodes', 'creator'],
      });
      
      if (channel) {
        return [channel];
      }
    }
    
    // 按名称搜索（NFT名称或频道名称）
    const channels = await this.channelRepository.find({
      where: [
        { name: ILike(`%${searchParam}%`) },
        { nft_symbol: ILike(`%${searchParam}%`) },
      ],
      relations: ['episodes', 'creator'],
    });
    
    return channels;
  }

  // 获取频道详细信息
  async getChannelInfo(contractAddress: string) {
    const channel = await this.channelRepository.findOne({
      where: { public_key: contractAddress },
      relations: ['episodes', 'creator', 'likers', 'subscribers'],
    });
    
    if (!channel) {
      return null;
    }
    
    return channel;
  }

  // 点赞频道
  async likeChannel(userId: number, channelId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [],
    });
    
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ['likers'],
    });
    
    if (!user || !channel) {
      return { success: false, message: '用户或频道不存在' };
    }
    
    // 检查用户是否已经点赞
    const alreadyLiked = channel.likers.some(liker => liker.id === userId);
    
    if (alreadyLiked) {
      // 取消点赞
      channel.likers = channel.likers.filter(liker => liker.id !== userId);
    } else {
      // 添加点赞
      channel.likers.push(user);
    }
    
    await this.channelRepository.save(channel);
    
    return {
      success: true,
      liked: !alreadyLiked,
      likeCount: channel.likers.length,
    };
  }

  // 订阅频道
  async subscribeChannel(userId: number, channelId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [],
    });
    
    const channel = await this.channelRepository.findOne({
      where: { id: channelId },
      relations: ['subscribers'],
    });
    
    if (!user || !channel) {
      return { success: false, message: '用户或频道不存在' };
    }
    
    // 检查用户是否已经订阅
    const alreadySubscribed = channel.subscribers.some(subscriber => subscriber.id === userId);
    
    if (alreadySubscribed) {
      // 取消订阅
      channel.subscribers = channel.subscribers.filter(subscriber => subscriber.id !== userId);
    } else {
      // 添加订阅
      channel.subscribers.push(user);
    }
    
    await this.channelRepository.save(channel);
    
    return {
      success: true,
      subscribed: !alreadySubscribed,
      subscriberCount: channel.subscribers.length,
    };
  }

  // 点赞剧集
  async likeEpisode(userId: number, episodeId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [],
    });
    
    const episode = await this.episodeRepository.findOne({
      where: { id: episodeId },
      relations: ['likers'],
    });
    
    if (!user || !episode) {
      return { success: false, message: '用户或剧集不存在' };
    }
    
    // 检查用户是否已经点赞
    const alreadyLiked = episode.likers.some(liker => liker.id === userId);
    
    if (alreadyLiked) {
      // 取消点赞
      episode.likers = episode.likers.filter(liker => liker.id !== userId);
    } else {
      // 添加点赞
      episode.likers.push(user);
    }
    
    await this.episodeRepository.save(episode);
    
    return {
      success: true,
      liked: !alreadyLiked,
      likeCount: episode.likers.length,
    };
  }

  // 订阅剧集
  async subscribeEpisode(userId: number, episodeId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [],
    });
    
    const episode = await this.episodeRepository.findOne({
      where: { id: episodeId },
      relations: ['subscribers'],
    });
    
    if (!user || !episode) {
      return { success: false, message: '用户或剧集不存在' };
    }
    
    // 检查用户是否已经订阅
    const alreadySubscribed = episode.subscribers.some(subscriber => subscriber.id === userId);
    
    if (alreadySubscribed) {
      // 取消订阅
      episode.subscribers = episode.subscribers.filter(subscriber => subscriber.id !== userId);
    } else {
      // 添加订阅
      episode.subscribers.push(user);
    }
    
    await this.episodeRepository.save(episode);
    
    return {
      success: true,
      subscribed: !alreadySubscribed,
      subscriberCount: episode.subscribers.length,
    };
  }
} 