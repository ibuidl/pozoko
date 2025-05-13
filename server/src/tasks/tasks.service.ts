import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelInfo } from 'src/channel/channel.entity';
import { EpisodeInfo } from 'src/episode/episode.entity';
import { ProgramService } from 'src/program/program.service';
import { UserInfo } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    private programService: ProgramService,
    @InjectRepository(ChannelInfo)
    private channelInfoRepository: Repository<ChannelInfo>,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(UserInfo)
    private userRepository: Repository<UserInfo>,
    private dataSource: DataSource,
  ) {}

  private parseTypeOfCost(typeOfCost: any): number {
    if ('free' in typeOfCost) return 0;
    if ('paid' in typeOfCost) return 1;
    throw new Error('Invalid type_of_cost');
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleUserSync() {
    console.log('start handleUserSync');
    const program = this.programService.program;
    const userAccounts = await program.account.userAccount.all();

    for (const userAccount of userAccounts) {
      try {
        const publicKey = userAccount.publicKey.toString();
        const existingUser = await this.userRepository.findOne({
          where: { public_key: publicKey },
        });
        const userData = {
          id: existingUser?.id,
          public_key: publicKey,
          owner: userAccount.account.owner.toString(),
          nickname: userAccount.account.nickname,
          avatar: userAccount.account.avatar,
          is_frozen: userAccount.account.isFrozen,
          created_at: userAccount.account.createdAt.toNumber(),
        };

        const savedUser = await this.userRepository.save(userData);
        console.log(
          `user ${existingUser ? 'update' : 'create'} successfully,ID: ${savedUser.id}`,
        );
      } catch (error) {
        console.error(
          `Error processing user ${userAccount.publicKey.toString()}:`,
          error,
        );
        continue;
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleChannelSync() {
    console.log('start handleChannelSync');
    const program = this.programService.program;
    const channelinfos = await program.account.channelInfo.all();

    for (const channelinfo of channelinfos) {
      try {
        const channelPublicKey = channelinfo.publicKey.toString();
        const existingChannel = await this.channelInfoRepository.findOne({
          where: { public_key: channelPublicKey },
        });
        const channelData = {
          id: existingChannel?.id,
          public_key: channelPublicKey,
          name: channelinfo.account.name,
          symbol: channelinfo.account.symbol,
          avatar: channelinfo.account.avatar,
          description: channelinfo.account.description,
          nft_mint_account: channelinfo.account.nftMintAccount.toString(),
          nft_mint_amount: channelinfo.account.nftMintAmount,
          num_of_audios: channelinfo.account.numOfAudios.toNumber(),
          is_enabled: channelinfo.account.isEnabled,
          type_of_cost: this.parseTypeOfCost(channelinfo.account.typeOfCost),
          created_at: channelinfo.account.createdAt.toNumber(),
          creators: channelinfo.account.creators.map((creator) => ({
            address: creator.address.toString(),
            share: creator.share,
            verified: creator.verified,
          })),
        };

        const savedChannel = await this.channelInfoRepository.save(channelData);
        console.log(
          `Channel ${existingChannel ? 'updated' : 'created'} with id: ${savedChannel.id}`,
        );

        if (channelinfo.account.creators?.length > 0) {
          const firstCreatorAddress =
            channelinfo.account.creators[0].address.toString();
          const creatorUser = await this.userRepository.findOneBy({
            public_key: firstCreatorAddress,
          });

          if (creatorUser) {
            await this.channelInfoRepository.update(
              { id: savedChannel.id },
              { main_creator_id: creatorUser.id },
            );
          }
        }
      } catch (error) {
        console.error(
          `Error processing channel ${channelinfo.publicKey.toString()}:`,
          error,
        );
        continue;
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleEpisodeSync() {
    console.log('start handleEpisodeSync');
    const program = this.programService.program;
    const channelinfos = await program.account.channelInfo.all();
    console.log(channelinfos);

    for (const channelinfo of channelinfos) {
      try {
        const channelPublicKey = channelinfo.publicKey.toString();

        const channelEntity = await this.channelInfoRepository.findOne({
          where: { public_key: channelPublicKey },
          relations: ['episodes'],
        });

        if (!channelEntity) {
          console.log(`channel is not exist: ${channelPublicKey}`);
          continue;
        }

        if (channelinfo.account.episodes?.length > 0) {
          for (const episode of channelinfo.account.episodes) {
            try {
              const existingEpisode = await this.episodeRepository.findOne({
                where: { metadata_cid: episode.metadataCid },
              });

              const episodeData = {
                id: existingEpisode?.id,
                metadata_cid: episode.metadataCid,
                name: episode.name,
                symbol: episode.symbol,
                created_at: episode.createdAt.toNumber(),
                is_published: episode.isPublished,
                reward: episode.rewards.toNumber(),
                channel: channelEntity,
                channel_id: channelEntity.id,
                creator_id: channelEntity.main_creator_id,
                rss_feed_id: null,
              };

              const savedEpisode =
                await this.episodeRepository.save(episodeData);
              console.log(
                ` ${existingEpisode ? 'update' : 'create'} successfully: ${savedEpisode.id}`,
              );

              if (channelinfo.account.creators?.[0]) {
                const creatorPublicKey =
                  channelinfo.account.creators[0].address.toString();
                const creator = await this.userRepository.findOne({
                  where: { public_key: creatorPublicKey },
                });

                if (creator) {
                  savedEpisode.creator = creator;
                  await this.episodeRepository.save(savedEpisode);
                  console.log(
                    `Update ep ${savedEpisode.id} ,Its creator is: ${creator.id}`,
                  );
                }
              }
            } catch (error) {
              console.error(`: ${episode.metadataCid}`, error);
              continue;
            }
          }
        }
      } catch (error) {
        console.error(
          `handle channel and ep error: ${channelinfo.publicKey.toString()} `,
          error,
        );
        continue;
      }
    }
  }
}
