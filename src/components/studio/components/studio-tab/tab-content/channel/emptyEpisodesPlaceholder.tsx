import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

const EmptyEpisodesPlaceholder = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleCreate = () => {
    router.push(`${pathname}/createEpisode`);
  };

  return (
    <div className="py-[80px] flex flex-col items-center justify-center bg-white rounded-lg transition-colors">
      <div className="text-gray-500 mb-2">
        You haven&apos;t created any episodes yet
      </div>
      <Button
        className="bg-black text-white px-4 py-2 mt-2"
        onClick={handleCreate}
      >
        + Create your first episode
      </Button>
    </div>
  );
};

export default EmptyEpisodesPlaceholder;
