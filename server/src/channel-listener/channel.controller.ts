import { Controller, Get, Post, Query } from '@nestjs/common';
import { findByIdDto, findByUserIdDto, userActionDto } from './channel.dto';
import { ChannelService } from './channel.service';

@Controller('api/listener/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async findById(@Query() dto: findByIdDto) {
    return this.channelService.findById(dto);
  }

  @Get('list')
  async findByUserId(@Query() dto: findByUserIdDto) {
    return this.channelService.findByUserId(dto);
  }

  @Post('like')
  async likeChannel(@Query() dto: userActionDto) {
    return this.channelService.likeChannel(dto);
  }

  @Post('unlike')
  async unlikeChannel(@Query() dto: userActionDto) {
    return this.channelService.unlikeChannel(dto);
  }

  @Post('collect')
  async collectChannel(@Query() dto: userActionDto) {
    return this.channelService.collectChannel(dto);
  }

  @Post('uncollect')
  async uncollectChannel(@Query() dto: userActionDto) {
    return this.channelService.uncollectChannel(dto);
  }

  @Post('subscribe')
  async subscribeChannel(@Query() dto: userActionDto) {
    return this.channelService.subscribeChannel(dto);
  }

  @Post('unsubscribe')
  async unsubscribeChannel(@Query() dto: userActionDto) {
    return this.channelService.unsubscribeChannel(dto);
  }
}
