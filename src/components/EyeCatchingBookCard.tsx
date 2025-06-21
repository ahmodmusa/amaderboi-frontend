'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiDownload, FiEye, FiBookOpen } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface EyeCatchingBookCardProps {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  views?: number;
  categories?: Array<{name: string}>;
}

export default function EyeCatchingBookCard({ 
  id, 
  title, 
  slug, 
  coverImage, 
  author, 
  views = 0, 
  categories = [] 
}: EyeCatchingBookCardProps) {
  const router = useRouter();

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/books/${slug}`);
  };

  const cdnCoverUrl = `https://cdn.amaderboi.net/covers/${slug}.webp`;
  
  return (
    <div 
      className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full overflow-hidden transform hover:-translate-y-1 relative"
      onClick={() => router.push(`/books/${slug}`)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {/* Book Cover */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={cdnCoverUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 20vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = coverImage || '/placeholder-book.jpg';
          }}
          priority={false}
          loading="lazy"
        />
        
        {/* Hover Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 p-4">
          <button 
            onClick={handleDownload}
            className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white font-medium flex items-center px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <FiDownload className="mr-2" /> ডাউনলোড করুন
          </button>
        </div>


      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-900 mb-1.5 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{author}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <div className="flex items-center bg-blue-50 text-blue-600 rounded-full px-2.5 py-1">
              <FiEye className="mr-1.5 w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{views.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="text-xs text-gray-400">
            <span className="font-medium text-gray-500">পিডিএফ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
