import { Controller, Get } from '@nestjs/common';
import { EpisodeService } from './episode.service';

@Controller()
export class AppController {
  constructor(private readonly episodeService: EpisodeService) {}
}
