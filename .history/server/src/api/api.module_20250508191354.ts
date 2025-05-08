import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { UserService } from 'src/user/user.service';
import { ProgramModule } from 'src/program/program.module';
import { ChannelService } from 'src/channel/channel.service';
import { EpisodeService } from 'src/episode/episode.service';
import { RssFeedService } from 'src/rss/rss.service';

@Module({
  imports: [ProgramModule],
  controllers: [ApiController],
  providers: [
    ApiService,
    UserService,
    ChannelService,
    EpisodeService,
    RssFeedService,
  ],
})
export class ApiModule {}
