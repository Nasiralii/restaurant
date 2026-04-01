export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'restaurant_products';

  if (!cloudName) {
    throw new Error('Cloudinary cloud name is not configured');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to upload image');
  }

  const data = await response.json();
  return data.secure_url;
}

export function getOptimizedImageUrl(url: string, width: number, height?: number): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  // If already has transformations, replace them
  if (url.includes('/upload/')) {
    const transformations = height 
      ? `w_${width},h_${height},c_fill,q_auto,f_auto`
      : `w_${width},q_auto,f_auto`;
    
    return url.replace('/upload/', `/upload/${transformations}/`);
  }

  return url;
}
