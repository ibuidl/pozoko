import { Injectable } from '@nestjs/common';
// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { AccountInfo, Connection, Keypair, PublicKey } from '@solana/web3.js';

import { getAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import ZokuIDL from '../../program/idl/zoku.json';
import type { Zoku } from '../../program/types/zoku';

@Injectable()
export class ProgramService {
  // Pubkey jyre3oLXdJhtT958Vx9w8Syf5mUuhXTRiqW8v47ZVcd
  public readonly visitorWallet: Wallet = new Wallet(
    Keypair.fromSecretKey(
      new Uint8Array([
        76, 39, 178, 2, 80, 192, 236, 106, 176, 133, 251, 247, 21, 204, 188,
        229, 249, 243, 3, 61, 192, 237, 105, 245, 199, 113, 185, 29, 121, 208,
        216, 79, 11, 2, 174, 91, 154, 3, 48, 129, 231, 156, 187, 50, 99, 160,
        80, 116, 78, 0, 12, 169, 0, 147, 34, 221, 142, 199, 21, 64, 136, 132,
        130, 2,
      ]),
    ),
  );

  private readonly endpoints: string[];

  constructor() {
    this.endpoints = [
      process.env.PROVIDER_ENDPOINT_02,
      process.env.PROVIDER_ENDPOINT_03,
    ].filter((endpoint): endpoint is string => endpoint !== undefined);
  }

  get connection(): Connection {
    const endpoint =
      this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    console.log(endpoint);
    return new Connection(endpoint, 'confirmed');
  }

  get provider(): AnchorProvider {
    const provider = new AnchorProvider(this.connection, this.visitorWallet);
    return provider;
  }

  get program(): Program<Zoku> {
    try {
      const program = new Program(ZokuIDL as Zoku, this.provider);
      console.log('Program initialized:', program.programId.toBase58());
      return program;
    } catch (error) {
      console.error('Error initializing program:', error);
      throw error;
    }
  }

  get umi(): Umi {
    return createUmi(this.connection.rpcEndpoint)
      .use(mplTokenMetadata())
      .use(walletAdapterIdentity(this.visitorWallet));
  }

  // 获取与该 Mint 地址相关的所有 token 账户
  async fetchAllTokenAccountByMint(mint: PublicKey) {
    const accounts = await this.connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165,
          },
          {
            memcmp: {
              offset: 0,
              bytes: mint.toBase58(),
            },
          },
        ],
      },
    );

    return accounts as {
      pubkey: PublicKey;
      account: AccountInfo<{
        parsed: {
          info: {
            tokenAmount: {
              uiAmount: number;
            };
          };
        };
      }>;
    }[];
  }
  async fetchNewTransactions(ata: string, last_signature: string) {
    const allSignatures = await this.connection.getSignaturesForAddress(
      new PublicKey(ata),
      { until: last_signature || undefined },
    );
    return allSignatures;
  }

  async fetchUserWalletAddress(ata: PublicKey) {
    const ataAccount = await getAccount(this.connection, ata);
    const ownerPublicKey = ataAccount.owner;
    return ownerPublicKey;
  }

  parseUserInitializedEvent(logs: string[]) {
    const hasInitialize = logs.some((l) =>
      l.includes('Instruction: InitializeUser'),
    );
    if (!hasInitialize) return null;

    const dataLine = logs.find((l) => l.startsWith('Program data:'));
    if (!dataLine) return null;

    const base64Data = dataLine.replace('Program data: ', '');

    try {
      const eventData = this.program.coder.events.decode(base64Data);

      if (eventData.name === 'userInitialized') {
        return {
          user: eventData.data.user,
          nickname: eventData.data.nickname,
          created_at: eventData.data.createdAt.toNumber(),
          owner: eventData.data.owner,
        };
      }
      return null;
    } catch (err) {
      console.error('Failed to decode event:', err);
      return null;
    }
  }

  parseChannelNftCreateEventEvent(logs: string[]) {
    const hasInitialize = logs.some((l) =>
      l.includes('Instruction: ChannelNftCreate'),
    );
    if (!hasInitialize) return null;

    const dataLine = logs.find((l) => l.startsWith('Program data:'));
    if (!dataLine) return null;

    const base64Data = dataLine.replace('Program data: ', '');

    try {
      const eventData = this.program.coder.events.decode(base64Data);
      console.log('eventData', eventData);

      if (eventData.name === 'channelNftCreateEvent') {
        return {
          channel_nft_mint: eventData.data.channelNftMint,
          created_at: eventData.data.createdAt,
          public_key: eventData.data.channelInfoAddress,
          name: eventData.data.channelName,
          symbol: eventData.data.channelSymbol,
        };
      }
      return null;
    } catch (err) {
      console.error('Failed to decode event:', err);
      return null;
    }
  }

  parseEpisodeCreateEventEvent(logs: string[]) {
    const hasInitialize = logs.some((l) => l.includes('Instruction: UpdateEp'));
    if (!hasInitialize) return null;

    const dataLine = logs.find((l) => l.startsWith('Program data:'));
    if (!dataLine) return null;

    const base64Data = dataLine.replace('Program data: ', '');

    try {
      const eventData = this.program.coder.events.decode(base64Data);
      console.log('eventData', eventData);

      if (eventData.name === 'episodeCreatedEvent') {
        return {
          episode_name: eventData.data.episodeName,
          episode_symbol: eventData.data.episodeSymbol,
          channel: eventData.data.channel.toString(),
          creator: eventData.data.creator.toString(),
          metadata_cid: eventData.data.metadataCid,
          created_at: eventData.data.createdAt.toNumber(),
        };
      }
      return null;
    } catch (err) {
      console.error('Failed to decode event:', err);
      return null;
    }
  }
}
