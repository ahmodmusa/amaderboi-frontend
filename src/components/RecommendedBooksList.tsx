'use client';

import dynamic from 'next/dynamic';

// Client component for recommended books
const RecommendedBookItem = dynamic(
  () => import('@/components/RecommendedBookItem'),
  { ssr: false }
);

interface RecommendedBooksListProps {
  books: Array<{
    id: number;
    slug: string;
    title: {
      rendered: string;
    };
    _embedded?: {
      author?: Array<{
        name: string;
      }>;
    };
    meta?: {
      views?: number;
    };
  }>;
}

export default function RecommendedBooksList({ books }: RecommendedBooksListProps) {
  return (
    <div className="space-y-3">
      {books.map((book) => (
        <RecommendedBookItem 
          key={`${book.id}-${book.slug}`} 
          book={book} 
        />
      ))}
    </div>
  );
}
