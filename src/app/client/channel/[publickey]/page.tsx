'use client';

import { ChannelAbout } from '@/components/client/channel-about';
import { ChannelBanner } from '@/components/client/channel-banner';
import {
  EpisodeList,
  EpisodeListSearch,
} from '@/components/client/episode-card';

interface Props {
  params: { publickey: string };
}

const ChannelPage = () => {
  return (
    <div className="mx-auto px-8 py-8 flex flex-col gap-8">
      <ChannelBanner />
      <EpisodeListSearch />
      <div className="flex gap-8">
        <EpisodeList />
        <ChannelAbout />
      </div>
    </div>
  );
};

export default ChannelPage;
