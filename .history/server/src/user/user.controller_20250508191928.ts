import { Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api')
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('user/init')
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

  @Get('user/info')
  async getUserInfo(@Query('id') id: string) {
    return this.userService.getUserInfo(id);
  }
}
