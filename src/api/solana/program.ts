import { Program } from '@coral-xyz/anchor';
import { Zoku } from '@project/anchor';
import { WalletContextState } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { signAndSendTransaction } from './transaction';
import { ChannelNftArgs, EpisodeArgs } from './types';

const USER_SEED_PREFIX = 'userAccount_v1';
const CHANNEL_SEED_PREFIX = 'channelInfo_v1';

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

  async initUser(args: { nickname: string; avatar: string }) {
    if (!this.wallet.publicKey) {
      return;
    }

    const accounts: any = {
      owner: this.wallet.publicKey,
    };

    const tx = await this.program.methods
      .initializeUser(args.nickname, args.avatar)
      .accounts(accounts)
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async channelCreate(args: ChannelNftArgs) {
    if (!this.wallet.publicKey) {
      return;
    }

    const accounts: any = {
      owner: this.wallet.publicKey,
    };

    const tx = await this.program.methods
      .channelNftCreate(args)
      .accounts(accounts)
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async channelMint(args: { amount: number }) {
    if (!this.wallet.publicKey) {
      return;
    }

    const accounts: any = {
      creator: this.wallet.publicKey,
    };

    const tx = await this.program.methods
      .channelNftMint(args.amount)
      .accounts(accounts)
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async updateEp(args: EpisodeArgs) {
    if (!this.wallet.publicKey) {
      return;
    }

    const tx = await this.program.methods
      .updateEp(args)
      .accounts({ creator: this.wallet.publicKey, channelInfo: args.channelPda })
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async updateUser(args: {
    userPda: PublicKey;
    nickname: string;
    avatar: string;
  }) {
    if (!this.wallet.publicKey) {
      return;
    }

    const tx = await this.program.methods
      .updateUser(args.nickname, args.avatar)
      .accounts({ userAccount: args.userPda })
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
  }

  async create_channel_model_config(args: any) {
    if (!this.wallet.publicKey) {
      return;
    }

    // 注意：此函数未在IDL中找到，可能需要自定义实现
    console.warn('create_channel_model_config: 函数未在IDL中定义');
    return null;

    /* 
    // 实际使用时解开注释并填写正确的方法名
    const accounts: any = {
      owner: this.wallet.publicKey,
    };
    
    const tx = await this.program.methods
      .实际方法名(args)
      .accounts(accounts)
      .transaction();

    return signAndSendTransaction({
      transaction: tx,
      connection: this.connection,
      wallet: this.wallet,
    });
    */
  }
}
