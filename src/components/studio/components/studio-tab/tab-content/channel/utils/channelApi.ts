import { Program } from '@coral-xyz/anchor';
import {
  WalletContextState,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';

import { Connection, PublicKey } from '@solana/web3.js';
// idl
import ZokuIDL from '../../../../../../../lib/program/idl/zoku.json';
import { Zoku } from '../../../../../../../lib/program/types/zoku';

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
): Promise<string> {
  try {
    const { connection } = useConnection();
    const { wallet } = useWallet();

    // Based on project requirements, import or build the program interface
    // This example is based on Anchor, adjust according to the actual project
    // const provider = new AnchorProvider(
    //   connection,
    //   wallet as any,
    //   AnchorProvider.defaultOptions(),
    // );

    // Import the actual program object
    // dev net
    // https://devnet.helius-rpc.com/?api-key=d6a656e9-ce97-496f-97d5-d00e66284c52

    const program = new Program(ZokuIDL as Zoku);
    console.log('Program initialized:', program.programId.toBase58());
    // Call the actual contract method

    console.log(useConnection, 'debug wallet ');
    // Example call:
    return await program.methods
      .channelNftCreate(args)
      .accounts({
        owner: program.programId.toBase58(),
      })
      .signers([wallet?.adapter.publicKey])
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
