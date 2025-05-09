import { Controller, Get } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller()
export class AppController {
  constructor(private readonly channelService: ChannelService) {}
}
