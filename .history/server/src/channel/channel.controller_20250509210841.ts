import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { UpdateChannelDto } from 'src/dto/update_channel_dto';
import { FeedItunesType } from './channel.entity';
import { ChannelService } from './channel.service';

@Controller('api/channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Put('update/:pubkey')
  async updateChannel(
    @Param('pubkey') pubkey: string,
    @Body() updateData: UpdateChannelDto,
    @Headers('main_creator') main_creator: string,
  ) {
    return this.channelService.updateChannel(pubkey, updateData, main_creator);
  }

  @Post('init')
  async completeChannel(
    @Query('txHash') txHash: string,
    @Query('language') language?: string,
    @Query('category') category?: string,
    @Query('itunesType') itunesType?: FeedItunesType,
    @Query('subcategory') subcategory?: string,
    @Query('itunesExplicit') itunesExplicit?: string,
  ) {
    return this.channelService.verifyAndCompleteChannel(txHash, {
      language,
      itunesType,
      category,
      subcategory,
    });
  }

  @Get()
  async findById(@Query('id') id: string) {
    return this.channelService.findById(id);
  }

  @Get('list')
  async findByUserId(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.channelService.findByUserId(userId, page, limit);
  }
}
