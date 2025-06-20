import { ListResponse } from '@/types';

/**
 * Formats API response into a consistent list response format
 */
export function formatListResponse<T>(
  items: T[],
  total: number,
  page: number,
  perPage: number
): ListResponse<T> {
  return {
    items,
    total,
    totalPages: Math.ceil(total / perPage),
    currentPage: page,
    perPage,
  };
}

/**
 * Parses query parameters for list operations
 */
export function parseListParams(
  searchParams: URLSearchParams,
  defaults: { page?: number; perPage?: number } = {}
) {
  const page = parseInt(searchParams.get('page') || '') || defaults.page || 1;
  const perPage = parseInt(searchParams.get('per_page') || '') || defaults.perPage || 12;
  const search = searchParams.get('search') || undefined;
  const orderby = searchParams.get('orderby') || undefined;
  const order = searchParams.get('order') || undefined;
  const category = searchParams.get('category') || undefined;
  const author = searchParams.get('author') || undefined;

  return {
    page,
    perPage,
    search,
    orderby,
    order: order as 'asc' | 'desc' | undefined,
    category: category ? parseInt(category) : undefined,
    author: author ? parseInt(author) : undefined,
  };
}

/**
 * Handles API errors consistently
 */
export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number = 500, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }

  static fromResponse(error: any): ApiError {
    if (error instanceof ApiError) return error;
    if (error.response) {
      return new ApiError(
        error.response.data?.message || 'API request failed',
        error.response.status,
        error.response.data
      );
    }
    return new ApiError(error.message || 'An unknown error occurred');
  }
}

/**
 * Formats a date string to a localized date
 */
export function formatDate(dateString: string, locale: string = 'bn-BD'): string {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Truncates text to a specified length
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Gets the first image URL from HTML content
 */
export function getFirstImageUrl(html: string): string | null {
  if (!html) return null;
  
  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
}

/**
 * Converts a WordPress featured media object to a simplified image object
 */
export function getFeaturedImage(media: any, size: string = 'medium'): { src: string; alt: string } | null {
  if (!media) return null;
  
  const sourceUrl = media.source_url;
  const altText = media.alt_text || '';
  
  // If we have media details with sizes, try to get the requested size
  if (media.media_details?.sizes?.[size]?.source_url) {
    return {
      src: media.media_details.sizes[size].source_url,
      alt: altText,
    };
  }
  
  // Fall back to the original image
  return sourceUrl ? { src: sourceUrl, alt: altText } : null;
}

/**
 * Formats a number with commas for better readability
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}