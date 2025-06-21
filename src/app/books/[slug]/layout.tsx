import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getBookBySlug } from '@/lib/api';
import PageLayout from '@/app/PageLayout';
import BookClientLayout from './BookLayoutClient'; // Using the new filename

interface BookLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

export default async function BookLayout({ children, params }: BookLayoutProps) {
  const { slug } = params;
  
  if (!slug) {
    notFound();
  }

  try {
    const bookData = await getBookBySlug(slug);
    
    if (!bookData) {
      notFound();
    }

    const author = bookData?._embedded?.author?.[0]?.name || 'Unknown Author';
    
    return (
      <PageLayout
        bookTitle={bookData?.title?.rendered || 'Untitled Book'}
        bookAuthor={author}
      >
        <BookClientLayout bookData={bookData}>
          {children}
        </BookClientLayout>
      </PageLayout>
    );
  } catch (error) {
    console.error('Error in BookLayout:', error);
    notFound();
  }
}
