import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudenceInfo } from './audience.entity';
import { ChannelInfo } from './channel.entity';
import { CreatorInfo } from './creator.entity';
import { EpisodeInfo } from './episode.entity';
import { ProgramService } from './program.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ChannelInfo,
      EpisodeInfo,
      AudenceInfo,
      CreatorInfo,
    ]),
  ],
  providers: [ProgramService],
  exports: [ProgramService, TypeOrmModule],
})
export class ProgramModule {}
