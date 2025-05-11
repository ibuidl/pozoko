'use client';

import { ExplorerLink } from '@/components/dev/cluster';
import { AppHero } from '@/components/dev/common';
import { UserList } from '@/components/dev/program';
import { WalletButton } from '@/provider';
import { ellipsify } from '@/utils/string';
import { useWallet } from '@solana/wallet-adapter-react';
import { useZokuProgram } from '../../../hooks/program';

export default function ProgramPage() {
  const { publicKey } = useWallet();
  const { programId } = useZokuProgram();
  return publicKey ? (
    <div>
      <AppHero title="Zoku" subtitle={'anchor program for zoku'}>
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
      </AppHero>
      <div className="flex gap-8">
        <UserList />
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}
