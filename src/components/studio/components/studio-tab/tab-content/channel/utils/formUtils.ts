import toast from 'react-hot-toast';
import { PodcastFormData } from '../types';

// Validate podcast form completion
export function validatePodcastForm(formData: PodcastFormData): boolean {
  if (!formData.title.trim()) {
    toast.error('Please enter a title');
    return false;
  }

  if (!formData.description.trim()) {
    toast.error('Please enter a description');
    return false;
  }

  if (!formData.coverImage) {
    toast.error('Please upload a cover image');
    return false;
  }

  return true;
}

// Generate symbol from title (for NFT creation)
export function generateSymbolFromTitle(title: string): string {
  return title.substring(0, 5).toUpperCase().replace(/\s+/g, ''); // Generate simple symbol, remove spaces
}

// Get price from form data, use default if not set
export function getPriceFromFormData(
  price: string,
  defaultPrice: number,
): number {
  return parseFloat(price) || defaultPrice;
}
