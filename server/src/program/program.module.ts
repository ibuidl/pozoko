<<<<<<< Updated upstream
import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
=======
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AudenceInfo } from './audience.entity';
import { ChannelInfo } from './channel.entity';
import { CreatorInfo } from './creator.entity';
import { EpisodeInfo } from './episode.entity';
>>>>>>> Stashed changes
import { ProgramService } from './program.service';

@Global()
@Module({
<<<<<<< Updated upstream
  imports: [HttpModule],
  providers: [ProgramService],
  exports: [ProgramService],
=======
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
>>>>>>> Stashed changes
})
export class ProgramModule {}
