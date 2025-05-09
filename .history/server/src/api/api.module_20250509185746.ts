import { Module } from '@nestjs/common';
import { ChannelService } from 'src/channel/channel.service';
import { EpisodeService } from 'src/episode/episode.service';
import { ProgramModule } from 'src/program/program.module';
import { UserService } from 'src/user/user.service';
import { ApiService } from './api.service';

@Module({
  imports: [ProgramModule],
  controllers: [],
  providers: [ApiService, UserService, ChannelService, EpisodeService],
})
export class ApiModule {}
