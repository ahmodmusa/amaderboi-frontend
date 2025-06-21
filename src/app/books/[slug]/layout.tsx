import { ReactNode } from 'react';
import { getBookBySlug } from '@/lib/api';
import PageLayout from '@/app/PageLayout';

interface BookLayoutProps {
  children: ReactNode;
  params: {
    slug: string;
  };
}

export default async function BookLayout({ children, params }: BookLayoutProps) {
  const book = await getBookBySlug(params.slug);
  
  if (!book) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          </div>
        </div>
      </PageLayout>
    );
  }

  const author = book._embedded?.author?.[0]?.name || 'Unknown Author';

  return (
    <PageLayout
      bookTitle={book.title.rendered}
      bookAuthor={author}
    >
      {children}
    </PageLayout>
  );
}
