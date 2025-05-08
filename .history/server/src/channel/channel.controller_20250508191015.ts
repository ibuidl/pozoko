import { Controller, Get, Post, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class AppController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('channel/init')
  async completeChannel(
    @Query('txHash') txHash: string,
    @Query('language') language?: string,
    @Query('category') category?: string,
    @Query('itunesType') itunesType?: string,
    @Query('subcategory') subcategory?: string,
  ) {
    return this.channelService.verifyAndCompleteChannel(txHash, {
      language,
      itunesType,
      category,
      subcategory,
    });
  }
  @Post('channel/like')
  async likeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.likeChannel(channelId, userId);
  }

  @Post('channel/unlike')
  async unlikeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.unlikeChannel(channelId, userId);
  }

  @Post('channel/subscribe')
  async subscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.subscribeChannel(channelId, userId);
  }

  @Post('channel/unsubscribe')
  async unsubscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.unsubscribeChannel(channelId, userId);
  }
  @Get('channel/info')
  async getChannelInfo(@Query('id') id: string) {
    return this.channelService.getChannelInfo(id);
  }

  @Get('user/channels')
  async getUserChannels(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.channelService.getUserChannels(userId, page, limit);
  }
}
