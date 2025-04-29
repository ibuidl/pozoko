'use client';

import { ExplorerLink } from '@/components/dev/cluster';
import { AppHero } from '@/components/dev/common';
import { ZokuProgramCreate, ZokuProgramList } from '@/components/dev/program';
import { WalletButton } from '@/provider';
import { ellipsify } from '@/utils/string';
import { useWallet } from '@solana/wallet-adapter-react';
import { useZokuProgram } from '../../../hooks/dev/program';

export default function ProgramPage() {
  const { publicKey } = useWallet();
  const { programId } = useZokuProgram();
  return publicKey ? (
    <div>
      <AppHero
        title="Zoku"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <ZokuProgramCreate />
      </AppHero>
      <ZokuProgramList />
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
