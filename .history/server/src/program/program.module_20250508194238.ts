import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelInfo } from '../channel/channel.entity';
import { UserInfo } from '../user/user.entity';
import { EpisodeInfo } from '../episode/episode.entity';
import { ProgramService } from './program.service';
import { UserService } from './user.service';
import { ChannelService } from './channel.service';
import { EpisodeService } from './episode.service';
import { RssFeedService } from './rss_feed.service';
import { EpisodeTipRecord, EpisodePurchaseRecord } from './transaction.entity';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ChannelInfo,
      EpisodeInfo,
      UserInfo,
      EpisodeTipRecord,
      EpisodePurchaseRecord,
    ]),
  ],
  providers: [ProgramService, UserService, ChannelService, EpisodeService],
  exports: [
    ProgramService,
    TypeOrmModule,
    UserService,
    ChannelService,
    EpisodeService,
  ],
})
export class ProgramModule {}
