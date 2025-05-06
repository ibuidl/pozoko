import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelInfo } from './channel.entity';
import { UserInfo } from './user.entity';
import { EpisodeInfo } from './episode.entity';
import { ProgramService } from './program.service';
import { UserService } from './user.service';

import { ChannelService } from './channel.service';
import { EpisodeService } from './episode.service';
import { RssFeedService } from './rss_feed.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ChannelInfo, EpisodeInfo, UserInfo, RssFeed]),
  ],
  providers: [
    ProgramService,
    UserService,
    ChannelService,
    EpisodeService,
    RssFeedService,
  ],
  exports: [
    ProgramService,
    TypeOrmModule,
    UserService,
    ChannelService,
    EpisodeService,
    RssFeedService,
  ],
})
export class ProgramModule {}
