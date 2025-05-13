'use client';

import { ExplorerLink } from '@/components/dev/cluster';
import { AppHero } from '@/components/dev/common';
import { UserList } from '@/components/dev/program';
import { useGetBalance } from '@/hooks/account';
import { WalletButton } from '@/provider';
import { ellipsify } from '@/utils/string';
import { useWallet } from '@solana/wallet-adapter-react';
import { useZokuProgram } from '../../../hooks/program';

export default function ProgramPage() {
  const { publicKey } = useWallet();
  const { programId } = useZokuProgram();

  //判断一下 如果publicKey 再获取可以吗

  const { data: balance } = useGetBalance(publicKey && { address: publicKey });
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
      {publicKey && <div>balance:{balance && balance / 1e9}</div>}
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
