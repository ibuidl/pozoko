'use client';

import { ArrowDownUp, Play, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardDescription, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';

const mockEpisodes = [
  {
    id: 1,
    title: 'Ordinals Spotlight: AI Art',
    desc: 'This podcast episode explores the process of Wang Sen founding the Uzis brand, communication of brand......',
    date: 'April 22, 2025',
    duration: '1h5m',
    cover: '/cluster-default.png',
    lock: false,
  },
  {
    id: 2,
    title: 'Ordinals Spotlight: AI Art',
    desc: 'This podcast episode explores the process of Wang Sen founding the Uzis brand, communication of brand......',
    date: 'April 22, 2025',
    duration: '1h5m',
    cover: '/cluster-default.png',
    lock: false,
  },
  {
    id: 3,
    title: 'Ordinals Spotlight: AI Art',
    desc: 'This podcast episode explores the process of Wang Sen founding the Uzis brand, communication of brand......',
    date: 'April 22, 2025',
    duration: '1h5m',
    cover: '/cluster-default.png',
    lock: true,
  },
  {
    id: 4,
    title: 'Ordinals Spotlight: AI Art',
    desc: 'This podcast episode explores the process of Wang Sen founding the Uzis brand, communication of brand......',
    date: 'April 22, 2025',
    duration: '1h5m',
    cover: '/cluster-default.png',
    lock: true,
  },
];

interface EpisodeCardProps {
  index: number;
  title: string;
  desc: string;
  cover: string;
  date: string;
  duration: string;
  lock: boolean;
}

export const EpisodeListSearch = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          className="h-9 pl-10 bg-muted"
          placeholder="Name"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon" className="bg-muted">
        <ArrowDownUp />
      </Button>
    </div>
  );
};

export const EpisodeList = () => {
  return (
    <div className="flex-1 min-w-0">
      <div>
        <div className="text-2xl font-semibold mb-9">All Episodes</div>
        <div className="flex flex-col gap-9">
          {mockEpisodes.map((item, index) => (
            <EpisodeCard
              key={item.id}
              index={index}
              title={item.title}
              desc={item.desc}
              cover={item.cover}
              date={item.date}
              duration={item.duration}
              lock={item.lock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const EpisodeCard = ({
  index,
  title,
  desc,
  cover,
  date,
  duration,
  lock = false,
}: EpisodeCardProps) => {
  return (
    <Card className="h-[200px] p-8 flex items-center gap-6 rounded-2xl">
      <div className="text-xl font-bold w-8 text-center text-muted-foreground">
        {index + 1}
      </div>
      <Image
        src={cover}
        alt={title}
        width={128}
        height={128}
        className="size-32 rounded-lg object-cover border"
      />
      <div className="h-full flex-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl truncate">{title}</CardTitle>
          {lock && (
            <Badge variant="secondary" className="ml-2">
              Lock
            </Badge>
          )}
        </div>
        <CardDescription className="text-lg text-black truncate">
          {desc}
        </CardDescription>
        <div className="mt-auto flex items-center gap-3">
          <CardDescription className="text-lg">{date}</CardDescription>
          <Separator orientation="vertical" className="mx-2" />
          <CardDescription className="text-lg">{duration}</CardDescription>
        </div>
      </div>
      <Button variant="secondary" className="size-14 rounded-full">
        <Play />
      </Button>
    </Card>
  );
};
