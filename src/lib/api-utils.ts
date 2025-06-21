import { ApiError } from './utils';

const API_BASE_URL = 'https://admin.amaderboi.net/wp-json/wp/v2';

export async function fetchFromApi<T>(
  endpoint: string, 
  params: Record<string, any> = {}
): Promise<T> {
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(2, 8);
  
  console.group(`[${requestId}] fetchFromApi: ${endpoint}`);
  console.log('Request params:', JSON.stringify(params, null, 2));
  
  try {
    const queryParams = new URLSearchParams();
    
    // Add all parameters to the query
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v.toString()));
      } else if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });
    
    // Always embed related resources
    if (!queryParams.has('_embed')) {
      queryParams.append('_embed', '1');
    }
    
    const url = `${API_BASE_URL}${endpoint}?${queryParams}`;
    console.log('Full URL:', url);
    
    const res = await fetch(url);
    const responseTime = Date.now() - startTime;
    
    console.log(`Response status: ${res.status} (${responseTime}ms)`);
    
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
        console.error('Error response:', errorData);
      } catch (e) {
        errorData = { message: 'Failed to parse error response' };
        console.error('Failed to parse error response');
      }
      
      const error = new ApiError(
        errorData.message || `API request failed with status ${res.status}`,
        res.status,
        errorData
      );
      
      console.error('API Error:', error);
      throw error;
    }
    
    const data = await res.json();
    console.log('Response data:', JSON.stringify(data, null, 2).substring(0, 500) + (JSON.stringify(data).length > 500 ? '...' : ''));
    console.groupEnd();
    
    return data;
  } catch (error) {
    console.error(`Error in fetchFromApi [${requestId}]:`, error);
    console.groupEnd();
    throw ApiError.fromResponse(error);
  }
}

export async function fetchPaginatedData<T>(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<{ items: T[]; total: number; totalPages: number }> {
  console.log(`fetchPaginatedData called for ${endpoint} with params:`, params);
  
  const { page = 1, per_page = 12, exclude, ...restParams } = params;
  
  // Build query parameters
  const queryParams: Record<string, any> = {
    ...restParams,
    page,
    per_page,
  };

  // Handle exclude parameter - WordPress REST API expects comma-separated IDs
  if (exclude) {
    if (Array.isArray(exclude)) {
      queryParams.exclude = exclude.join(',');
    } else {
      queryParams.exclude = String(exclude);
    }
  }
  
  console.log('Final query parameters:', queryParams);
  
  try {
    const data = await fetchFromApi<{ 
      data?: any[];
      items?: any[];
      total?: number;
      total_pages?: number;
    }>(endpoint, queryParams);
    
    console.log('Raw API response:', data);
    
    // Handle different response formats
    const items = Array.isArray(data) 
      ? data 
      : data?.data || data?.items || [];
      
    const total = data?.total || items.length;
    const totalPages = data?.total_pages || Math.ceil(total / per_page) || 1;
    
    console.log(`Processed response: ${items.length} items, ${total} total, ${totalPages} pages`);
    
    return { 
      items: items as T[], 
      total, 
      totalPages 
    };
  } catch (error) {
    console.error('Error in fetchPaginatedData:', error);
    throw error; // Re-throw to be handled by the caller
  }
}

/**
 * Extracts embedded data from a WordPress REST API response
 * @param data The response data containing _embedded field
 * @param relation The relation name to extract (e.g., 'wp:featuredmedia')
 * @param isArray Whether to return an array or a single item
 * @returns The embedded data or null/empty array if not found
 */
export function getEmbeddedData<T>(
  data: any,
  relation: string,
  isArray: true
): T[];
export function getEmbeddedData<T>(
  data: any,
  relation: string,
  isArray?: false
): T | null;
export function getEmbeddedData<T>(
  data: any,
  relation: string,
  isArray: boolean = true
): T | T[] | null {
  if (!data?._embedded?.[relation]) {
    return isArray ? ([] as T[]) : null;
  }
  
  const embedded = data._embedded[relation] as T[];
  
  if (!Array.isArray(embedded)) {
    return isArray ? [embedded] : embedded;
  }
  
  if (isArray) {
    return embedded;
  }
  
  return embedded[0] || null;
}
