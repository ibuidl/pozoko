'use client';

import { debounce } from 'es-toolkit';
import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  Play,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';

const mockCards = [
  {
    cover: '/cluster-default.png',
    title: 'Ordinals Spotlight: AI Art',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    tag: 'The most popular article',
    listen: 657,
    like: 87,
  },
  ...Array(5).fill({
    cover:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    title: 'Ordinals Spotlight: AI Art',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    listen: 657,
    like: 87,
  }),
];

// const VISIBLE_COUNT = 5;
const CARD_GAP = 24;

export const CreatorPodcasts = () => {
  const [targetIndex, setTargetIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const handleTransition = useCallback(
    debounce(async (focusIndex: number) => {
      setFocusIndex(focusIndex);
      setTranslateX(focusIndex * (340 + CARD_GAP));
    }, 300),
    [],
  );

  const handleMove = (index: number) => {
    setTargetIndex(index);
    handleTransition(index);
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="w-0 h-[510px] flex items-end gap-6 transition-transform transform-gpu duration-500"
        style={{ transform: `translateX(-${translateX}px)` }}
      >
        {mockCards.map((item, index) => {
          const isFocused = index === focusIndex;

          return (
            <div
              className={`shrink-0 transition-all transform-gpu duration-500 ${
                isFocused ? 'w-[408px]' : 'w-[340px]'
              }`}
            >
              <Card
                key={index}
                className={`w-[340px] h-[425px] relative overflow-hidden transition-transform transform-gpu origin-bottom-left duration-500 ${
                  isFocused ? 'scale-[1.2]' : ''
                }`}
              >
                <div className={`w-full h-3/5 relative`}>
                  <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  {isFocused && item.tag && (
                    <div className="absolute left-8 top-8 bg-white/80 text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </div>
                  )}
                  {index < 3 && (
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-3xl font-bold text-white drop-shadow-lg">
                      Top #{index + 1}
                    </div>
                  )}
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full absolute right-4 bottom-4"
                  >
                    <Play />
                  </Button>
                </div>
                <CardContent className="h-[169px] flex-grow px-11 pt-6 pb-8 flex flex-col">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="mt-2 text-ellipsis">
                    {item.desc}
                  </CardDescription>
                  <div className="mt-auto flex items-center gap-6 text-muted-foreground text-xs">
                    <div className="flex items-center gap-1">
                      <Headphones size={16} />
                      {item.listen}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      {item.like}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="absolute right-8 top-0 flex items-center gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleMove(targetIndex - 1)}
          disabled={targetIndex === 0}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleMove(targetIndex + 1)}
          disabled={targetIndex === mockCards.length - 1}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
