import { Episode } from '@/api/studio/useUserInfo';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface PublishedEpisodesProps {
  publishedData: Episode[];
}

const PublishedEpisodes: React.FC<PublishedEpisodesProps> = ({
  publishedData,
}) => {
  const [selectedId, setSelectedId] = useState(publishedData[0]?.id || null);
  const selectedEpisode = publishedData.find((e) => e.id === selectedId);

  const indicators = [
    { label: 'Download', value: 105 },
    { label: 'Like', value: 105 },
    { label: 'Collect', value: 105 },
    { label: 'Play', value: 105 },
    {
      label: 'Income',
      value: (
        <>
          <span>50</span> <span className="text-xs">SOL(8K U)</span>
        </>
      ),
    },
  ];

  return (
    <div className="flex gap-4 w-full">
      {/* 左侧 episode 列表 */}
      <div className="w-[300px] flex-shrink-0 flex flex-col gap-2 bg-white rounded-lg p-2">
        {publishedData.map((ep) => {
          const isSelected = selectedId === ep.id;
          return (
            <div
              key={ep.id}
              className={`relative rounded-lg p-3 mb-2 border cursor-pointer transition-colors duration-150 flex flex-col justify-center ${
                isSelected
                  ? 'border-[#0052D9] bg-[#F0F7FF]'
                  : 'border-[#E6E9EF] bg-white'
              }`}
              onClick={() => setSelectedId(ep.id)}
            >
              {isSelected && (
                <div className="absolute left-0 top-0 h-full w-1 rounded-l bg-[#0052D9]" />
              )}
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`truncate ${
                    isSelected ? 'font-bold' : 'font-medium'
                  } text-base`}
                >
                  Episode {ep.id}: {ep.name}
                </span>
                <Button
                  variant="link"
                  className="p-0 h-auto text-xs"
                  style={{ color: '#0052D9' }}
                >
                  edit
                </Button>
              </div>
              <div className="text-xs text-gray-500 truncate">
                {ep.description}
              </div>
            </div>
          );
        })}
      </div>
      {/* 右侧 episode 详情 */}
      <div className="flex-1 bg-white rounded-lg p-6 min-h-[500px] flex flex-col">
        {selectedEpisode ? (
          <>
            {/* 标题区和操作区同一行 */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="text-xl font-semibold mr-3">
                  Episode {selectedEpisode.id}: {selectedEpisode.name}
                </div>
                <span className="bg-[#222] text-white text-xs px-2 py-1 rounded ml-2">
                  Paid Episodes
                </span>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-[#222]">$</span>
                <span className="text-[#222]"> 👍🏻</span>
                <span className="text-[#222]">100</span>
                <button className="text-[#222]">★</button>
                <span className="text-[#222]">100</span>
              </div>
            </div>
            {/* 音频波形/播放器区 */}
            <div className="mb-4">
              <div className="h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-sm mb-2">
                音频波形/播放器占位
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                {/* 左侧：时间 */}
                <div>00:00:00/01:04:48</div>
                {/* 中间：播放/快退/快放按钮 */}
                <div className="flex items-center gap-2">
                  <button className="text-black">⟲</button>
                  <button className="text-black">Play</button>
                  <button className="text-black">⟳</button>
                </div>
                {/* 右侧：速度/音量 */}
                <div className="flex items-center gap-2">
                  <span>1x</span>
                  <span className="w-4 h-4 bg-gray-300 rounded-full inline-block" />
                </div>
              </div>
            </div>
            {/* Data indicators + Episode Details & AI Summary 并排 */}
            <div className="flex gap-4 mb-4 flex-1">
              {/* 左侧：数据指标+详情 */}
              <div className="flex-1 flex flex-col gap-4">
                {/* Data indicators */}
                <div className="border rounded bg-white px-4 py-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm text-[#222]">
                      Data indicators
                    </span>
                    <button className="text-xs text-[#0052D9]">
                      metrics →
                    </button>
                  </div>
                  <div className="flex items-stretch h-12">
                    {indicators.map((item, idx) => (
                      <React.Fragment key={item.label}>
                        <div className="flex flex-col justify-center text-center  h-full">
                          <div className="text-xs text-gray-500 mb-[10px]">
                            {item.label}
                          </div>
                          <div className="text-lg">{item.value}</div>
                        </div>
                        {idx !== indicators.length - 1 && (
                          <div className="h-full w-px bg-[#E6E9EF] mx-4" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                {/* Episode Details */}
                <div className="bg-white border rounded p-4 flex-1 overflow-auto">
                  <div className="font-semibold mb-2">Episode Details</div>
                  <div
                    className="text-sm text-gray-500"
                    style={{ maxHeight: 180, overflowY: 'auto' }}
                  >
                    {selectedEpisode.description.repeat(10)}
                  </div>
                </div>
              </div>
              {/* 右侧：AI Summary */}
              <div className="w-[340px] flex-shrink-0 bg-white border rounded p-4 overflow-auto flex flex-col">
                <div className="font-semibold mb-2">AI Summary</div>
                <div
                  className="text-sm text-gray-500 flex-1"
                  style={{ maxHeight: 320, overflowY: 'auto' }}
                >
                  AI summary content AI summary content AI summary content AI
                  summary content AI summary content AI summary content
                </div>
              </div>
            </div>
            {/* 底部平台栏 */}
            <div className="flex justify-center items-center gap-4 mt-2 border-t pt-4">
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                SSR
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                Apple Podcasts
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                Overcast
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                YouTube
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                Spotify
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                Microcosm
              </span>
              <span className="text-xs text-gray-400 bg-[#ECF1F9] px-[12px] py-[2px]">
                Share
              </span>
            </div>
          </>
        ) : (
          <div className="text-gray-400">请选择一个 Episode</div>
        )}
      </div>
    </div>
  );
};

export default PublishedEpisodes;
