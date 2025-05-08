import { Controller, Get, Header, Post, Query } from '@nestjs/common';
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

  @Get('user/info')
  async getUserInfo(@Query('id') id: string) {
    return this.userService.getUserInfo(id);
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

  @Get('channel/info')
  async getChannelInfo(@Query('id') id: string) {
    return this.ChannelService.getChannelInfo(id);
  }

  @Get('user/channels')
  async getUserChannels(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ChannelService.getUserChannels(userId, page, limit);
  }

  @Post('channel/like')
  async likeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.ChannelService.likeChannel(channelId, userId);
  }

  @Post('channel/unlike')
  async unlikeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.ChannelService.unlikeChannel(channelId, userId);
  }

  @Post('channel/subscribe')
  async subscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.ChannelService.subscribeChannel(channelId, userId);
  }

  @Post('channel/unsubscribe')
  async unsubscribeChannel(
    @Query('channelId') channelId: string,
    @Query('userId') userId: string,
  ) {
    return this.ChannelService.unsubscribeChannel(channelId, userId);
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

  @Get('channel/episodes')
  async getChannelEpisodes(
    @Query('channelId') channelId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.episodeService.getChannelEpisodes(channelId, page, limit);
  }

  @Post('episode/like')
  async likeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.likeEpisode(episodeId, userId);
  }

  @Post('episode/unlike')
  async unlikeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.unlikeEpisode(episodeId, userId);
  }

  @Post('episode/subscribe')
  async subscribeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.subscribeEpisode(episodeId, userId);
  }

  @Post('episode/unsubscribe')
  async unsubscribeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.unsubscribeEpisode(episodeId, userId);
  }

  @Post('episode/verify_tip')
  async verifyTipEpisode(
    @Query('txHash') txHash: string,
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.verifyTipEpisode(txHash, episodeId, userId);
  }

  @Post('episode/verify_purchase')
  async verifyPurchaseEpisode(
    @Query('txHash') txHash: string,
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.verifyPurchaseEpisode(txHash, episodeId, userId);
  }

  @Get('rss/get_xml')
  @Header('Content-Type', 'application/rss+xml')
  @Header('Cache-Control', 'max-age=300')
  async getRssFeed(@Query('channelId') channelId: string) {
    const channel = await this.rssFeedService.getChannel(channelId);
    return await this.rssFeedService.generateRssFeed(channel);
  }
}
