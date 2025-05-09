import { Controller, Get, Post, Query } from '@nestjs/common';
import { EpisodeService } from './episode.service';
import { AudioMimeType } from './episode.entity';

@Controller()
export class AppController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post('episode/init')
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
}
