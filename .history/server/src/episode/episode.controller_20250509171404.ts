import { Body, Controller, Post, Put, Query } from '@nestjs/common';
import { UpdateEpisodeDto } from 'src/dto/update_ep_dto';
import { AudioMimeType } from './episode.entity';
import { EpisodeService } from './episode.service';

@Controller('api/episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Post('init')
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

  @Put('update')
  async updateEpisode(
    @Query('metadataCid') metadataCid: string,
    @Query('userId') userId: string,
    @Body() updateData: UpdateEpisodeDto,
  ) {
    return this.episodeService.updateEpisode(metadataCid, updateData, userId);
  }

  @Post('like')
  async likeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.likeEpisode(episodeId, userId);
  }

  @Post('unlike')
  async unlikeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.unlikeEpisode(episodeId, userId);
  }

  @Post('subscribe')
  async subscribeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.subscribeEpisode(episodeId, userId);
  }

  @Post('unsubscribe')
  async unsubscribeEpisode(
    @Query('episodeId') episodeId: string,
    @Query('userId') userId: string,
  ) {
    return this.episodeService.unsubscribeEpisode(episodeId, userId);
  }
}
