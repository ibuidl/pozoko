import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelInfo } from '../database/channel.entity';
import { EpisodeInfo } from '../database/episode.entity';
import { UserInfo } from '../database/user.entity';
import { PodcastController } from './podcast.controller';
import { PodcastService } from './podcast.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelInfo, EpisodeInfo, UserInfo])],
  controllers: [PodcastController],
  providers: [PodcastService],
})
export class PodcastModule {} 