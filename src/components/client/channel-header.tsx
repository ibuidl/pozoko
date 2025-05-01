import { Share2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

const mockChannel = {
  cover: '/cluster-default.png',
  title: 'Ordinals Spotlight: AI Art',
  author: 'ANNICE',
  avatar: '/cluster-default.png',
  about:
    'This podcast episode discusses the current development limitations and future trends in the AI field, as well as how AI entrepreneurs should seize opportunities and meet challenges.',
};

export const ChannelHeader = () => {
  return (
    <div className="flex flex-col gap-0 p-0 shadow-none border-0 overflow-visible">
      <div className="flex flex-row items-center gap-8">
        <Image
          src={mockChannel.cover}
          alt="cover"
          width={240}
          height={240}
          className="size-[240px] rounded-2xl object-cover shadow-md border"
        />
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold leading-tight truncate">
              {mockChannel.title}
            </span>
          </div>
          <div className="flex items-center gap-6 mt-2">
            <Image
              src={mockChannel.avatar}
              alt="avatar"
              width={40}
              height={40}
              className="size-10 rounded-lg border"
            />
            <span className="text-lg font-medium text-muted-foreground">
              {mockChannel.author}
            </span>
          </div>
          <div className="mt-4">
            <Button
              size="lg"
              variant="outline"
              className="px-8 text-base font-semibold"
            >
              Follow
            </Button>
          </div>
        </div>
      </div>
      <Button variant="ghost" className="mt-8 self-start">
        <Share2 className="w-5 h-5 mr-1" />
        share
      </Button>
    </div>
  );
};
