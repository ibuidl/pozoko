import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelInfo } from 'src/channel/channel.entity';
import { EpisodeInfo } from 'src/episode/episode.entity';
import { ProgramService } from 'src/program/program.service';
import { UserInfo } from 'src/user/user.entity';
import { DataSource, In, LessThan, Repository } from 'typeorm';

@Injectable()
export class TasksService {
  MAX_RETRIES = 3;
  BATCH_SIZE = 5;
  private isAIProcessingRunning = false;
  private pinataGatewayUrl: string;
  constructor(
    private programService: ProgramService,
    private configService: ConfigService,
    @InjectRepository(ChannelInfo)
    private channelInfoRepository: Repository<ChannelInfo>,
    @InjectRepository(EpisodeInfo)
    private episodeRepository: Repository<EpisodeInfo>,
    @InjectRepository(UserInfo)
    private userRepository: Repository<UserInfo>,
    private dataSource: DataSource,
    // private pinata: PinataSDK,
  ) {
    // const pinataJwt = this.configService.get<string>('PINATA_JWT');
    // this.pinataGatewayUrl = this.configService.get<string>(
    //   'IPFS_GATEWAY_URL',
    //   'https://gateway.pinata.cloud/ipfs/',
    // );
    // if (!pinataJwt || !this.pinataGatewayUrl) {
    //   console.error('Pinata JWT or Gateway URL is not configured.');
    //   throw new Error(
    //     'Pinata JWT or Gateway URL must be configured in .env file.',
    //   );
    // }
    // this.pinata = new PinataSDK({
    //   pinataJwt: pinataJwt,
    //   pinataGateway: this.pinataGatewayUrl, // Though for get, the gateway is part of the URL constructed
    // });
  }

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
            owner: firstCreatorAddress,
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

