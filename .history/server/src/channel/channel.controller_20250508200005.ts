import { Controller, Get, Post, Query } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('api/channel')
export class AppController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('init')
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
  @Post('like')
  async likeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.likeChannel(channelId, userId);
  }

  @Post('unlike')
  async unlikeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.unlikeChannel(channelId, userId);
  }

  @Post('subscribe')
  async subscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.subscribeChannel(channelId, userId);
  }

  @Post('unsubscribe')
  async unsubscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.channelService.unsubscribeChannel(channelId, userId);
  }
  @Get('info')
  async getChannelInfo(@Query('id') id: string) {
    return this.channelService.getChannelInfo(id);
  }
}
