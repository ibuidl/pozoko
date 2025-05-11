'use client';

import { Input } from '@/components/ui/input';

interface PriceSettingsFormProps {
  price: string;
  onChange: (price: string) => void;
}

export function PriceSettingsForm({ price, onChange }: PriceSettingsFormProps) {
  return (
    <div className="bg-white pt-8 p-6 rounded-lg">
      <p className="text-sm font-bold mb-[20px]">Price Settings</p>

      <div className="flex-1">
        <div className="flex items-center space-x-4">
          <label className="block text-sm text-gray-600">Channel Price</label>
          <div className="flex-1 max-w-[200px]">
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter amount"
              value={price}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
          <span className="text-sm text-gray-600">SOL</span>
        </div>
      </div>
    </div>
  );
}
