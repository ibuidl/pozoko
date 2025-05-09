'use client';

import { TopNav } from '@/components/studio/components/nav/top-nav';
import StudioTabs from '@/components/studio/components/studio-tab/tabs';
import { usePathname, useRouter } from 'next/navigation';

const STUDIO_TABS = [
  { label: 'Channel', value: 'channel' },
  { label: 'Data indicators', value: 'data' },
  { label: 'Profile', value: 'profile' },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname.split('/')[2] || 'channel';

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <StudioTabs
        tabs={STUDIO_TABS}
        activeTab={currentTab}
        onTabChange={(tab) => router.push(`/studio/${tab}`)}
      >
        {children}
      </StudioTabs>
    </div>
  );
}
