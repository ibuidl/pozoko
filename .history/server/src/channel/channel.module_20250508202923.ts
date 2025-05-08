import { Module } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ChannelController],

  providers: [ChannelService],
})
export class ChannelModule {}
