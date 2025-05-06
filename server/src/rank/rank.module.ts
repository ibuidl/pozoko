import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankController } from './rank.controller';
import { RankService } from './rank.service';
import { UserInfo } from '../program/user.entity';
import { ChannelInfo } from '../program/channel.entity';
import { EpisodeInfo } from '../program/episode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo, ChannelInfo, EpisodeInfo])],
  controllers: [RankController],
  providers: [RankService],
})
export class RankModule {}
