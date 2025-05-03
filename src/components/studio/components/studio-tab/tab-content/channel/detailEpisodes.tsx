'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Breadcrumb } from '../../../breadcrumb';
import ActionBar from './actionBar';
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
  const { id } = useParams();
  const [tab, setTab] = useState<'published' | 'draft'>('published');
  const [searchValue, setSearchValue] = useState('');

  const publishedData: any[] = [
    {
      id: 1,
      title: 'Episode Title 1',
      description: 'This is the description for episode 1.',
    },
    {
      id: 2,
      title: 'Episode Title 2',
      description: 'This is the description for episode 2.',
    },
    {
      id: 3,
      title: 'Episode Title 3',
      description: 'This is the description for episode 3.',
    },
  ];
  // const publishedData: any[] = [];
  const draftData: any[] = [];

  const data = {
    title: 'titletitletitletitle',
    description:
      'descriptiondescriptiondescriptiondescriptiondescriptiondescription',
    coverImage:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=800&fit=crop',
    nftInfo: 'NFT minted 100/10000',
    lastUpdated: '2021-01-01',
    onClick: () => {},
  };

  const episodesData = tab === 'published' ? publishedData : draftData;

  // 创建按钮事件
  const handleCreate = () => {
    // TODO: 实现创建逻辑
    alert('Create Episode');
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
        <div>draftEpisodes</div>
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
    <div className="p-[12px]">
      <Breadcrumb />
      <DetailCard {...data} />
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
