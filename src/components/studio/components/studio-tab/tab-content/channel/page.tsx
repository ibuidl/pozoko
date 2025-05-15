'use client';

import { usePodCastList, useUserInfo } from '@/api/studio/useUserInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserPda } from '@/hooks/program';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

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
  const { connected, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { isUserInitialized } = useUserPda();

  const { data: userInfo } = useUserInfo({
    publicKey: publicKey?.toBase58() || '',
  });

  const { data: podcasts } = usePodCastList({
    userId: userInfo?.id || '',
    page: 1,
    limit: 10,
  });

  const filteredPodcasts = useMemo(() => {
    return podcasts?.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [podcasts, searchQuery]);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="text-2xl font-bold">Please connect your wallet</div>
        <Button onClick={() => setVisible(true)}>Connect Wallet</Button>
      </div>
    );
  }

  if (!isUserInitialized) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="text-2xl font-bold">Please initialize your account</div>
        <Button onClick={() => router.push('/studio/profile')}>
          Go to profile
        </Button>
      </div>
    );
  }

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
        {podcasts?.map((podcast, index) => (
          <PodcastCard
            key={index}
            title={podcast.name}
            description={podcast.description}
            coverImage={podcast.avatar}
            lastUpdated={podcast.created_at}
            onClick={() => router.push(`/studio/channel/${podcast.id}`)}
          />
        ))}
      </div>
      {filteredPodcasts?.length === 0 && (
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
