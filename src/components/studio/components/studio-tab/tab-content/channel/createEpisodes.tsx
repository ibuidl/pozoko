'use client';

import { pinata } from '@/api/pinata/config';
import { useChannel } from '@/api/studio/useUserInfo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useChannelPda, useZokuProgram } from '@/hooks/program';
import { useParams, useRouter } from 'next/navigation';
import { Switch } from 'radix-ui';
import { useState } from 'react';
import { Breadcrumb } from '../../../breadcrumb';

export default function CreateEpisodesPage() {
  const { detail: channelId } = useParams();
  const router = useRouter();
  const { updateEp } = useZokuProgram();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    label: '',
    mp3File: null as File | null,
    mp3FileName: '',
    price: '0',
    summary: false,
  });

  const { data: channelData } = useChannel(channelId as string);
  const { channelPda } = useChannelPda(channelData?.symbol);

  const handleMp3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      setFormData({
        ...formData,
        mp3File: file,
        mp3FileName: file.name,
      });
    } else {
      setFormData({
        ...formData,
        mp3File: null,
        mp3FileName: '',
      });
      alert('只能上传 mp3 文件');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!channelPda || !formData.mp3File) {
      return;
    }

    const urlRequest = await fetch('/api/url');
    const urlResponse = await urlRequest.json();
    const audioUpload = await pinata.upload.public
      .file(formData.mp3File)
      .url(urlResponse.url);
    const audioUrl = await pinata.gateways.public.convert(audioUpload.cid);

    const metadata = {
      name: formData.title,
      symbol: formData.label,
      description: formData.description,
      image: audioUrl,
    };

    const metadataUpload = await pinata.upload.public
      .json(metadata)
      .url(urlResponse.url);

    updateEp.mutate({
      channelPda,
      isPublished: false,
      name: formData.title,
      symbol: formData.label,
      metadataCid: metadataUpload.cid,
    });
  };

  const handleCancel = () => {
    router.push('/studio/channel');
  };

  return (
    <div className="flex flex-col justify-between   bg-[#F6F6F6]">
      <div className=" p-[12px] pb-20 relative">
        <div className="">
          <Breadcrumb />
          <form
            id="podcast-form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            {/* Episode details------------------------------------------------ */}
            <div className="flex-1 bg-white rounded-lg p-6">
              <p className="text-sm font-bold mb-[20px]">Episode Details</p>
              <div className="space-y-4 block text-sm">
                <div className="flex items-center">
                  <label className=" text-gray-600 w-[140px]">
                    Episode title
                  </label>
                  <div className="w-[281px]">
                    <Input
                      required
                      placeholder="Add a title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex">
                  <label className=" text-gray-600 w-[140px] pt-2">
                    Episode Description
                  </label>
                  <div className="flex-1">
                    <Textarea
                      className="w-[581px] min-h-[80px]"
                      required
                      placeholder="Add a description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className=" text-gray-600 w-[140px]">Label</label>
                  <div className="w-[281px]">
                    <Input
                      required
                      placeholder="Add tag content"
                      value={formData.label || ''}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          label: e.target.value,
                        } as any);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Episode settings------------------------------------------------ */}
            <div className="flex-1 bg-white pt-8 p-6 rounded-lg">
              <p className="text-sm font-bold mb-[20px]">Episode settings</p>
              <div className="space-y-4 block text-sm">
                <div className="flex items-center ">
                  <label className=" text-gray-600 w-[140px]">MP3 Files</label>
                  <div className="flex-1">
                    <div className="flex items-center ">
                      <div className="relative w-[120px] h-[30px] border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
                        {formData.mp3FileName ? (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-green-700 text-sm font-medium">
                            {formData.mp3FileName}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <span className="text-black text-sm">
                              + Upload MP3
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="audio/mp3,audio/mpeg"
                          onChange={handleMp3Change}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mt-auto">
                            The audio file size must be within 200MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <label className=" text-gray-600 w-[140px]">
                    Playback conditions
                  </label>
                  <div className="w-[281px]">
                    <Input
                      required
                      placeholder="Add "
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label className=" text-gray-600 w-[140px]">AI Summary</label>
                  <div className="flex items-center gap-2 w-[281px]">
                    <Switch.Root
                      className="relative h-[18px] w-[32px] cursor-pointer rounded-full bg-gray-200 shadow outline-none transition-colors duration-200 data-[state=checked]:bg-blue-500"
                      id="ai-summary"
                      checked={formData.summary}
                      onCheckedChange={() =>
                        setFormData({
                          ...formData,
                          summary: !formData.summary,
                        })
                      }
                    >
                      <Switch.Thumb className="block size-[14px] translate-x-0.5 rounded-full bg-white shadow transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[14px]" />
                    </Switch.Root>
                    <span className="text-xs text-gray-500">
                      {formData.summary ? 'enabled' : 'Not enabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Publish Settings------------------------------------------------ */}
            <div className="flex-1 bg-white pt-8 p-6 rounded-lg">
              <p className="text-sm font-bold mb-[20px]">Publish Settings</p>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] z-10 fixed bottom-0 w-full">
        <div className=" px-4 py-3 flex justify-between items-center">
          <div className="">
            <p className="text-xs text-gray-500 py-[10px]">
              Payment Required Available after payment 0.03 SOL
            </p>
            <Button
              type="submit"
              form="podcast-form"
              className="bg-black text-white hover:bg-black/90"
            >
              Pay and Continue
            </Button>
            <Button
              type="button"
              onClick={handleCancel}
              className="ml-[10px] bg-white text-black hover:bg-white/90 border border-black"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
