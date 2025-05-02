import { Injectable } from '@nestjs/common';
<<<<<<< Updated upstream

import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import { AccountInfo, Connection, Keypair, PublicKey } from '@solana/web3.js';
=======
// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
>>>>>>> Stashed changes
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
<<<<<<< Updated upstream
=======
import { AccountInfo, Connection, Keypair, PublicKey } from '@solana/web3.js';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    ];
  }
=======
    ].filter((endpoint): endpoint is string => endpoint !== undefined);
  }

>>>>>>> Stashed changes
  get connection(): Connection {
    const endpoint =
      this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    console.log(endpoint);
    return new Connection(endpoint, 'confirmed');
  }

  get provider(): AnchorProvider {
<<<<<<< Updated upstream
    return new AnchorProvider(this.connection, this.visitorWallet);
  }

  get program(): Program<Zoku> {
    return new Program(ZokuIDL as Zoku, this.provider);
=======
    const provider = new AnchorProvider(this.connection, this.visitorWallet);
    console.log(provider);
    return provider;
  }

  get program(): Program<Zoku> {
    try {
      console.log('Loading IDL:', ZokuIDL); // 打印 IDL 内容用于调试
      const program = new Program(ZokuIDL as Zoku, this.provider);
      console.log('Program initialized:', program.programId.toBase58()); // 输出程序地址验证成功
      return program;
    } catch (error) {
      console.error('Error initializing program:', error);
      throw error;
    }
>>>>>>> Stashed changes
  }

  get umi(): Umi {
    return createUmi(this.connection.rpcEndpoint)
      .use(mplTokenMetadata())
      .use(walletAdapterIdentity(this.visitorWallet));
  }

<<<<<<< Updated upstream
=======
  // 获取与该 Mint 地址相关的所有 token 账户
>>>>>>> Stashed changes
  async fetchAllTokenAccountByMint(mint: PublicKey) {
    const accounts = await this.connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
<<<<<<< Updated upstream
            dataSize: 165, // Token account 165 bytes
          },
          {
            memcmp: {
              offset: 0,
              bytes: mint.toBase58(), // Compare mint address
=======
            dataSize: 165, // token 账户的大小为 165 字节
          },
          {
            memcmp: {
              offset: 0, // mint 地址在账户数据的开始部分
              bytes: mint.toBase58(), // 比较 mint 地址
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    // Get sync status
=======
    // 获取同步状态
>>>>>>> Stashed changes
    const allSignatures = await this.connection.getSignaturesForAddress(
      new PublicKey(ata),
      { until: last_signature || undefined },
    );
    return allSignatures;
  }

  async fetchUserWalletAddress(ata: PublicKey) {
    const ataAccount = await getAccount(this.connection, ata);
<<<<<<< Updated upstream
    const ownerPublicKey = ataAccount.owner; // Get user pubkey
=======
    const ownerPublicKey = ataAccount.owner; // 直接获取用户公钥
>>>>>>> Stashed changes
    return ownerPublicKey;
  }
}
