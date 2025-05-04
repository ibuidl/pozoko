import { CreatorBanner } from '@/components/client/creator-banner';
import { CreatorPodcasts } from '@/components/client/creator-podcasts';

export default function CreatorPage() {
  return (
    <div className="p-8 flex flex-col gap-8">
      <CreatorBanner />
      <CreatorPodcasts />
    </div>
  );
}
