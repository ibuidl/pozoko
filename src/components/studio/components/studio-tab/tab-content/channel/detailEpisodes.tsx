'use client';

import { useEpisodeList } from '@/api/studio/useUserInfo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import router from 'next/router';
import { useMemo, useState } from 'react';
import { Breadcrumb } from '../../../breadcrumb';
import ActionBar from './actionBar';
import DraftBoxList from './draftBoxList';
import EmptyEpisodesPlaceholder from './emptyEpisodesPlaceholder';
import PublishedEpisodes from './PublishedEpisodes';

const DetailCard = ({
  title,
  description,
  coverImage,
  nftInfo,
}: DetailCardProps) => (
  <div className="flex h-[160px] bg-white rounded-lg transition-colors">
    <div className="relative w-[160px] h-full flex-shrink-0">
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover rounded-l-lg"
        sizes="160px"
      />
    </div>
    <div className="flex-1 p-4 ml-[12px]">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        {nftInfo && (
          <div className="ml-[15px] bg-black text-white text-xs px-2 py-1 rounded-[7px]">
            {nftInfo}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 my-[20px] line-clamp-3">
        {description}
      </p>
      <Button className="bg-white p-[10px] text-sm text-gray-600 font-light hover:text-white">
        Postcard Website copy
      </Button>

      <Button className="ml-[10px] bg-white p-[10px] text-sm text-gray-600 font-light hover:text-white">
        RSS Feed copy
      </Button>
    </div>
  </div>
);

export default function DetailEpisodes() {
  const { detail: channelId } = useParams();
  const [tab, setTab] = useState<'published' | 'draft'>('published');
  const [searchValue, setSearchValue] = useState('');

  const { data: episodesData } = useEpisodeList({
    channelId: channelId as string,
    page: 1,
    limit: 10,
  });

  const publishedData = useMemo(
    () => episodesData?.filter((episode) => episode.is_published) || [],
    [episodesData],
  );

  const draftData = useMemo(
    () => episodesData?.filter((episode) => !episode.is_published) || [],
    [episodesData],
  );

  // 创建按钮事件
  const handleCreate = () => {
    router.push('/studio/channel/detail/createEpisode');
  };

  // 搜索事件
  const handleSearch = (val: string) => {
    setSearchValue(val);
    // TODO: 实现搜索逻辑
  };

  let content = null;
  if (tab === 'published') {
    content =
      publishedData.length === 0 ? (
        <EmptyEpisodesPlaceholder />
      ) : (
        <PublishedEpisodes publishedData={publishedData} />
      );
  } else if (tab === 'draft') {
    content =
      draftData.length === 0 ? (
        <EmptyEpisodesPlaceholder />
      ) : (
        <DraftBoxList drafts={draftData} />
      );
  }

  const actionBarProps = {
    tab,
    publishedData,
    draftData,
    onTabChange: setTab,
    onCreate: handleCreate,
    onSearch: handleSearch,
    searchValue,
  };

  return (
    <div className="p-[12px] ">
      <Breadcrumb />
      <DetailCard
        title="test"
        description="test"
        coverImage="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      />
      <ActionBar {...actionBarProps} />
      <div>{content}</div>
    </div>
  );
}

interface DetailCardProps {
  title: string;
  description: string;
  coverImage: string;
  nftInfo?: string;
}
