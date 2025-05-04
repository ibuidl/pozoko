import * as anchor from "@coral-xyz/anchor";
import { program } from "./wallet";

export interface EpArgs {
  isPublished: boolean;
  name: string;
  symbol: string;
  metadataCid: string;
}

export async function updateEp(
  wallet: anchor.Wallet,
  args: EpArgs,
  channelAddress: anchor.web3.PublicKey
) {
  return await program.methods
    .updateEp(args)
    .accounts({
      creator: wallet.publicKey,
      channelInfo: channelAddress,
    })
    .signers([wallet.payer])
    .rpc();
}
