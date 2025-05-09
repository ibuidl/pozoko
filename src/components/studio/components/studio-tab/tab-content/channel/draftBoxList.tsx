'use client';

import Image from 'next/image';

interface Draft {
  id: number;
  title: string;
  description: string;
  coverImage: string;
}

interface DraftBoxListProps {
  drafts: Draft[];
}

export default function DraftBoxList({ drafts }: DraftBoxListProps) {
  return (
    <div className="bg-white  rounded-lg p-[20px] mt-4 h-full min-h-[500px]">
      <div className="grid grid-cols-3 gap-4">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="flex rounded-lg border border-[#E6E9EF] p-3 items-start transition-all duration-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:shadow-md"
          >
            <div className="w-16 h-16 flex-shrink-0 relative">
              <Image
                src={
                  draft.coverImage
                    ? draft.coverImage
                    : 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=800&fit=crop'
                }
                alt={draft.title}
                fill
                className="object-cover rounded"
                sizes="72px"
              />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-semibold text-base mb-1">{draft.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {draft.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
