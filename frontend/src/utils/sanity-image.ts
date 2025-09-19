/**
 * Convert Sanity image reference to CDN URL
 */
export function sanityImageUrl(ref: string, width?: number, height?: number): string {
  if (!ref) return '';
  
  const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_STUDIO_PROJECT_ID;
  const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.SANITY_STUDIO_DATASET || 'production';
  
  // Extract the image ID from the Sanity reference
  // Format: image-{assetId}-{width}x{height}-{format}
  let imageId = ref;
  if (ref.startsWith('image-')) {
    imageId = ref.replace('image-', '').replace(/-jpg$/, '.jpg').replace(/-png$/, '.png').replace(/-webp$/, '.webp').replace(/-gif$/, '.gif');
    
    // Handle format like: abc123-1920x1080-jpg -> abc123-1920x1080.jpg
    imageId = imageId.replace(/-(\w+)$/, '.$1');
  }
  
  let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}`;
  
  // Add width/height parameters if provided
  const params = [];
  if (width) params.push(`w=${width}`);
  if (height) params.push(`h=${height}`);
  if (params.length > 0) {
    url += `?${params.join('&')}`;
  }
  
  return url;
}