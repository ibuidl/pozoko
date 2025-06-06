import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { ChannelInfo } from '../channel/channel.entity';
import { EpisodeInfo } from '../episode/episode.entity';
import { UserInfo } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelInfo, EpisodeInfo, UserInfo])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
