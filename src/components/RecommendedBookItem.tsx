'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEye } from 'react-icons/fi';

interface RecommendedBookItemProps {
  book: {
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
  };
}

export default function RecommendedBookItem({ book }: RecommendedBookItemProps) {
  const [imageError, setImageError] = useState(false);
  const imageUrl = `https://cdn.amaderboi.net/covers/${book.slug}.webp`;
  const authorName = book._embedded?.author?.[0]?.name || 'Unknown Author';
  const viewCount = book.meta?.views?.toLocaleString() || '0';

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link 
      href={`/books/${book.slug}`}
      className="group block hover:bg-gray-50 p-2 rounded transition-colors"
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 relative w-12 h-16 overflow-hidden rounded bg-gray-100">
          <Image
            src={imageError ? '/placeholder-book.jpg' : imageUrl}
            alt={book.title.rendered}
            fill
            sizes="100px"
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            onError={handleImageError}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 truncate leading-tight">
            {book.title.rendered}
          </p>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {authorName}
          </p>
          <div className="flex items-center text-xs text-gray-500 mt-0.5">
            <FiEye className="mr-1 w-3 h-3" />
            <span>{viewCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}