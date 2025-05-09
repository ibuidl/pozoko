import { ExploreCarousel } from '@/components/client/explore-carousel';
import { RankingTableTabs } from '@/components/client/ranking-table';
import { IncomeCard } from '@/components/client/revenue-card';
import {
  HotCard,
  LegendaryCard,
  RisingCard,
} from '@/components/client/spotlight-card';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ExplorePage = () => {
  return (
    <div className="my-6 px-6 flex flex-col gap-6">
      <ExploreCarousel />
      <div className="flex gap-6">
        <RankingTableTabs />
        <div>
          <Button variant="secondary" className="mb-6">
            NFT INCOME
          </Button>
          <IncomeCard />
        </div>
      </div>
      <Button variant="secondary" className="self-start">
        Spotlight
      </Button>
      <ScrollArea type="hover" className="pb-4">
        <div className="flex gap-6">
          <HotCard />
          <RisingCard />
          <LegendaryCard />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ExplorePage;
