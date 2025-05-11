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
      const signature = await zokuProgram.initUser(
        'testNickname3',
        'testAvatar3',
      );
      client.invalidateQueries({ queryKey: ['zoku', 'users', { cluster }] });
      return signature;
    },
    onSuccess: (signature = '') => transactionToast(signature),
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
