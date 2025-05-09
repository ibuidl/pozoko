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
