'use client';

import { ZokuProgram } from '@/api/solana';
import { ExplorerLink } from '@/components/dev/cluster';
import { useAnchorProvider, useCluster } from '@/provider';
import { getZokuProgram, getZokuProgramId } from '@project/anchor';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Cluster } from '@solana/web3.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';

// 导入需要的类型
import type { ChannelNftArgs, EpisodeArgs } from '@/api/solana/types';

export function useZokuProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const wallet = useWallet();
  const client = useQueryClient();

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

  const initUser = useMutation({
    mutationKey: ['zoku', 'initUser', { cluster }],
    mutationFn: async () => {
      const signature = await zokuProgram.initUser();
      client.invalidateQueries({ queryKey: ['zoku', 'users', { cluster }] });
      return signature;
    },
    onSuccess: (signature = '') => {
      console.log('initUser success');
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
    onSuccess: (signature = 'channelCreate success!') =>
      transactionToast(signature),
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
    mutationFn: async (args: { nickname: string; avatar: string }) => {
      const signature = await zokuProgram.updateUser(args);
      return signature;
    },
    onSuccess: (signature = 'updateUser success!') =>
      transactionToast(signature),
    onError: (error) => console.error(error),
  });
  const usersQuery = useQuery({
    queryKey: ['zoku', 'users', { cluster }],
    queryFn: () => zokuProgram.getUsers(),
  });

  return {
    program,
    programId,
    getProgramAccount,
    initUser,
    channelCreate,
    updateEp,
    channelMint,
    usersQuery,
  };
}

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
