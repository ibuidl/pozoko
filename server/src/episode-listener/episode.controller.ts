import { Controller, Get, Post, Query } from '@nestjs/common';
import { findByChannelIdDto, findByIdDto, userActionDto } from './episode.dto';
import { EpisodeService } from './episode.service';

@Controller('api/listener/episode')
export class EpisodeController {
  constructor(private readonly episodeService: EpisodeService) {}

  @Get('')
  async findById(@Query() dto: findByIdDto) {
    return this.episodeService.findById(dto);
  }

  @Get('list')
  async findByChannelId(@Query() dto: findByChannelIdDto) {
    return this.episodeService.findByChannelId(dto);
  }

  @Post('like')
  async likeEpisode(@Query() dto: userActionDto) {
    return this.episodeService.likeEpisode(dto);
  }

  @Post('unlike')
  async unlikeEpisode(@Query() dto: userActionDto) {
    return this.episodeService.unlikeEpisode(dto);
  }

  @Post('subscribe')
  async subscribeEpisode(@Query() dto: userActionDto) {
    return this.episodeService.subscribeEpisode(dto);
  }

  @Post('unsubscribe')
  async unsubscribeEpisode(@Query() dto: userActionDto) {
    return this.episodeService.unsubscribeEpisode(dto);
  }
}
