'use client';

import { Logo } from '@/components/common/Logo';
import { WalletButton } from '@/provider';

export const TopNav = () => (
  <>
    <div className="flex justify-between items-center px-5 py-2">
      <Logo />
      <WalletButton />
    </div>
    <div className="w-full h-px bg-gray-200" />
  </>
);
