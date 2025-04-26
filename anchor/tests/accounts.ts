import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Zoku } from "../target/types/zoku";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";

export const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

export const wallet = provider.wallet as anchor.Wallet;
export const program = anchor.workspace.Zoku as Program<Zoku>;

export const [userAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("zoku_user"), wallet.publicKey.toBuffer()],
    program.programId
);

export const [podcastAccount1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("zoku_podcast"),
        Buffer.from("1"),
        wallet.publicKey.toBuffer(),
    ],
    program.programId
);

export const [podcastAccount2] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("zoku_podcast"),
        Buffer.from("2"),
        wallet.publicKey.toBuffer(),
    ],
    program.programId
);

export const [episodeAccount1] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("zoku_episode"),
        Buffer.from("1"),
        Buffer.from("1"),
        wallet.publicKey.toBuffer(),
    ],
    program.programId
);

export const [episodeAccount2] = anchor.web3.PublicKey.findProgramAddressSync(
    [
        Buffer.from("zoku_episode"),
        Buffer.from("1"),
        Buffer.from("2"),
        wallet.publicKey.toBuffer(),
    ],
    program.programId
);

export const [mintAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("zoku_nft"), Buffer.from("1"), wallet.publicKey.toBuffer()],
    program.programId
);

export const associatedTokenAccount = getAssociatedTokenAddressSync(
    mintAccount,
    wallet.publicKey
);
