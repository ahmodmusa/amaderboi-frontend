'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';

// Page metadata type
type PageMetadata = {
  title: string;
  description?: string;
  breadcrumbLabel?: string;
};

// Page metadata mapping
const PAGE_METADATA: Record<string, PageMetadata> = {
  'books': {
    title: 'Our Book Collection',
    description: 'Browse our extensive collection of books across various genres and categories.',
    breadcrumbLabel: 'Books'
  },
  'about': {
    title: 'About Us',
    description: 'Learn more about our mission, vision, and the team behind our bookstore.',
    breadcrumbLabel: 'About'
  },
  'contact': {
    title: 'Contact Us',
    description: 'Get in touch with our team for any inquiries or support.',
    breadcrumbLabel: 'Contact'
  },
  'account': {
    title: 'My Account',
    description: 'Manage your account details, orders, and preferences.',
    breadcrumbLabel: 'Account'
  }
};

interface PageLayoutProps {
  children: ReactNode;
  bookTitle?: string;
  bookAuthor?: string;
}

export default function PageLayout({ children, bookTitle, bookAuthor }: PageLayoutProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skip the hero section on the home page and book detail pages
  if (pathname === '/' || (pathname.startsWith('/books/') && pathname.split('/').filter(Boolean).length > 1)) {
    return <>{children}</>;
  }

  // Get the current page metadata
  const getPageMetadata = (): PageMetadata => {
    const path = pathname.split('/').filter(Boolean);
    if (path.length === 0) return { title: '' };
    
    const pageKey = path[0];
    const defaultTitle = pageKey
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
      
    return PAGE_METADATA[pageKey] || { 
      title: defaultTitle,
      description: ''
    };
  };

  // Generate breadcrumbs based on the current path
  const getBreadcrumbs = () => {
    const pathArray = pathname.split('/').filter(Boolean);
    if (pathArray.length === 0) return [];
    
    // Special handling for book pages to avoid duplicate entries
    if (bookTitle && pathArray[0] === 'books' && pathArray.length > 1) {
      return [
        { label: 'Books', href: '/books' },
        { label: bookTitle, href: '' } // Empty href means current page
      ];
    }
    
    const breadcrumbs: Array<{ label: string; href: string }> = [];
    let accumulatedPath = '';
    
    for (let i = 0; i < pathArray.length; i++) {
      const path = pathArray[i];
      accumulatedPath += `/${path}`;
      
      // Skip duplicate entries
      if (i > 0 && pathArray[i - 1] === path) continue;
      
      // Skip numeric slugs (like book IDs)
      if (/^\d+$/.test(path)) continue;
      
      // Use custom breadcrumb label if available, otherwise generate one
      const metadata = PAGE_METADATA[path];
      let label: string;
      
      if (metadata?.breadcrumbLabel) {
        label = metadata.breadcrumbLabel;
      } else {
        label = path
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
      
      // Don't add duplicate entries
      if (!breadcrumbs.some(b => b.label === label)) {
        breadcrumbs.push({
          label,
          href: i === pathArray.length - 1 ? '' : accumulatedPath // Empty href means current page
        });
      }
    }
    
    return breadcrumbs;
  };

  let { title, description } = getPageMetadata();
  const breadcrumbs = getBreadcrumbs();
  
  // Override title and description for book pages
  if (bookTitle) {
    title = bookTitle;
    description = bookAuthor || '';
  }

  if (!isMounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <HeroSection 
          title={title}
          breadcrumbs={breadcrumbs}
          description={description}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="container mx-auto px-4 py-8 md:py-12"
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}