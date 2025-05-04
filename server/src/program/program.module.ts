import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelInfo } from './channel.entity';
import { UserInfo } from './user.entity';
import { EpisodeInfo } from './episode.entity';
import { ProgramService } from './program.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ChannelInfo, EpisodeInfo, UserInfo]),
  ],
  providers: [ProgramService],
  exports: [ProgramService, TypeOrmModule],
})
export class ProgramModule {}
