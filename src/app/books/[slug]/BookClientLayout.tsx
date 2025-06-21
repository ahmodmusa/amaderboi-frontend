'use client';

import { ReactNode } from 'react';

interface BookClientLayoutProps {
  children: ReactNode;
  bookData: {
    title?: { rendered: string };
    _embedded?: any;
  };
}

export default function BookClientLayout({ children, bookData }: BookClientLayoutProps) {
  // This client component can handle any client-side interactivity
  // that might be needed for the book page
  
  return <>{children}</>;
}
