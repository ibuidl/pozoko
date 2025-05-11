import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeInfo } from '../episode/episode.entity';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeInfo])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelListenerModule {}
