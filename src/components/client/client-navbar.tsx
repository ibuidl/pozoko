import { WalletButton } from '@/provider';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';
import { SearchButton } from './search-command';

export const ClientNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="h-12 flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
        <div className="flex w-full justify-between items-center px-4 lg:gap-2 lg:px-6">
          <div className="flex items-center gap-1">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
            <div className="mx-2 text-base font-medium">Home</div>
          </div>
          <SearchButton />
          <WalletButton />
        </div>
      </div>
      <ScrollArea className="h-0 flex-grow overflow-auto" type="scroll">
        {children}
      </ScrollArea>
    </div>
  );
};
