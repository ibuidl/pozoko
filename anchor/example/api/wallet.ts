import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Zoku } from "../../target/types/zoku";

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Zoku as Program<Zoku>;
const wallet = provider.wallet as anchor.Wallet;
const connection = provider.connection;

export { provider, connection };

export function useDefaultWallet() {
  return anchor.Wallet.local();
}
export function useVisitorWallet() {
  const keypair = anchor.web3.Keypair.fromSecretKey(
    new Uint8Array([
      76, 39, 178, 2, 80, 192, 236, 106, 176, 133, 251, 247, 21, 204, 188, 229,
      249, 243, 3, 61, 192, 237, 105, 245, 199, 113, 185, 29, 121, 208, 216, 79,
      11, 2, 174, 91, 154, 3, 48, 129, 231, 156, 187, 50, 99, 160, 80, 116, 78,
      0, 12, 169, 0, 147, 34, 221, 142, 199, 21, 64, 136, 132, 130, 2,
    ])
  );

  //   const wallet = new anchor.Wallet(keypair);
  //   console.log("Public Key:", keypair.publicKey.toBase58());

  //   return wallet;
  return keypair;
}
