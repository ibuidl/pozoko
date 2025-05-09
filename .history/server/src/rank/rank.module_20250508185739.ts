import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { UserInfo } from '../user/user.entity';
import { ChannelInfo } from '../channel/channel.entity';
import { EpisodeInfo } from '../program/episode.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, ChannelInfo, EpisodeInfo]),
    HttpModule,
  ],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
