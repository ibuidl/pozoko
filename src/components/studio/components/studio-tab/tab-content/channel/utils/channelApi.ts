import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';

import { Connection, PublicKey } from '@solana/web3.js';
// idl
import ZokuIDL from '../../../../../../../lib/program/idl/zoku.json';

// Define types needed for channel creation
export interface Creator {
  address: PublicKey;
  share: number;
  verified: boolean;
}

export interface ChannelNftArgs {
  name: string;
  symbol: string;
  url: string;
  description: string;
  creators: Creator[];
  avatar: string;
  isEnabled: boolean;
  typeOfCost: { free: {} } | { paid: {} };
  sellerFeeBasisPoints: number;
}

// Create channel function - using the real API
export async function initChannelNft(
  wallet: WalletContextState,
  connection: Connection,
  args: ChannelNftArgs,
): Promise<any> {
  try {
    if (!wallet.publicKey) {
      throw new Error('Wallet public key not found');
    }

    const provider = new AnchorProvider(
      connection,
      wallet as any,
      AnchorProvider.defaultOptions(),
    );
    const program = new Program(ZokuIDL as any, provider);

    program.methods
      .channelNftCreate(args)
      .accounts({
        owner: program.programId.toBase58(),
      })
      .signers([wallet.publicKey])
      .rpc();
  } catch (error) {
    console.error('Failed to call channel creation API:', error);
    throw error;
  }
}

// Prepare channel NFT args from form data
export function prepareChannelNftArgs(
  name: string,
  symbol: string,
  description: string,
  imageUrl: string,
  creatorPublicKey: PublicKey,
  feeBasisPoints: number,
): ChannelNftArgs {
  return {
    name,
    symbol,
    url: imageUrl,
    description,
    creators: [
      {
        address: creatorPublicKey,
        verified: false,
        share: 100,
      },
    ],
    avatar: imageUrl,
    isEnabled: true,
    typeOfCost: { paid: {} },
    sellerFeeBasisPoints: feeBasisPoints,
  };
}
