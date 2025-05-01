'use client';

import { ChannelAbout } from '@/components/client/channel-about';
import { ChannelHeader } from '@/components/client/channel-header';
import {
  EpisodeList,
  EpisodeListSearch,
} from '@/components/client/episode-card';

interface Props {
  params: { publickey: string };
}

export default function ChannelPage({ params }: Props) {
  return (
    <div className="mx-auto px-8 py-8 flex flex-col gap-8">
      <ChannelHeader />
      <EpisodeListSearch />
      <div className="flex gap-8">
        <EpisodeList />
        <ChannelAbout />
      </div>
    </div>
  );
}
