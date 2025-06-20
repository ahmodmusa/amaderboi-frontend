'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface BookCardProps {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  views?: number;
}

export default function BookCard({ id, title, slug, coverImage, author, views = 0 }: BookCardProps) {
  const router = useRouter();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`https://cdn.amaderboi.net/books/${slug}.pdf`, '_blank');
  };

  // Use CDN URL for book cover
  const cdnCoverUrl = `https://cdn.amaderboi.net/covers/${slug}.webp`;
  
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`/books/${slug}`)}
    >
      <div className="relative h-64 w-full">
        <Image
          src={cdnCoverUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // Fallback to the original coverImage if CDN fails
            if (coverImage && coverImage !== cdnCoverUrl) {
              const target = e.target as HTMLImageElement;
              target.src = coverImage;
            } else {
              // Fallback to placeholder if both CDN and original fail
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-book.jpg';
              target.onerror = null; // Prevent infinite loop
            }
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 h-14">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{author}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-gray-500 flex items-center">
            <FiEye className="mr-1" /> {views.toLocaleString()}
          </span>
          <button
            onClick={handleDownload}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
          >
            <FiDownload className="mr-1" /> ডাউনলোড
          </button>
        </div>
      </div>
    </div>
  );
}
