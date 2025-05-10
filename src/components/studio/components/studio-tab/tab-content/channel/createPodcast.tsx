'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTransferSol } from '@/hooks/account';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Breadcrumb } from '../../../breadcrumb';

export default function CreatePodcastPage() {
  const router = useRouter();
  const wallet = useWallet();
  const DESTINATION_ADDRESS = '你的收款sol地址'; // TODO: 替换为实际收款地址
  const transferSol = useTransferSol({ address: wallet.publicKey! });
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
    if (!wallet.publicKey) {
      alert('请先连接钱包');
      return;
    }
    try {
      await transferSol.mutateAsync({
        destination: new PublicKey(DESTINATION_ADDRESS),
        amount: parseFloat(formData.price || '0.03'), // 默认0.03
      });
      // 支付成功后，继续后续逻辑（如表单提交、跳转等）
      alert('支付成功！');
      // TODO: 这里可以继续你的表单提交逻辑
    } catch (err: any) {
      alert('支付失败: ' + (err?.message || err));
    }
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
            <div className="flex-1 bg-white rounded-lg p-6">
              <p className="text-sm font-bold mb-[20px]">Create Podcast</p>

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
              <p className="text-sm font-bold mb-[20px]">Price Settings</p>

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
