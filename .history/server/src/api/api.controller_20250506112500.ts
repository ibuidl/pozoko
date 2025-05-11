import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from 'src/program/user.service';
import { ChannelService } from 'src/program/channel.service';
import { EpisodeService } from 'src/program/episode.service';
import { AudioMimeType } from 'src/program/episode.entity';
import { RssFeedService } from 'src/program/rss_feed.service';

@Controller('api')
export class ApiController {
  constructor(
    private userService: UserService,
    private ChannelService: ChannelService,
    private episodeService: EpisodeService,
    private rssFeedService: RssFeedService,
  ) {}
  @Post('user/complete')
  async completeUser(
    @Query('txHash') txHash: string,
    @Query('email') email: string,
    @Query('role') role?: number,
    @Query('description') description?: string,
  ) {
    return this.userService.verifyAndCompleteUser(txHash, {
      email,
      role,
      description,
    });
  }

  @Post('channel/complete')
  async completeChannel(
    @Query('txHash') txHash: string,
    @Query('language') language?: string,
    @Query('category') category?: string,
    @Query('itunesType') itunesType?: string,
    @Query('subcategory') subcategory?: string,
  ) {
    return this.ChannelService.verifyAndCompleteChannel(txHash, {
      language,
      itunesType,
      category,
      subcategory,
    });
  }
  @Post('episode/complete')
  async completeEpisode(
    @Query('txHash') txHash: string,
    @Query('fileSize') fileSize: number,
    @Query('mimeType') mimeType: AudioMimeType,
    @Query('duration') duration: number,
    @Query('description') description?: string,
    @Query('is_published') is_published?: boolean,
    @Query('pubDate') pubDate?: number,
  ) {
    return this.episodeService.verifyAndCompleteEpisode(txHash, {
      fileSize,
      mimeType,
      duration,
      description,
      is_published,
      pubDate,
    });
  }

  @Get('rss/getxml')
  async getRssFeed(@Query('channelId') channelId: string) {
    const xml = await this.rssFeedService.generateRssFeed(channelId);
    return xml;
  }
}
