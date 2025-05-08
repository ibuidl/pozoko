import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [ChannelService],
})
export class ChannelModule {}
