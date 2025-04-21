import { Injectable } from '@nestjs/common';

import { AnchorProvider, Program, Wallet } from '@coral-xyz/anchor';
import { AccountInfo, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { Umi } from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';

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
    ];
  }
  get connection(): Connection {
    const endpoint =
      this.endpoints[Math.floor(Math.random() * this.endpoints.length)];
    console.log(endpoint);
    return new Connection(endpoint, 'confirmed');
  }

  get provider(): AnchorProvider {
    return new AnchorProvider(this.connection, this.visitorWallet);
  }

  get program(): Program<Zoku> {
    return new Program(ZokuIDL as Zoku, this.provider);
  }

  get umi(): Umi {
    return createUmi(this.connection.rpcEndpoint)
      .use(mplTokenMetadata())
      .use(walletAdapterIdentity(this.visitorWallet));
  }

  async fetchAllTokenAccountByMint(mint: PublicKey) {
    const accounts = await this.connection.getParsedProgramAccounts(
      TOKEN_PROGRAM_ID,
      {
        filters: [
          {
            dataSize: 165, // Token account 165 bytes
          },
          {
            memcmp: {
              offset: 0,
              bytes: mint.toBase58(), // Compare mint address
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
    // Get sync status
    const allSignatures = await this.connection.getSignaturesForAddress(
      new PublicKey(ata),
      { until: last_signature || undefined },
    );
    return allSignatures;
  }

  async fetchUserWalletAddress(ata: PublicKey) {
    const ataAccount = await getAccount(this.connection, ata);
    const ownerPublicKey = ataAccount.owner; // Get user pubkey
    return ownerPublicKey;
  }
}
