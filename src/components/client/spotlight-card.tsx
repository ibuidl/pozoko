import { Headphones, Star } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Separator } from '../ui/separator';

const data = [
  {
    cover: '/cluster-default.png',
    name: '11:59 Media',
    description: 'A community for all of our',
    creator: 'Andre Syak',
    avatar: '/cluster-default.png',
    listenCount: 657,
    likeCount: 87,
  },
  {
    cover: '/cluster-default.png',
    name: '11:59 Media',
    description: 'A community for all of our',
    creator: 'Andre Syak',
    avatar: '/cluster-default.png',
    listenCount: 657,
    likeCount: 87,
  },
  {
    cover: '/cluster-default.png',
    name: '11:59 Media',
    description: 'A community for all of our',
    creator: 'Andre Syak',
    avatar: '/cluster-default.png',
    listenCount: 657,
    likeCount: 87,
  },
  {
    cover: '/cluster-default.png',
    name: '11:59 Media',
    description: 'A community for all of our',
    creator: 'Andre Syak',
    avatar: '/cluster-default.png',
    listenCount: 657,
    likeCount: 87,
  },
];

export interface SpotlightCardProps {
  title: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ title }) => {
  return (
    <Card className="w-1/3 shrink-0">
      <CardHeader>
        <CardTitle className="flex justify-between">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6 flex flex-col gap-2">
        {data.map((item, index) => (
          <div key={item.name + index} className="h-24 py-3 flex gap-4">
            <Image
              src={item.cover}
              alt={item.name}
              width={72}
              height={72}
              className="size-18 rounded-lg"
            />
            <div className="flex-grow flex flex-col">
              <CardTitle>{item.name}</CardTitle>
              <CardDescription className="mt-1">
                {item.description}
              </CardDescription>
              <div className="mt-auto flex gap-2">
                <CardDescription className="flex items-center gap-1">
                  <Image
                    src={item.cover}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="size-4 rounded-full"
                  />
                  {item.creator}
                </CardDescription>
                <CardDescription className="ml-auto flex items-center gap-1">
                  <Headphones size={16} />
                  {item.listenCount}
                </CardDescription>
                <CardDescription className="flex items-center gap-1">
                  <Star size={16} />
                  {item.likeCount}
                </CardDescription>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export const HotCard = () => {
  return <SpotlightCard title="Hot" />;
};

export const RisingCard = () => {
  return <SpotlightCard title="Rising" />;
};

export const LegendaryCard = () => {
  return <SpotlightCard title="Legendary" />;
};
