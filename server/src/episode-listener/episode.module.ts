import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeInfo } from '../episode/episode.entity';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeInfo])],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeListenerModule {}
