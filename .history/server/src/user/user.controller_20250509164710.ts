import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ChannelService } from 'src/channel/channel.service';
import { UpdateUserDto } from 'src/dto/update_user_dto';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly channelService: ChannelService,
  ) {}

  @Post('init')
  async completeUser(
    @Query('txHash') txHash: string,
    @Query('email') email: string,
    @Query('role') role?: number,
    @Query('description') description?: string,
  ) {
    return this.userService.verifyAndCompleteUser(txHash, {
      email,
      role,
      description,
    });
  }

  @Put('update')
  async updateUser(
    @Query('pubkey') pubkey: string,
    @Body()
    updateData: UpdateUserDto,
  ) {
    return this.userService.updateUser(pubkey, updateData);
  }

  @Get('info')
  async getUserInfo(@Query('id') id: string) {
    return this.userService.getUserInfo(id);
  }

  @Get('channels')
  async getUserChannels(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.channelService.getUserChannels(userId, page, limit);
  }
}
