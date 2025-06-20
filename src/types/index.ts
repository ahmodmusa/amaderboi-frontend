/**
 * WordPress REST API Base Interface
 * Common properties for all WordPress REST API responses
 */
export interface WPBase {
  /** Unique identifier for the resource */
  id: number;
  
  /** An alphanumeric identifier for the resource unique to its type */
  slug: string;
  
  /** URL to the resource */
  link: string;
  
  /** Links to related resources */
  _links?: {
    /** Link to the resource itself */
    self?: Array<{ href: string }>;
    
    /** Link to the collection containing this resource */
    collection?: Array<{ href: string }>;
    
    /** Link to the about page for this resource type */
    about?: Array<{ href: string }>;
    
    /** Additional links */
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Book interface representing a book in the system
 * Extends the base WordPress post type with book-specific fields
 */
export interface Book extends WPBase {
  /** The title of the book */
  title: {
    /** The title in the requested format */
    rendered: string;
  };

  /** The content of the book */
  content: {
    /** The content in the requested format */
    rendered: string;
    /** Whether the content is protected with a password */
    protected: boolean;
  };

  /** The excerpt of the book */
  excerpt: {
    /** The excerpt in the requested format */
    rendered: string;
    /** Whether the excerpt is protected with a password */
    protected: boolean;
  };

  /** The ID of the author of the book */
  author: number;
  
  /** The ID of the featured media (cover image) */
  featured_media: number;
  
  /** Whether comments are open for the book */
  comment_status: string;
  
  /** Whether pings are open for the book */
  ping_status: string;
  
  /** Whether the book is sticky */
  sticky: boolean;
  
  /** The template to use for displaying the book */
  template: string;
  
  /** The format of the book */
  format: string;
  
  /** Meta fields for the book */
  meta: {
    /** Number of views */
    views: number;
    /** Number of downloads */
    downloads: number;
    /** Number of pages (optional) */
    pages?: number;
    /** Estimated reading time (optional) */
    reading_time?: string;
    /** Additional meta fields */
    [key: string]: any;
  };
  
  /** Array of category IDs */
  categories: number[];
  
  /** Array of tag IDs */
  tags: number[];
  
  /** Embedded resources */
  _embedded?: {
    /** Author information */
    author?: Author[];
    
    /** Featured media (cover image) */
    'wp:featuredmedia'?: Array<{
      /** Media ID */
      id: number;
      /** Alternative text for the image */
      alt_text: string;
      /** Source URL of the image */
      source_url: string;
      /** Media details */
      media_details: {
        /** Image width */
        width: number;
        /** Image height */
        height: number;
        /** Image file path */
        file: string;
        /** Available image sizes */
        sizes: {
          [key: string]: {
            /** Size-specific file path */
            file: string;
            /** Image width */
            width: number;
            /** Image height */
            height: number;
            /** MIME type */
            mime_type: string;
            /** Source URL for this size */
            source_url: string;
          };
        };
        /** Additional image metadata */
        image_meta: any;
      };
    }>;
    
    /** Taxonomy terms (categories and tags) */
    'wp:term'?: Array<Array<Category | Tag>>;
  };
  
}

// Author types
export interface Author extends WPBase {
  name: string;
  url: string;
  description: string;
  link: string;
  slug: string;
  avatar_urls: {
    24: string;
    48: string;
    96: string;
  };
  meta: {
    [key: string]: any;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
  };
}

// Category types
export interface Category extends WPBase {
  name: string;
  description: string;
  count: number;
  parent: number;
  meta: {
    [key: string]: any;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:post_type': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
  };
}

// Tag types
export interface Tag extends WPBase {
  name: string;
  description: string;
  count: number;
  meta: {
    [key: string]: any;
  };
  _links: {
    self: Array<{ href: string }>;
    collection: Array<{ href: string }>;
    about: Array<{ href: string }>;
    'wp:post_type': Array<{ href: string }>;
    curies: Array<{ name: string; href: string; templated: boolean }>;
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
