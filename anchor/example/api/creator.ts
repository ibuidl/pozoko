import * as anchor from "@coral-xyz/anchor";
import { program } from "./wallet";

export async function initCreator(
  wallet: anchor.Wallet,
  nickname: string,
  avatar: string
) {
  return await program.methods
    .initializeCreator(nickname, avatar)
    .accounts({
      owner: wallet.publicKey,
    })
    .signers([wallet.payer])
    .rpc();
}
