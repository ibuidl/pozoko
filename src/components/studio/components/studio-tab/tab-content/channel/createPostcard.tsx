'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useState } from 'react';
import { Breadcrumb } from '../../../breadcrumb';

export const CreatePodcastPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: null as File | null,
    previewUrl: '',
    price: '0',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        coverImage: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement payment and form submission logic
  };

  return (
    <div className="flex-1 min-h-screen bg-[#F6F6F6]">
      <div className="min-h-screen p-[12px] pb-20 relative">
        <div className="min-h-screen">
          <Breadcrumb />
          <form
            id="podcast-form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <div className="flex-1 bg-white rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6">Create Podcast</h2>

              <div className="space-y-8">
                <div className="flex items-center">
                  <label className="block text-sm text-gray-600 w-[120px]">
                    Title
                  </label>
                  <div className="w-[281px]">
                    <Input
                      required
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex">
                  <label className="block text-sm text-gray-600 w-[120px] pt-2">
                    Description
                  </label>
                  <div className="flex-1">
                    <Textarea
                      className="w-[581px] min-h-[80px]"
                      required
                      placeholder="Enter podcast description"
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

                <div className="flex">
                  <label className="block text-sm text-gray-600 w-[120px] pt-2">
                    Cover Image
                  </label>
                  <div className="flex-1">
                    <div className="flex items-end space-x-4">
                      <div className="relative w-[120px] h-[120px] border-2 border-dashed border-gray-200 rounded-lg overflow-hidden">
                        {formData.previewUrl ? (
                          <Image
                            src={formData.previewUrl}
                            alt="Cover preview"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <span className="text-gray-400 text-sm">
                              Click to upload
                            </span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mt-auto">
                            Supports jpg, png format, file size up to 5M
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white pt-8 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-6">Price Settings</h2>

              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <label className="block text-sm text-gray-600">
                    Channel Price
                  </label>
                  <div className="flex-1 max-w-[200px]">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter amount"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                    />
                  </div>
                  <span className="text-sm text-gray-600">SOL</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] z-10">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div>
              <h3 className="text-sm font-medium">Payment Required</h3>
              <p className="text-xs text-gray-500">Available after payment</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium">0.03 SOL</div>
            </div>
          </div>
          <Button
            type="submit"
            form="podcast-form"
            className="w-[200px] bg-black text-white hover:bg-black/90"
          >
            Pay and Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePodcastPage;
