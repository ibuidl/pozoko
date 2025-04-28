import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Zoku } from "../../target/types/zoku";

let provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.Zoku as Program<Zoku>;

export {program, provider};

export function useDefaultWallet(){

    return anchor.Wallet.local();
}