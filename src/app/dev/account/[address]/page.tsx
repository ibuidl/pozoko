'use client';

import {
  AccountBalance,
  AccountButtons,
  AccountTokens,
  AccountTransactions,
} from '@/components/dev/account';
import { ExplorerLink } from '@/components/dev/cluster';
import { AppHero } from '@/components/dev/common';
import { ellipsify } from '@/utils/string';
import { PublicKey } from '@solana/web3.js';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function AccountDetailPage() {
  const params = useParams();
  const address = useMemo(() => {
    if (!params.address) {
      return;
    }
    try {
      return new PublicKey(params.address);
    } catch (e) {
      console.log(`Invalid public key`, e);
    }
  }, [params]);
  if (!address) {
    return <div>Error loading account</div>;
  }

  return (
    <div>
      <AppHero
        title={<AccountBalance address={address} />}
        subtitle={
          <div className="my-4">
            <ExplorerLink
              path={`account/${address}`}
              label={ellipsify(address.toString())}
            />
          </div>
        }
      >
        <div className="my-4">
          <AccountButtons address={address} />
        </div>
      </AppHero>
      <div className="space-y-8">
        <AccountTokens address={address} />
        <AccountTransactions address={address} />
      </div>
    </div>
  );
}
