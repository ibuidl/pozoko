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
import { RssService } from '../rss/rss.service';

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
  providers: [
    ProgramService,
    UserService,
    ChannelService,
    EpisodeService,
    RssService,
  ],
  exports: [
    ProgramService,
    TypeOrmModule,
    UserService,
    ChannelService,
    EpisodeService,
    RssService,
  ],
})
export class ProgramModule {}
