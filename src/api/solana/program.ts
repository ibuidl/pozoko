import { Program } from '@coral-xyz/anchor';
import { Zoku } from '@project/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection } from '@solana/web3.js';
import { signAndSendTransaction } from './transaction';

export class ZokuProgram {
  program: Program<Zoku>;
  connection: Connection;
  wallet: WalletContextState;

  constructor(options: {
    program: Program<Zoku>;
    connection: Connection;
    wallet: WalletContextState;
  }) {
    this.program = options.program;
    this.connection = options.connection;
    this.wallet = options.wallet;
  }

  async initUser(nickname: string, avatar: string) {
    if (!this.wallet.publicKey) {
      return;
    }

    const tx = await this.program.methods
      .initializeUser(nickname, avatar)
      .accounts({
        owner: this.wallet.publicKey,
      })
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async getUsers() {
    return this.program.account.userAccount.all();
  }
}
