import Image from 'next/image';
import { Button } from '../ui/button';

const mockUser = {
  cover: '/cluster-default.png',
  avatar: '/cluster-default.png',
  name: 'ANNICE',
  desc: 'Crossroads',
};

export const CreatorBanner = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-[433px] relative">
        <Image
          src={mockUser.cover}
          alt="banner"
          width={1200}
          height={355}
          className="w-full h-[355px] object-cover rounded-2xl"
        />
        <Image
          src={mockUser.avatar}
          alt="avatar"
          width={156}
          height={156}
          className="size-[156px] object-cover rounded-lg absolute left-1/2 bottom-0 -translate-x-1/2"
        />
      </div>
      <div className="mt-4 text-2xl font-bold">{mockUser.name}</div>
      <div className="mt-2 ext-muted-foreground text-base">{mockUser.desc}</div>
      <Button className="mt-4 px-8 py-2 rounded-lg text-base font-semibold">
        Free subscription
      </Button>
    </div>
  );
};
