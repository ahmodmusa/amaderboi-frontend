import { Book, Author, Category } from '@/types';
import { fetchFromApi, fetchPaginatedData, getEmbeddedData } from './api-utils';

// Books API
export async function getBooks(params: {
  page?: number;
  per_page?: number;
  categories?: number[];
  author?: number;
  search?: string;
  orderby?: 'date' | 'title' | 'views' | 'downloads';
  order?: 'asc' | 'desc';
  _embed?: boolean | string;
} = {}): Promise<{ items: Book[]; total: number; totalPages: number }> {
  const { 
    page = 1, 
    per_page = 12, 
    orderby = 'date', 
    order = 'desc',
    _embed = true, // Default to including embedded data
    ...rest 
  } = params;
  
  return fetchPaginatedData<Book>('/book', {
    page,
    per_page,
    orderby,
    order,
    _embed: _embed ? '1' : undefined,
    ...rest
  });
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  try {
    const books = await fetchFromApi<Book[]>('/book', { 
      slug,
      _embed: '1' // This will include author, featured media, and terms
    });
    return books[0] || null;
  } catch (error) {
    console.error('Error fetching book by slug:', error);
    return null;
  }
}

export async function getRelatedBooks(categoryIds: number[] = [], excludeId: number, limit = 4): Promise<Book[]> {
  // If no category IDs provided, return empty array
  if (!categoryIds || categoryIds.length === 0) {
    return [];
  }

  try {
    const { items } = await fetchPaginatedData<Book>('/book', {
      categories: categoryIds,
      exclude: excludeId,
      per_page: limit,
      orderby: 'date',
      order: 'desc',
      _embed: '1' // Include author and featured media
    });
    return items;
  } catch (error) {
    console.error('Error fetching related books:', error);
    return [];
  }
}

// Authors API
export async function getAuthors(params: {
  page?: number;
  per_page?: number;
  search?: string;
  orderby?: 'name' | 'id' | 'include';
  order?: 'asc' | 'desc';
} = {}): Promise<{ items: Author[]; total: number; totalPages: number }> {
  const { page = 1, per_page = 12, orderby = 'name', order = 'asc', ...rest } = params;
  
  return fetchPaginatedData<Author>('/users', {
    page,
    per_page,
    orderby,
    order,
    context: 'view',
    ...rest
  });
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  try {
    const authors = await fetchFromApi<Author[]>('/users', { slug });
    return authors[0] || null;
  } catch (error) {
    console.error('Error fetching author by slug:', error);
    return null;
  }
}

export async function getAuthorBooks(authorId: number, limit = 12): Promise<Book[]> {
  try {
    const { items } = await fetchPaginatedData<Book>('/book', {
      author: authorId,
      per_page: limit,
      orderby: 'date',
      order: 'desc'
    });
    return items;
  } catch (error) {
    console.error('Error fetching author books:', error);
    return [];
  }
}

// Categories API
export async function getCategories(params: {
  page?: number;
  per_page?: number;
  search?: string;
  orderby?: 'name' | 'id' | 'include' | 'slug';
  order?: 'asc' | 'desc';
  parent?: number;
  exclude?: number[];
  include?: number[];
} = {}): Promise<{ items: Category[]; total: number; totalPages: number }> {
  const { page = 1, per_page = 100, orderby = 'name', order = 'asc', ...rest } = params;
  
  return fetchPaginatedData<Category>('/categories', {
    page,
    per_page,
    orderby,
    order,
    hide_empty: true,
    ...rest
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const categories = await fetchFromApi<Category[]>('/categories', { slug });
    return categories[0] || null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    return null;
  }
}

export async function getCategoryBooks(categoryId: number, limit = 12): Promise<Book[]> {
  try {
    const { items } = await fetchPaginatedData<Book>('/book', {
      categories: categoryId,
      per_page: limit,
      orderby: 'date',
      order: 'desc'
    });
    return items;
  } catch (error) {
    console.error('Error fetching category books:', error);
    return [];
  }
}

// Helper function to get featured image from book data
export function getBookFeaturedImage(
  book: Book,
  size: string = 'medium'
): { src: string; alt: string } | null {
  // Get the first featured media item (single=false returns the first item or null)
  const media = getEmbeddedData<WordPress.Media>(
    book,
    'wp:featuredmedia',
    false
  );
  
  if (!media) return null;
  
  const sourceUrl = media.source_url;
  const altText = media.alt_text || book.title.rendered;
  
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
