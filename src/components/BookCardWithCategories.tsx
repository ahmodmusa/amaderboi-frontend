'use client';

import Image from 'next/image';
import { FiDownload, FiEye } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface BookCardProps {
  id: number;
  title: string;
  slug: string;
  coverImage: string;
  author: string;
  views?: number;
  categories?: Array<{name: string}>;
}

export default function BookCardWithCategories({ 
  id, 
  title, 
  slug, 
  coverImage, 
  author, 
  views = 0, 
  categories = [] 
}: BookCardProps) {
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
        
        {/* Category Badge */}
        {categories.length > 0 && (
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 text-blue-600 backdrop-blur-sm">
              {categories[0].name}
            </span>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg text-gray-900 mb-1.5 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 font-medium mb-3">{author}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <div className="flex items-center bg-blue-50 text-blue-600 rounded-full px-2.5 py-1">
              <FiEye className="mr-1.5 w-3.5 h-3.5" />
              <span className="text-xs font-semibold">{views.toLocaleString()}</span>
            </div>
          </div>
          
          <button
            onClick={handleDownload}
            className="text-blue-600 hover:text-white hover:bg-blue-600 text-xs font-medium flex items-center px-3 py-1.5 rounded-md transition-all duration-200"
          >
            <FiDownload className="mr-1" /> ডাউনলোড
          </button>
        </div>
      </div>
    </div>
  );
}
