'use client';

import { Button } from '@/components/ui/button';

interface FooterActionsProps {
  price: string;
  defaultPrice: number;
  isLoading: boolean;
  onCancel: () => void;
}

export function FooterActions({
  price,
  defaultPrice,
  isLoading,
  onCancel,
}: FooterActionsProps) {
  return (
    <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] z-10 fixed bottom-0 w-full">
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 py-[10px]">
            Payment required to create channel. Fee:
            {price || defaultPrice} SOL
          </p>
          <Button
            type="submit"
            form="podcast-form"
            className="bg-black text-white hover:bg-black/90"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Pay and Continue'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="ml-[10px] bg-white text-black hover:bg-white/90 border border-black"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
