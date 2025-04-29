'use client';

import { ClusterUiModal, ClusterUiTable } from '@/components/dev/cluster';
import { AppHero } from '@/components/dev/common';
import { useState } from 'react';

export default function ClusterPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <AppHero
        title="Clusters"
        subtitle="Manage and select your Solana clusters"
      >
        <ClusterUiModal
          show={showModal}
          hideModal={() => setShowModal(false)}
        />
        <button
          className="btn btn-xs lg:btn-md btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add Cluster
        </button>
      </AppHero>
      <ClusterUiTable />
    </div>
  );
}
