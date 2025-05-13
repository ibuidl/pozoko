import { PublicKey } from '@solana/web3.js';

export type ChannelNftArgs = {
  name: string;
  symbol: string;
  url: string;
  description: string;
  creators: Array<{
    address: PublicKey;
    share: number;
    verified: boolean;
  }>;
  avatar: string;
  isEnabled: boolean;
  typeOfCost: { free: {} } | { paid: {} };
  sellerFeeBasisPoints: number;
};

export type EpisodeArgs = {
  isPublished: boolean;
  name: string;
  symbol: string;
  metadataCid: string;
};
