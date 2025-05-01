'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { Avatar, Tabs } from 'radix-ui';

interface TabItem {
  label: string;
  value: string;
  component: React.ReactNode;
}

interface StudioTabsProps {
  tabs: TabItem[];
}

export default function StudioTabs({ tabs }: StudioTabsProps) {
  const { publicKey } = useWallet();

  // if (publicKey) {
  //   return redirect(`/dev/account/${publicKey.toString()}`);
  // }
  return (
    <div className="">
      <Tabs.Root
        defaultValue={tabs[0]?.value || 'tab1'}
        orientation="horizontal"
        className="flex min-h-[calc(100vh-100px)]"
      >
        <div className="w-[260px]">
          <div className="w-[200px] mx-auto text-sm text-center my-[20px]">
            <div>
              <Avatar.Root className="inline-flex size-[112px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
                <Avatar.Image
                  className="size-full rounded-[inherit] object-cover"
                  src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  alt="Colm Tuite"
                />
              </Avatar.Root>
            </div>
            <div className="mt-[6px]">nickname</div>
          </div>
          <Tabs.List
            className="flex flex-col  text-xs"
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
        <div className="flex-1 w-full bg-[#F6F6F6]">
          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tab.component}
            </Tabs.Content>
          ))}
        </div>
      </Tabs.Root>
    </div>
  );
}
