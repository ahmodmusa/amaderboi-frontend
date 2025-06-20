declare namespace WordPress {
  // Common types for WordPress REST API responses
  export interface BaseResponse {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
      rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    _links: Record<string, Array<{ href: string }>>;
  }

  // Media types
  export interface MediaDetails {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
    image_meta: Record<string, any>;
  }

  export interface Media extends BaseResponse {
    alt_text: string;
    author: number;
    caption: {
      rendered: string;
    };
    comment_status: string;
    description: {
      rendered: string;
    };
    media_type: string;
    media_details: MediaDetails;
    mime_type: string;
    post: number;
    source_url: string;
    title: {
      rendered: string;
    };
  }

  // User/Author types
  export interface User extends BaseResponse {
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: {
      24: string;
      48: string;
      96: string;
      [key: string]: string;
    };
    meta: Record<string, any>;
  }

  // Category/Term types
  export interface Term extends BaseResponse {
    count: number;
    description: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
    meta: Record<string, any>;
  }

  export interface Category extends Term {
    taxonomy: 'category';
  }

  export interface Tag extends Term {
    taxonomy: 'post_tag';
  }

  // Book post type
  export interface Book extends BaseResponse {
    title: {
      rendered: string;
    };
    content: {
      rendered: string;
      protected: boolean;
    };
    excerpt: {
      rendered: string;
      protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    ping_status: string;
    sticky: boolean;
    template: string;
    format: string;
    meta: {
      views: number;
      downloads: number;
      pages?: number;
      reading_time?: string;
      [key: string]: any;
    };
    categories: number[];
    tags: number[];
    _embedded?: {
      author?: User[];
      'wp:featuredmedia'?: Media[];
      'wp:term'?: Array<Array<Category | Tag>>;
    };
  }

  // API response types
  export interface ListResponse<T> {
    items: T[];
    total: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
  }

  // Search types
  export interface SearchResult {
    id: number;
    title: string;
    url: string;
    type: 'book' | 'author' | 'category' | 'tag';
    excerpt?: string;
    thumbnail?: string;
  }
}

export = WordPress;
export as namespace WordPress;