/**
 * Fetches the file size from a URL using HEAD request
 * @param url The URL of the file
 * @returns File size in bytes or null if unable to fetch
 */
export async function getFileSize(url: string): Promise<number | null> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (!response.ok) return null;
    
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : null;
  } catch (error) {
    console.error('Error getting file size:', error);
    return null;
  }
}

/**
 * Formats file size from bytes to human readable format
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "2.5 MB")
 */
export function formatFileSize(bytes: number | null): string {
  if (bytes === null || bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
