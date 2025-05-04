'use client';

import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';

const carouselItems = [
  {
    title: 'Social Media Basics for Artists',
    description:
      'Social media can be a powerful tool for artists to connect, grow their audience, andshowcase their work.',
    link: '',
    cover: '/cluster-default.png',
  },
  {
    title: 'Social Media Basics for Artists',
    description:
      'Social media can be a powerful tool for artists to connect, grow their audience, andshowcase their work.',
    link: '',
    cover: '/cluster-default.png',
  },
  {
    title: 'Social Media Basics for Artists',
    description:
      'Social media can be a powerful tool for artists to connect, grow their audience, andshowcase their work.',
    link: '',
    cover: '/cluster-default.png',
  },
];

export const ExploreCarousel = () => {
  return (
    <div className="w-full flex justify-center">
      <Card className="w-full h-96">
        <CardContent className="h-full px-8 py-0 flex items-center justify-center">
          <Carousel
            opts={{ loop: true }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem
                  key={item.title + index}
                  className="flex justify-between items-center"
                >
                  <div className="max-w-[582px] flex flex-col gap-8">
                    <div className="text-4xl font-bold leading-normal">
                      {item.title}
                    </div>
                    <div className="text-lg font-normal leading-normal">
                      {item.description}
                    </div>
                    <Button className="w-[140px]">Read now</Button>
                  </div>
                  <Image
                    src={item.cover}
                    alt={item.title}
                    width={250}
                    height={312}
                    className="rounded-lg"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};
