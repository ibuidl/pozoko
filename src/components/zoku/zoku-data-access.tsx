'use client'

import { getZokuProgram, getZokuProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useZokuProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getZokuProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getZokuProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['zoku', 'all', { cluster }],
    queryFn: () => program.account.zoku.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['zoku', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ zoku: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useZokuProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useZokuProgram()

  const accountQuery = useQuery({
    queryKey: ['zoku', 'fetch', { cluster, account }],
    queryFn: () => program.account.zoku.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['zoku', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ zoku: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['zoku', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ zoku: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['zoku', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ zoku: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['zoku', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ zoku: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
