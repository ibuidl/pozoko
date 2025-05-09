import { Controller, Get } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller()
export class AppController {
  @Get('rss/get_xml')
  @Header('Content-Type', 'application/rss+xml')
  @Header('Cache-Control', 'max-age=300')
  async getRssFeed(@Query('channelId') channelId: string) {
    const channel = await this.rssFeedService.getChannel(channelId);
    return await this.rssFeedService.generateRssFeed(channel);
  }
}
