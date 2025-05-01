'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { TopNav } from './components/nav/top-nav';
import { ChannelPage } from './components/studio-tab/tab-content/channel/page';
import { DataPage } from './components/studio-tab/tab-content/data/page';
import { ProfilePage } from './components/studio-tab/tab-content/profile/page';
import StudioTabs from './components/studio-tab/tabs';
// 定义标签页类型
type TabItem = {
  label: string;
  value: string;
  component: React.ReactNode;
};

// 将标签列表提取为常量
const STUDIO_TABS: TabItem[] = [
  { label: 'Channel', value: 'tab1', component: <ChannelPage /> },
  { label: 'Data indicators', value: 'tab2', component: <DataPage /> },
  { label: 'Profile', value: 'tab3', component: <ProfilePage /> },
];

export default function StudioUi() {
  const { publicKey } = useWallet();

  // if (publicKey) {
  //   return redirect(`/dev/account/${publicKey.toString()}`);
  // }
  return (
    <div className="min-h-screen bg-white">
      <TopNav />
      <StudioTabs tabs={STUDIO_TABS} />
    </div>
  );
}
