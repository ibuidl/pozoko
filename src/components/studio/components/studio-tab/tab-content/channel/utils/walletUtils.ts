import { WalletContextState } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import toast from 'react-hot-toast';

// Check if wallet is connected
export async function checkWalletConnection(
  wallet: WalletContextState,
): Promise<boolean> {
  if (!wallet.publicKey) {
    toast.error('Please connect your wallet first');
    // Try to connect wallet
    wallet.connect?.();
    return false;
  }
  return true;
}

// Check if wallet balance is enough
export async function checkWalletBalance(
  balance: number | undefined,
  requiredBalance: number,
): Promise<boolean> {
  if (!balance) {
    toast.error('Unable to get wallet balance');
    return false;
  }
  const balanceInSol = balance / LAMPORTS_PER_SOL;
  if (balanceInSol < requiredBalance) {
    toast.error(
      `Insufficient SOL balance. Required: ${requiredBalance} SOL, Current: ${balanceInSol.toFixed(
        2,
      )} SOL`,
    );
    return false;
  }

  return true;
}

// Send SOL transaction
export async function sendSolTransaction(
  transferSol: any,
  destinationAddress: string,
  amount: number,
): Promise<string | null> {
  try {
    const signature = await transferSol.mutateAsync({
      destination: new PublicKey(destinationAddress),
      amount: amount,
    });

    if (!signature) {
      toast.error('Payment failed. Please try again later');
      return null;
    }

    toast.success('Payment successful!');
    return signature;
  } catch (error: any) {
    console.error('Failed to send SOL transaction:', error);
    toast.error(`Payment failed: ${error?.message || 'Unknown error'}`);
    return null;
  }
}
