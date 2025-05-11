'use client';

import { useGetBalance, useTransferSol } from '@/hooks/account';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Breadcrumb } from '../../../breadcrumb';
import { FooterActions } from './components/FooterActions';
import { PodcastInfoForm } from './components/PodcastInfoForm';
import { PriceSettingsForm } from './components/PriceSettingsForm';
import { PodcastFormData } from './types';

// Import utility functions
import { initChannelNft, prepareChannelNftArgs } from './utils/channelApi';
import {
  generateSymbolFromTitle,
  validatePodcastForm,
} from './utils/formUtils';
import { checkWalletBalance, checkWalletConnection } from './utils/walletUtils';

// Constants
const MIN_SOL_REQUIRED = 0.3;
const DEFAULT_PAYMENT_AMOUNT = 0.03;

export default function CreatePodcastPage() {
  const router = useRouter();
  const wallet = useWallet();
  const { connection } = useConnection();
  const DESTINATION_ADDRESS = 'your_payment_sol_address'; // TODO: Replace with actual payment address
  const transferSol = useTransferSol({ address: wallet.publicKey! });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PodcastFormData>({
    title: '',
    description: '',
    coverImage: null,
    previewUrl: '',
    price: '0.03', // Default price set to 0.03
  });

  // Get user balance
  const balanceQuery = useGetBalance({
    address: wallet.publicKey!,
  });

  // Handle form data updates
  const handleFormChange = (newData: Partial<PodcastFormData>) => {
    setFormData((prev: PodcastFormData) => ({ ...prev, ...newData }));
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. Check if wallet is connected
      const isConnected = await checkWalletConnection(wallet);
      if (!isConnected) {
        wallet?.connect();
        setIsLoading(false);
        return;
      }

      // 2. Check wallet balance
      const hasEnoughBalance = await checkWalletBalance(
        balanceQuery.data,
        MIN_SOL_REQUIRED,
      );
      if (!hasEnoughBalance) {
        setIsLoading(false);
        return;
      }

      // 3. Validate form completion
      const isFormValid = validatePodcastForm(formData);
      if (!isFormValid) {
        setIsLoading(false);
        return;
      }

      // 4. Process payment
      const paymentAmount =
        parseFloat(formData.price) || DEFAULT_PAYMENT_AMOUNT;

      // 5. Call channel creation API
      // TODO: upload cover image to pinata server, get URL
      // const coverImageUrl = await uploadCoverImage(formData.coverImage!);
      const coverImageUrl =
        'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

      // Generate symbol
      const symbol = generateSymbolFromTitle(formData.title);

      // Prepare channel creation parameters
      const channelData = prepareChannelNftArgs(
        formData.title,
        symbol,
        formData.description,
        coverImageUrl,
        wallet.publicKey!,
        Math.round(paymentAmount * 100),
      );

      // Call API to create channel
      try {
        const channelNftResult = await initChannelNft(
          wallet,
          connection,
          channelData,
        );
        console.log('Channel created successfully:', channelNftResult);
        toast.success('Channel created successfully!');

        // 6. After channel creation, redirect to channel management page
        router.push('/studio/channel');
      } catch (error: any) {
        console.error('Failed to create channel:', error);
        toast.error(
          `Channel creation failed: ${error.message || 'Unknown error'}`,
        );
        setIsLoading(false);
        return;
      }
    } catch (err: any) {
      console.error('Operation failed:', err);
      toast.error(`Operation failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/studio/channel');
  };

  return (
    <div className="flex flex-col justify-between bg-[#F6F6F6]">
      <div className="p-[12px] pb-20 relative">
        <div>
          <Breadcrumb />
          <form
            id="podcast-form"
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4"
          >
            <PodcastInfoForm formData={formData} onChange={handleFormChange} />

            <PriceSettingsForm
              price={formData.price}
              onChange={(price: string) => handleFormChange({ price })}
            />
          </form>
        </div>
      </div>

      <FooterActions
        price={formData.price}
        defaultPrice={DEFAULT_PAYMENT_AMOUNT}
        isLoading={isLoading}
        onCancel={handleCancel}
      />
    </div>
  );
}
