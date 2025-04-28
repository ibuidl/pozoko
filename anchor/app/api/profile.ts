import * as anchor from "@coral-xyz/anchor";
import { program } from "./wallet";

export async function createProfile(
    wallet:anchor.Wallet,
    profilePicture: string,
    name: string,
    websiteUrl: string,
    bio: string,
    emil: string,
    xUrl: string,
    wrapcastUrl: string,
    magicEdenUrl: string,
    leamsUrl: string,
    discordUrl: string,
){
    return await program.methods
    .createProfile(
        {
        profilePicture,
        name,
        websiteUrl,
        bio,
        emil,
        xUrl,
        wrapcastUrl,
        magicEdenUrl,
        leamsUrl,
        discordUrl,
        }
    )
    .accounts({
        authority: wallet.publicKey,
    })
    .signers([wallet.payer])
    .rpc();
}

export async function getProfile(
    wallet: anchor.Wallet,
){
    const [profilePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("profile"), wallet.publicKey.toBuffer()],
        program.programId,
    );

    return await program.account.zoku.fetch(profilePda);
}

export async function getProfileAddress(
    wallet: anchor.Wallet,
){
    const [profilePda, _] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("profile"), wallet.publicKey.toBuffer()],
        program.programId,
    );

    return profilePda;
}
