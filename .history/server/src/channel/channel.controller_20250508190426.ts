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
    return this.ChannelService.getChannelInfo(id);
  }
}
