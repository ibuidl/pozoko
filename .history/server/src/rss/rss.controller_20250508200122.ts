import { Controller, Get, Header, Query } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller('api/rss')
export class AppController {
  constructor(private readonly rssService: RssService) {}

  @Get('get_xml')
  @Header('Content-Type', 'application/rss+xml')
  @Header('Cache-Control', 'max-age=300')
  async getRssFeed(@Query('channelId') channelId: string) {
    const channel = await this.rssService.getChannel(channelId);
    return await this.rssService.generateRssFeed(channel);
  }
}
