import * as anchor from "@coral-xyz/anchor";
import { program } from "./wallet";
import { getProfileAddress } from "./profile";

import BN from "bn.js";


export async function createChannel(
    wallet:anchor.Wallet,
    channelTitle: string,
    image: string,
    channelSubType: number,
    channelType: number,
    description: string,
    channelCreateAt: BN,
){
    const profilePda = await getProfileAddress(wallet)

    return await program.methods.createChannel(
        {
            channelTitle,
            image,
            channelSubType,
            channelType,
            description,
            channelCreateAt
        }
    )
    .accounts({
        profileAccount:profilePda,
        authority: wallet.publicKey,
    })
    .signers([wallet.payer])
    .rpc();

}

export async function releaseNftForChannel(
    wallet:anchor.Wallet,
    channelTitle: string,
    image: string,
    channelSubType: number,
    channelType: number,
    description: string,
    channelCreateAt: BN,
){

    const channelInfoAccount = await getChannelInfoAccount(channelTitle, channelCreateAt, wallet)
    return await program.methods.releaseChannelNft(
        {
            channelTitle,
            image,
            channelSubType,
            channelType,
            description,
            channelCreateAt
        }
    )
    .accounts({
        channelInfoAccount: channelInfoAccount,
        authority: wallet.publicKey,
    })
    .signers([wallet.payer])
    .rpc();

}

export async function getChannelInfoAccount(
    title: string, createAt: BN, wallet: anchor.Wallet
) {
    const profilePda = await getProfileAddress(wallet)

    const [channelInfoAccount] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("channel_v1"),
            Buffer.from(title),
            Buffer.from(createAt.toString()),
            profilePda.toBuffer(),
        ],
        program.programId,
    );

    return channelInfoAccount;
}