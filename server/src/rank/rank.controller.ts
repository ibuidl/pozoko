import { Controller, Get, Query } from '@nestjs/common';
import { RankService } from './rank.service';
import { RankDto } from './rank.dto';

@Controller('api/rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get('nft-mint-count')
  async getNftMintCountRank(@Query() dto: RankDto) {
    return this.rankService.getNftMintCountRank(dto);
  }

  @Get('nft-reward')
  async getNftRewardRank(@Query() dto: RankDto) {
    return this.rankService.getNftRewardRank(dto);
  }
}
