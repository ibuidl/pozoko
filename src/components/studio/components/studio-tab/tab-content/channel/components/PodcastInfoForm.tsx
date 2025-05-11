'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { PodcastFormData } from '../types';

interface PodcastInfoFormProps {
  formData: PodcastFormData;
  onChange: (data: Partial<PodcastFormData>) => void;
}

export function PodcastInfoForm({ formData, onChange }: PodcastInfoFormProps) {
  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({
        coverImage: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="flex-1 bg-white rounded-lg p-6">
      <p className="text-sm font-bold mb-[20px]">Create Podcast</p>

      <div className="space-y-8">
        <div className="flex items-center">
          <label className="block text-sm text-gray-600 w-[120px]">Title</label>
          <div className="w-[281px]">
            <Input
              required
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) => onChange({ title: e.target.value })}
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
              onChange={(e) => onChange({ description: e.target.value })}
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
  );
}
