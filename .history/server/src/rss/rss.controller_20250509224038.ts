import { Controller, Get, Header, Query } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller('api/rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get('get_xml')
  @Header('Content-Type', 'application/rss+xml')
  @Header('Cache-Control', 'max-age=300')
  async getRssFeed(@Query('channelId') channelId: string) {
    const channel = await this.rssService.getChannel(channelId);
    return await this.rssService.generateRssFeed(channel);
  }

  @Get('feed_url')
  async getFeedUrl(@Query('channelId') channelId: string) {
    // 验证频道是否存在
    const channel = await this.rssService.getChannel(channelId);

    return {
      feedUrl: `${process.env.RSS_FEED_URL}/${channel.id}`,
      // 可选:返回更多信息
      channelName: channel.name,
      description: channel.description,
    };
  }
}
