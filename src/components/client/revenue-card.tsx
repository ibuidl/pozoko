import { Eye } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

const items = [
  {
    logo: '/cluster-default.png',
    name: 'name',
    symbol: 'SYMBOL',
    dollar: 312.44,
    sol: 2.14,
  },
  {
    logo: '/cluster-default.png',
    name: 'name',
    symbol: 'SYMBOL',
    dollar: 312.44,
    sol: 2.14,
  },
  {
    logo: '/cluster-default.png',
    name: 'name',
    symbol: 'SYMBOL',
    dollar: 312.44,
    sol: 2.14,
  },
  {
    logo: '/cluster-default.png',
    name: 'name',
    symbol: 'SYMBOL',
    dollar: 312.44,
    sol: 2.14,
  },
];

export const IncomeCard = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-2">
        <CardDescription className="flex justify-between">
          <span>Total Revenue</span>
          <Badge
            variant="secondary"
            className="flex items-center gap-1 cursor-pointer"
          >
            <Eye className="size-4" />
            View all
          </Badge>
        </CardDescription>
        <CardTitle className="!mt-[10px] text-2xl font-semibold">
          $756.12
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {items.map((item, index) => (
            <div
              key={item.symbol + index}
              className="h-[60px] flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.symbol}</CardDescription>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <CardTitle>{item.sol}SOL</CardTitle>
                <CardDescription>${item.dollar}</CardDescription>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
