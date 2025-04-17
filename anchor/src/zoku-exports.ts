// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import ZokuIDL from '../target/idl/zoku.json'
import type { Zoku } from '../target/types/zoku'

// Re-export the generated IDL and type
export { Zoku, ZokuIDL }

// The programId is imported from the program IDL.
export const ZOKU_PROGRAM_ID = new PublicKey(ZokuIDL.address)

// This is a helper function to get the Zoku Anchor program.
export function getZokuProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...ZokuIDL, address: address ? address.toBase58() : ZokuIDL.address } as Zoku, provider)
}

// This is a helper function to get the program ID for the Zoku program depending on the cluster.
export function getZokuProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Zoku program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return ZOKU_PROGRAM_ID
  }
}
