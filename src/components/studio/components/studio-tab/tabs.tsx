'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Avatar, Tabs } from 'radix-ui';

interface TabItem {
  label: string;
  value: string;
}

interface StudioTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  children: React.ReactNode;
}

export default function StudioTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
}: StudioTabsProps) {
  const { connection } = useConnection();
  const { publicKey, wallet } = useWallet();
  //todo 如果没登录，则不请求用户信息

  if (!publicKey) {
    wallet?.adapter?.connect();
  }
  // const { data: userInfo } = useUserInfo({
  //   id: publicKey?.toBase58() || '',
  // });

  // 临时变量，在实际接口可用时应取消上面的注释
  const userInfo = {
    avatar: '',
    nickname: publicKey ? publicKey.toString().slice(0, 6) + '...' : '',
  };

  // console.log('userInfo', userInfo);

  return (
    <div className="">
      <Tabs.Root
        defaultValue={activeTab || tabs[0]?.value || 'channel'}
        onValueChange={onTabChange}
        orientation="horizontal"
        className="flex min-h-[calc(100vh-64px)]"
      >
        <div className="min-w-[260px]">
          <div className="w-[200px] mx-auto text-sm text-center my-[20px]">
            <div>
              <Avatar.Root className="inline-flex size-[112px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src={
                    userInfo?.avatar ||
                    'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'
                  }
                  alt={userInfo?.nickname || 'User Avatar'}
                />
              </Avatar.Root>
            </div>
            <div className="mt-[6px]">{userInfo?.nickname || '未登录'}</div>
          </div>
          <Tabs.List
            className="flex flex-col text-xs"
            aria-label="tabs example"
          >
            {tabs.map((tab) => (
              <Tabs.Trigger
                className="my-[5px] mx-[12px] text-left px-4 py-2 rounded-md hover:bg-gray-100 data-[state=active]:bg-[#F2F4F8] data-[state=active]:font-semibold"
                value={tab.value}
                key={tab.value}
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </div>
        <div className="flex-1 w-full  bg-[#F6F6F6]">{children}</div>
      </Tabs.Root>
    </div>
  );
}
