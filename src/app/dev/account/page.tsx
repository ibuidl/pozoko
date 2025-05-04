'use client';

import { WalletButton } from '@/provider';
import { useWallet } from '@solana/wallet-adapter-react';
import { redirect } from 'next/navigation';

export default function AccountListPage() {
  const { publicKey } = useWallet();

  if (publicKey) {
    return redirect(`/dev/account/${publicKey.toString()}`);
  }

  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <WalletButton />
      </div>
    </div>
  );
}
