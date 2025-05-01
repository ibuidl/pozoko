import { ClientNavbar } from '@/components/client/client-navbar';
import { ClientSidebar } from '@/components/client/client-sidebar';
import { SearchCommand } from '@/components/client/search-command';
import { ScrollArea } from '@/components/ui/scroll-area';
import '@/style/client.css';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientSidebar>
      <ClientNavbar>
        <ScrollArea >{children}</ScrollArea>
      </ClientNavbar>
      <SearchCommand />
    </ClientSidebar>
  );
};

export default ClientLayout;
