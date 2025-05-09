import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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

  @Put('update/:metadataCid')
  async updateEpisode(
    @Param('metadataCid') metadataCid: string,
    @Body() updateData: UpdateEpisodeDto,
    @Headers('userId') userId: string,
  ) {
    return this.episodeService.updateEpisode(metadataCid, updateData, userId);
  }

  @Get()
  async findById(@Query('id') id: string) {
    return this.episodeService.findById(id);
  }

  @Get('list')
  async findByChannelId(
    @Query('channelId') channelId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.episodeService.findByChannelId(channelId, page, limit);
  }
}
