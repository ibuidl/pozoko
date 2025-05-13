'use client';

import { usePodCastList } from '@/api/studio/useUserInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useZokuProgram } from '@/hooks/program';
import { useWallet } from '@solana/wallet-adapter-react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const PodcastCard = ({
  title,
  description,
  coverImage,
  nftInfo,
  lastUpdated,
  onClick,
}: PodcastCard) => (
  <div
    className="flex h-[160px] bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    onClick={onClick}
  >
    <div className="relative w-[160px] h-full flex-shrink-0">
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover rounded-l-lg"
        sizes="160px"
      />
      {nftInfo && (
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {nftInfo}
        </div>
      )}
    </div>
    <div className="flex-1 p-4">
      <h3 className="text-lg font-semibold truncate">{title}</h3>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
      <div className="text-xs text-gray-400 mt-2">
        Last updated: {lastUpdated}
      </div>
    </div>
  </div>
);

export const ChannelPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const podcasts: PodcastCard[] = [
    {
      title: 'BUIDLER TALK',
      description:
        'Podcast description content Podcast description content Podcast description content Podcast description content Podcast description content Podcast description content ...',
      coverImage:
        'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=800&fit=crop',
      nftInfo: 'NFT minted 100/10000',
      lastUpdated: '2025/05/12',
    },
    {
      title: 'WEB3',
      description:
        'Podcast description content Podcast description content Podcast description content Podcast description content Podcast description content ...',
      coverImage:
        'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=800&fit=crop',
      lastUpdated: '2025/05/12',
    },
    {
      title: 'Cryptoria',
      description:
        'Podcast description content Podcast description content Podcast description content Podcast description content Podcast description content ...',
      coverImage:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=800&fit=crop',
      lastUpdated: '2025/05/12',
    },
  ];
  const [dataList, setDataList] = useState(podcasts);

  const filteredPodcasts = podcasts.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      podcast.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const { publicKey } = useWallet();
  const { deriveUserAccounPda } = useZokuProgram();
  let userId = '';

  if (publicKey) {
    userId = deriveUserAccounPda(publicKey?.toString() || '');
    console.log(userId, 'userId');
  }
  const { data } = usePodCastList({
    userId,
    page: 1,
    limit: 10,
  });
  console.log(data, 'data');

  return (
    <div className="p-[20px] mx-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <Button
          variant="default"
          className="bg-black text-white hover:bg-black/90"
          onClick={() => router.push('/studio/channel/createPostcard')}
        >
          Create a podcast
        </Button>
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            className="pl-10"
            type="text"
            placeholder="Please enter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {podcasts.map((podcast, index) => (
          <PodcastCard
            key={index}
            {...podcast}
            onClick={() => router.push(`/studio/channel/detail${index}`)}
          />
        ))}
      </div>
      {filteredPodcasts.length === 0 && (
        <div className="text-center text-gray-500 py-8">No podcasts found</div>
      )}
    </div>
  );
};

interface PodcastCard {
  title: string;
  description: string;
  coverImage: string;
  nftInfo?: string;
  lastUpdated: string;
  onClick?: () => void;
}
