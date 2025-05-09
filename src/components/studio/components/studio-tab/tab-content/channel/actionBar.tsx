import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React from 'react';

interface ActionBarProps {
  tab: 'published' | 'draft';
  onTabChange: (tab: 'published' | 'draft') => void;
  onCreate: () => void;
  onSearch: (value: string) => void;
  searchValue: string;
  publishedData: any[];
  draftData: any[];
}

const ActionBar: React.FC<ActionBarProps> = ({
  tab,
  onTabChange,
  onCreate,
  onSearch,
  searchValue,
  publishedData,
  draftData,
}) => {
  return (
    <div className="flex items-center justify-between my-5 gap-2 h-9">
      <div className="flex items-center gap-4">
        <Button
          className="bg-black text-white px-4 py-0 text-[14px] font-normal rounded-[8px] shadow-none h-9 min-w-[120px]"
          onClick={onCreate}
        >
          Create Episode
        </Button>
        <div className="flex items-center bg-[#F1F3F6] rounded-[8px] px-1 py-0 h-9">
          <button
            className={`px-4 h-full text-[14px] font-medium rounded-[6px] transition-all duration-150 focus:outline-none ${
              tab === 'published'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-black'
            }`}
            style={{ marginRight: '2px' }}
            onClick={() => onTabChange('published')}
          >
            Published episodes{' '}
            {tab === 'published' ? `(${publishedData.length})` : ''}
          </button>
          <button
            className={`px-4 h-full text-[14px] font-medium rounded-[6px] transition-all duration-150 focus:outline-none ${
              tab === 'draft'
                ? 'bg-white text-black shadow-sm'
                : 'bg-transparent text-black'
            }`}
            onClick={() => onTabChange('draft')}
          >
            Draft Box {tab === 'draft' ? `(${draftData.length})` : ''}
          </button>
        </div>
      </div>
      <div className="flex items-center border rounded-md px-2 bg-white w-[240px] h-9">
        <input
          type="text"
          placeholder="Please enter"
          className="flex-1 outline-none border-none bg-transparent py-1 px-2 text-sm h-full"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
        <Search className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};

export default ActionBar;
