import * as anchor from "@coral-xyz/anchor";
import { program } from "./wallet";

export interface Creator {
  address: anchor.web3.PublicKey;
  verified: boolean;
  share: number;
}

export interface ChannelNftArgs {
  name: string;
  symbol: string;
  url: string;
  description: string;
  creators: Creator[];
  ipfsHash: string;
  isEnabled: boolean;
  typeOfCost: { free: {} } | { paid: {} };
  sellerFeeBasisPoints: number;
}

export async function initChannelEtf(
  wallet: anchor.Wallet,
  args: ChannelNftArgs
  //wallet02: anchor.web3.Keypair,
) {
  //   const signers = [wallet.payer];
  //   if (creator02 != null) {
  //     signers.push(creator02);
  //   }

  //   console.log(
  //     "交易签名者公钥:",
  //     signers.map((signer) => signer.publicKey.toString())
  //   );

  return await program.methods
    .channelNftCreate(args)
    .accounts({
      owner: wallet.publicKey,
    })
    .signers([wallet.payer])
    .rpc();
}

export async function ChannelEtfMint(
  wallet: anchor.Wallet,
  channelMintAccount: anchor.web3.PublicKey,
  amount: anchor.BN
) {
  return await program.methods
    .channelNftMint(amount)
    .accounts({
      creator: wallet.publicKey,
      channelMintAccount: channelMintAccount,
    })
    .signers([wallet.payer])
    .rpc();
}
