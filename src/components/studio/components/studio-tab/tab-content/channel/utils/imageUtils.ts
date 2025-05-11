// Upload cover image function
export async function uploadCoverImage(file: File): Promise<string> {
  // Create FormData object for file upload
  const formData = new FormData();
  formData.append('file', file);

  try {
    // In a real project, call the actual file upload API
    // This is a sample implementation, replace with actual API
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image upload failed');
    }

    const data = await response.json();
    return data.url; // Return uploaded URL
  } catch (error) {
    console.error('Failed to upload image:', error);
    // Return a default URL if failed, in a real project should throw error
    return `https://example.com/images/${Date.now()}`;
  }
}

// Convert local file to preview URL
export function createImagePreviewURL(file: File): string {
  return URL.createObjectURL(file);
}

// Release preview URL resources
export function releaseImagePreviewURL(url: string): void {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}
