import { Injectable } from '@nestjs/common';
import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata';
import { fromWeb3JsPublicKey } from '@metaplex-foundation/umi-web3js-adapters';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { format } from 'node:path/win32';
import { ChannelInfo } from 'src/program/channel.entity';
import { EpisodeInfo } from 'src/program/episode.entity';
import { ProgramService } from 'src/program/program.service';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(ChannelInfo)
    private channelInfoRepository: Repository<ChannelInfo>,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const program = this.programService.program;
    const channelinfos = await program.account.channelInfo.all();

    for (const channelinfo of channelinfos) {
      try{
        

        await this.channelInfoRepository.upsert(
          {
            public_key: channelinfo.publicKey.toString(),
            name: channelinfo.account.name,
            symbol: channelinfo.account.symbol,
            image: st.image ?? '',
            description: channelinfo.account.description,
            main_creator: channelinfo.account.creators[0].toString(),
            create_at: channelinfo.account.createAt.toNumber(),
            status: ETFStatus.Active,
          },
          ['public_key'],
        );
      }
    }
  }

}
