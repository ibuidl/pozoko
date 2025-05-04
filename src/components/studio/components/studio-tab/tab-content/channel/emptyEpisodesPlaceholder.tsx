import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const EmptyEpisodesPlaceholder = () => {
  const router = useRouter();
  const handleCreate = () => {
    router.push('/studio/channel/detail/createEpisode');
  };
  return (
    <div className="py-[80px] flex flex-col items-center justify-center bg-white rounded-lg transition-colors">
      <img
        src="https://cdn.dribbble.com/users/63407/screenshots/3546065/empty_state.png"
        alt="empty"
        className="mb-4"
        style={{ width: 250, height: 250 }}
      />
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
