import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PodcastService } from './podcast.service';

@Controller('podcast')
export class PodcastController {
  constructor(private readonly podcastService: PodcastService) {}

  // 播客搜索API
  @Get('search')
  async searchPodcast(@Query('query') query: string) {
    if (!query || query.trim() === '') {
      return {
        success: false,
        message: '搜索参数不能为空',
        data: [],
      };
    }

    try {
      const results = await this.podcastService.searchPodcast(query);
      return {
        success: true,
        data: results,
      };
    } catch (error) {
      return {
        success: false,
        message: '搜索失败: ' + error.message,
        data: [],
      };
    }
  }

  // 获取频道信息API
  @Get('channel')
  async getChannelInfo(@Query('contractAddress') contractAddress: string) {
    if (!contractAddress || contractAddress.trim() === '') {
      return {
        success: false,
        message: '合约地址不能为空',
        data: null,
      };
    }

    try {
      const channelInfo = await this.podcastService.getChannelInfo(contractAddress);
      if (!channelInfo) {
        return {
          success: false,
          message: '频道不存在',
          data: null,
        };
      }

      return {
        success: true,
        data: channelInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: '获取频道信息失败: ' + error.message,
        data: null,
      };
    }
  }

  // 频道点赞API
  @Post('like-channel')
  async likeChannel(@Body() body: { userId: number; channelId: number }) {
    const { userId, channelId } = body;
    
    if (!userId || !channelId) {
      return {
        success: false,
        message: '用户ID和频道ID不能为空',
      };
    }

    try {
      const result = await this.podcastService.likeChannel(userId, channelId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: '操作失败: ' + error.message,
      };
    }
  }

  // 频道订阅API
  @Post('subscribe-channel')
  async subscribeChannel(@Body() body: { userId: number; channelId: number }) {
    const { userId, channelId } = body;
    
    if (!userId || !channelId) {
      return {
        success: false,
        message: '用户ID和频道ID不能为空',
      };
    }

    try {
      const result = await this.podcastService.subscribeChannel(userId, channelId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: '操作失败: ' + error.message,
      };
    }
  }

  // 剧集点赞API
  @Post('like-episode')
  async likeEpisode(@Body() body: { userId: number; episodeId: number }) {
    const { userId, episodeId } = body;
    
    if (!userId || !episodeId) {
      return {
        success: false,
        message: '用户ID和剧集ID不能为空',
      };
    }

    try {
      const result = await this.podcastService.likeEpisode(userId, episodeId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: '操作失败: ' + error.message,
      };
    }
  }

  // 剧集订阅API
  @Post('subscribe-episode')
  async subscribeEpisode(@Body() body: { userId: number; episodeId: number }) {
    const { userId, episodeId } = body;
    
    if (!userId || !episodeId) {
      return {
        success: false,
        message: '用户ID和剧集ID不能为空',
      };
    }

    try {
      const result = await this.podcastService.subscribeEpisode(userId, episodeId);
      return result;
    } catch (error) {
      return {
        success: false,
        message: '操作失败: ' + error.message,
      };
    }
  }
} 