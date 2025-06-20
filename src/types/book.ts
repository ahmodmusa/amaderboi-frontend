export interface Book {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      slug: string;
    }>;
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
  meta?: {
    views: number;
    downloads: number;
    pages?: number;
    reading_time?: string;
    [key: string]: any; // For any additional meta fields
  };
}
