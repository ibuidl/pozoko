'use client';
import { pinata } from '@/api/pinata/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserPda, useZokuProgram } from '@/hooks/program';
import { Avatar } from 'radix-ui';
import { useRef, useState } from 'react';

function FormItem({
  label,
  placeholder,
  value,
  onChange,
  required = true,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div>
      <div className="text-sm text-gray-600 ">{label}</div>
      <Input
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    was: '',
    email: '',
    x: '',
    wrapcast: '',
    lens: '',
    magic: '',
    discord: '',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>(
    'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80',
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { userPda, isUserInitialized } = useUserPda();
  const { initUser, updateUser } = useZokuProgram();

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const urlRequest = await fetch('/api/url');
      const urlResponse = await urlRequest.json();
      const upload = await pinata.upload.public.file(file).url(urlResponse.url);
      const imgUrl = await pinata.gateways.public.convert(upload.cid);

      setAvatarUrl(imgUrl);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSaveProfile = () => {
    if (isUserInitialized) {
      if (!userPda) {
        return;
      }

      updateUser.mutate({
        userPda,
        nickname: formData.name,
        avatar: avatarUrl,
      });
    } else {
      initUser.mutate({
        nickname: formData.name,
        avatar: avatarUrl,
      });
    }
  };

  return (
    <div className="p-[20px] mx-auto h-full">
      <div className="p-[20px] mx-auto h-full bg-white rounded-[12px] border border-[#E6E9EF] space-y-4">
        <div className="p-[20px]   bg-white rounded-[8px] border border-[#E6E9EF]">
          <p className="text-[16px] font-bold mb-[10px]">Avatar</p>
          <div className="flex items-end gap-4">
            <Avatar.Root className="inline-flex size-[150px] select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
              <Avatar.Image
                className="size-full rounded-[inherit] object-cover"
                src={avatarUrl}
                alt="avatar"
              />
            </Avatar.Root>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleAvatarUpload}
            />
            <Button
              className="p-[8px_12px] bg-white text-black text-[12px] border border-black transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500"
              onClick={handleUploadClick}
            >
              Upload
            </Button>
          </div>
        </div>
        <div className="p-[20px]  bg-white rounded-[8px] border border-[#E6E9EF]">
          <p className="text-[16px] font-bold mb-[10px]">Host Information</p>
          <div className="grid grid-cols-2 gap-4">
            <FormItem
              label="Name"
              placeholder="enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <FormItem
              label="Website URL"
              placeholder="enter your website URL"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
            />
            <FormItem
              label="was"
              placeholder="Tell us about yourself"
              value={formData.was}
              onChange={(e) =>
                setFormData({ ...formData, was: e.target.value })
              }
            />
          </div>
        </div>
        <div className="p-[20px]  bg-white rounded-[8px] border border-[#E6E9EF]">
          <p className="text-[16px] font-bold mb-[10px]">Social Links</p>
          <div className="grid grid-cols-2 gap-4">
            <FormItem
              label="Email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <FormItem
              label="X"
              placeholder="Enter your X URL"
              value={formData.x}
              onChange={(e) => setFormData({ ...formData, x: e.target.value })}
            />
            <FormItem
              label="Wrapcast"
              placeholder="Enter your Wrapcast URL"
              value={formData.wrapcast}
              onChange={(e) =>
                setFormData({ ...formData, wrapcast: e.target.value })
              }
            />
            <FormItem
              label="Lens"
              placeholder="Enter your Lens URL"
              value={formData.lens}
              onChange={(e) =>
                setFormData({ ...formData, lens: e.target.value })
              }
            />
            <FormItem
              label="Magic"
              placeholder="Enter your Magic URL"
              value={formData.magic}
              onChange={(e) =>
                setFormData({ ...formData, magic: e.target.value })
              }
            />
            <FormItem
              label="Discord"
              placeholder="Enter your Discord URL"
              value={formData.discord}
              onChange={(e) =>
                setFormData({ ...formData, discord: e.target.value })
              }
            />
          </div>
        </div>
        <Button onClick={onSaveProfile}>
          {isUserInitialized ? 'update' : 'initialize'}
        </Button>
      </div>
    </div>
  );
};
