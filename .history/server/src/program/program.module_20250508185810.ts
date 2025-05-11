import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelInfo } from '../channel/channel.entity';
import { UserInfo } from '../user/user.entity';
import { EpisodeInfo } from '../episode/episode.entity';
import { ProgramService } from './program.service';
import { UserService } from '../user/user.service';
import { ChannelService } from '../channel/channel.service';
import { EpisodeService } from '../episode/episode.service';
import { RssFeedService } from '../rss/rss_feed.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ChannelInfo, EpisodeInfo, UserInfo]),
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
