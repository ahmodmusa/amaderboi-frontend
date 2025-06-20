'use client';

import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  name: string;
  count: number;
  slug: string;
  icon: React.ReactNode;
}

export default function CategoryCard({ name, count, slug, icon }: CategoryCardProps) {
  const router = useRouter();

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center cursor-pointer"
      onClick={() => router.push(`/categories/${slug}`)}
    >
      <div className="text-3xl text-blue-600 mb-3 flex justify-center">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-1">{name}</h3>
      <p className="text-gray-500 text-sm">{count} বই</p>
    </div>
  );
}
