'use client';

import { ZokuProgram } from '@/api/solana';
import { ExplorerLink } from '@/components/dev/cluster';
import { useAnchorProvider, useCluster } from '@/provider';
import { getZokuProgram, getZokuProgramId } from '@project/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

// 导入需要的类型
import type { ChannelNftArgs, EpisodeArgs } from '@/api/solana/types';

const USER_SEED_PREFIX = 'userAccount_v1';
const CHANNEL_SEED_PREFIX = 'channelInfo_v1';

export function useProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const provider = useAnchorProvider();
  const wallet = useWallet();

  const programId = useMemo(
    () => getZokuProgramId(cluster.network as Cluster),
    [cluster],
  );

  const program = useMemo(
    () => getZokuProgram(provider, programId),
    [provider, programId],
  );

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const zokuProgram = useMemo(
    () => new ZokuProgram({ program, connection, wallet }),
    [program, connection, wallet],
  );

  return {
    program,
    programId,
    getProgramAccount,
    wallet,
    cluster,
    zokuProgram,
  };
}

export const useZokuProgram = () => {
  const { zokuProgram, cluster } = useProgram();
  const transactionToast = useTransactionToast();

  const initUser = useMutation({
    mutationKey: ['zoku', 'initUser', { cluster }],
    mutationFn: async (args: { nickname: string; avatar: string }) => {
      const signature = await zokuProgram.initUser(args);
      return signature;
    },
    onSuccess: (signature = '') => {
      transactionToast(signature);
    },
    onError: (error) => console.error(error),
  });

  const channelMint = useMutation({
    mutationKey: ['zoku', 'channelMint', { cluster }],
    mutationFn: async (args: { amount: number }) => {
      const signature = await zokuProgram.channelMint(args);
      return signature;
    },
    onSuccess: (signature = 'channelMint success!') =>
      transactionToast(signature),
    onError: (error) => console.error(error),
  });

  const channelCreate = useMutation({
    mutationKey: ['zoku', 'channelCreate', { cluster }],
    mutationFn: async (args: ChannelNftArgs) => {
      const signature = await zokuProgram.channelCreate(args);
      return signature;
    },
    onSuccess: (signature = 'channelCreate success!') => {
      transactionToast(signature);
      console.log('channelCreate success!');
    },
    onError: (error) => console.error(error),
  });

  const updateEp = useMutation({
    mutationKey: ['zoku', 'updateEp', { cluster }],
    mutationFn: async (args: EpisodeArgs) => {
      const signature = await zokuProgram.updateEp(args);
      return signature;
    },
    onSuccess: (signature = 'updateEp success!') => transactionToast(signature),
    onError: (error) => console.error(error),
  });

  const updateUser = useMutation({
    mutationKey: ['zoku', 'updateUser', { cluster }],
    mutationFn: async (args: {
      userPda: PublicKey;
      nickname: string;
      avatar: string;
    }) => {
      const signature = await zokuProgram.updateUser(args);
      return signature;
    },
    onSuccess: (signature = 'updateUser success!') =>
      transactionToast(signature),
    onError: (error) => console.error(error),
  });

  return {
    initUser,
    channelCreate,
    updateEp,
    updateUser,
    channelMint,
  };
};

export const useUserPda = () => {
  const { program, wallet, cluster } = useProgram();

  const { data: userPda } = useQuery({
    queryKey: ['zoku', 'userPda', { cluster, publickey: wallet.publicKey }],
    enabled: !!wallet.publicKey,
    queryFn: async () => {
      const [userPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(USER_SEED_PREFIX), wallet.publicKey!.toBuffer()],
        program.programId,
      );

      return userPda;
    },
  });

  const userInfo = useQuery({
    queryKey: ['zoku', 'userInfo', { cluster, publickey: wallet.publicKey }],
    enabled: !!userPda,
    queryFn: async () => program.account.userAccount.fetch(userPda!),
  });

  return {
    userPda,
    userInfo,
    isUserInitialized: !!userPda,
  };
};

export const useChannelPda = (symbol: string | undefined) => {
  const { program, cluster } = useProgram();

  const { data: channelPda } = useQuery({
    queryKey: ['zoku', 'channelPda', { cluster, symbol }],
    enabled: !!symbol,
    queryFn: async () => {
      const [mintAccountPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(CHANNEL_SEED_PREFIX), Buffer.from(symbol!)],
        program.programId,
      );

      const [channelAccountPda] = PublicKey.findProgramAddressSync(
        [Buffer.from(CHANNEL_SEED_PREFIX), mintAccountPda.toBuffer()],
        program.programId,
      );

      return channelAccountPda;
    },
  });

  return {
    channelPda,
  };
};

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className="btn btn-xs btn-primary"
        />
      </div>,
    );
  };
}
