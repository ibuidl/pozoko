'use client';

import { usePathname, useRouter } from 'next/navigation';
import { TopNav } from './components/nav/top-nav';
import StudioTabs from './components/studio-tab/tabs';

const STUDIO_TABS = [
  { label: 'Channel', value: 'channel' },
  { label: 'Data indicators', value: 'data' },
  { label: 'Profile', value: 'profile' },
] as const;

interface StudioLayoutProps {
  children: React.ReactNode;
}

export function StudioLayout({ children }: StudioLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentTab = pathname.split('/')[2] || 'channel';

  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <StudioTabs
        tabs={STUDIO_TABS as any}
        activeTab={currentTab}
        onTabChange={(tab) => router.push(`/studio/${tab}`)}
      >
        {children}
      </StudioTabs>
    </div>
  );
}