        if (!channelEntity.main_creator_id) {
          console.warn(
            `Skipping channel ${channelPublicKey} with no main creator`,
          );
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
                  where: { owner: creatorPublicKey },
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

  @Cron(CronExpression.EVERY_MINUTE)
  async processEpisodeWithAI() {
    if (this.isAIProcessingRunning) {
      console.log(
        'Cron job (AI Processing) is already running. Skipping this execution.',
      );
      return;
    }
    this.isAIProcessingRunning = true;
    console.log('Starting AI processing cron job.');

    try {
      await this.processEpisodeBatch();
    } catch (error) {
      console.error('Critical error during AI processing cron job:', error);
    } finally {
      this.isAIProcessingRunning = false;
      console.log('Finished AI processing cron job run.');
    }
  }
  async processEpisodeBatch() {
    const episodesForThisAttempt =
      await this.findAndPrepareEpisodesForProcessing(this.BATCH_SIZE);

    if (episodesForThisAttempt.length === 0) {
      console.log('No episodes to process in this batch.');
      return;
    }

    console.log(
      `Prepared ${episodesForThisAttempt.length} episodes for processing attempt.`,
    );

    const processingPromises = episodesForThisAttempt.map((episode) =>
      this.processSingleEpisode(episode).catch((err) => {
        // Errors from processSingleEpisode are logged there.
        // This catch is for unexpected promise rejections from processSingleEpisode itself.
        console.error(
          `Unexpected issue with processing wrapper for episode ${episode.id}: ${err.message}`,
        );
      }),
    );

    await Promise.allSettled(processingPromises);
  }
  async findAndPrepareEpisodesForProcessing(
    limit: number,
  ): Promise<EpisodeInfo[]> {
    // 1. Find candidate IDs
    const candidateEpisodes = await this.episodeRepository.find({
      where: {
        is_ai_processed: false,
        ai_process_try_count: LessThan(this.MAX_RETRIES),
      },
      take: limit,
      order: { created_at: 'asc' }, // Or some other priority
    });

    if (candidateEpisodes.length === 0) {
      return [];
    }

    const episodeIdsToProcess = candidateEpisodes.map((e) => e.id);

    // 2. Increment retry_count for these candidates in a single update if possible,
    //    or loop if not. This marks them for the current attempt.
    //    The status remains UNFINISHED.
    try {
      await this.episodeRepository.increment(
        { id: In(episodeIdsToProcess), is_ai_processed: false }, // Criteria
        'ai_process_try_count', // Column to increment
        1, // Value to increment by
      );
    } catch (updateError) {
      console.error(
        `Error incrementing retry_count for batch: ${updateError.message}. Some episodes might not be processed this cycle.`,
      );
      // For simplicity, we'll proceed with a re-fetch. A more robust handler might try to identify which failed.
    }

    // 3. Re-fetch the episodes to get their updated retry_count and other data.
    // This ensures we work with the state that includes the incremented retry_count.
    const episodesToProcess = await this.episodeRepository.find({
      where: {
        id: In(episodeIdsToProcess), // Process only the ones we intended
        is_ai_processed: false, // They should still be UNFINISHED
        // retry_count will now be the incremented value
      },
    });

    // Filter out any that might have had their retry_count pushed >= MAX_RETRIES by the increment
    // (e.g., if MAX_RETRIES was 3, and a retry_count of 2 got incremented to 3, it's now at MAX_RETRIES)
    // or whose status somehow changed unexpectedly.
    return episodesToProcess.filter(
      (e) => e.ai_process_try_count <= 3 && e.is_ai_processed === false,
    );
  }

  async processSingleEpisode(episode: EpisodeInfo): Promise<void> {
    console.log(
      `Processing episode ${episode.id}, attempt number ${episode.ai_process_try_count} (max ${this.MAX_RETRIES})...`,
    );

    console.log(
      `The info of this episode, name: ${episode.name}, and CID is ${episode.metadata_cid}...`,
    );

    try {
      // --- Entire Process Starts Here ---
      console.debug(`Episode ${episode.id}: Simulating download...`);
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.debug(`Episode ${episode.id}: Simulating upload...`);
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.debug(`Episode ${episode.id}: Simulating AI summary...`);
      await new Promise((resolve) => setTimeout(resolve, 150));

      if (
        episode.id.includes('fail-typeorm') &&
        episode.ai_process_try_count <= 2
      ) {
        throw new Error(
          `Simulated TypeORM AI failure for episode ${episode.id} on attempt ${episode.ai_process_try_count}`,
        );
      }
      const summaryText = `TypeORM Summary for ${episode.id} (processed on attempt ${episode.ai_process_try_count})`;
      // --- Entire Process Ends Successfully ---

      await this.episodeRepository.update(episode.id, {
        is_ai_processed: true,
        ai_generated_summary: summaryText,
      });
      console.log(
        `Episode ${episode.id}: Successfully processed on attempt ${episode.ai_process_try_count}.`,
      );
    } catch (error) {
      console.warn(
        `Episode ${episode.id}: FAILED on attempt ${episode.ai_process_try_count}. Error: ${error.message}`,
      );

      if (episode.ai_process_try_count >= this.MAX_RETRIES) {
        console.error(
          `Episode ${episode.id} reached max retries (${this.MAX_RETRIES}) on attempt ${episode.ai_process_try_count}. Will not be retried further.`,
        );
      }
    }
  }
}

//   async downloadAudioWithGatewayUrl(
//     cid: string,
//     outputPath: string,
//   ): Promise<string> {
//     const url = `https://${this.pinataGatewayUrl}/ipfs/${cid}`;
//     console.log(`Attempting to download audio from URL: ${url}`);

//     try {
//       const response = await axios({
//         method: 'GET',
//         url: url,
//         responseType: 'stream',
//       });

//       if (!(response.data instanceof Readable)) {
//         console.error(
//           `Failed to retrieve readable stream from Gateway URL for CID: ${cid}`,
//         );
//         throw new Error(
//           'Failed to retrieve readable stream from Pinata Gateway.',
//         );
//       }

//       const outputDirectory = path.dirname(outputPath);

//       // Ensure output directory exists
//       if (!fs.existsSync(outputDirectory)) {
//         fs.mkdirSync(outputDirectory, { recursive: true });
//       }

//       const writer = fs.createWriteStream(outputPath);
//       streamPipeline(response.data, writer);

//       console.log(
//         `Audio file ${cid} downloaded successfully to ${outputPath} via Gateway URL.`,
//       );
//       return outputPath;
//     } catch (error) {
//       console.error(
//         `Error downloading audio ${cid} via Gateway URL: ${error.message}`,
//         error.stack,
//       );
//       if (axios.isAxiosError(error) && error.response) {
//         console.error(`Gateway response status: ${error.response.status}`);
//         console.error(
//           `Gateway response data: ${JSON.stringify(error.response.data)}`,
//         );
//       }
//       throw error;
//     }
//   }
// }
// function streamPipeline(data: Readable, writer: fs.WriteStream) {
//   throw new Error('Function not implemented.');
// }
