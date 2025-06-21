import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiBook, FiChevronRight, FiFolder } from 'react-icons/fi';
import BookCard from '@/components/BookCard';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

async function getCategoryData(slug: string) {
  try {
    // Get the base URL dynamically based on the environment
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000';
    const apiUrl = new URL(`/api/categories/${encodeURIComponent(slug)}`, baseUrl).toString();
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Failed to fetch category data:', error);
      throw new Error('Failed to fetch category data');
    }

    const data = await res.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to load category');
    }
    
    return data;
  } catch (error) {
    console.error('Error in getCategoryData:', error);
    throw error;
  }
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = params;
  
  try {
    const data = await getCategoryData(slug);
    return {
      title: `${data.category.name} - আমাদের বই`,
      description: data.category.description 
        ? `${data.category.name} বিভাগের বইসমূহ - ${data.category.description.replace(/<[^>]*>?/gm, '').substring(0, 155)}...`
        : `${data.category.name} বিভাগের বইসমূহ`,
    };
  } catch (error) {
    return {
      title: 'বিভাগ খুঁজে পাওয়া যায়নি - আমাদের বই',
      description: 'আপনার চাহিত বিভাগটি খুঁজে পাওয়া যায়নি',
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  let category: any = null;
  let books: any[] = [];
  let error = '';

  try {
    const data = await getCategoryData(slug);
    category = data.category;
    books = data.books || [];
  } catch (err) {
    console.error('Error in CategoryPage:', err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full mb-4">
                  <svg
                    className="h-8 w-8 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
                  বিভাগ লোড করতে সমস্যা হয়েছে
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  {error || 'অনুগ্রহ করে পরে আবার চেষ্টা করুন'}
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    আবার চেষ্টা করুন
                  </button>
                  <Link
                    href="/categories"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md shadow-sm text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    সমস্ত বিভাগ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/categories" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2 h-4 w-4" />
            <span>সমস্ত বিভাগে ফিরে যান</span>
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 sm:p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <FiFolder className="h-8 w-8" />
                </div>
                <div className="ml-6">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h1>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <FiBook className="mr-1.5 h-4 w-4 flex-shrink-0" />
                    <span>
                      {category.count} টি বই
                    </span>
                  </div>
                </div>
              </div>
              
              {category.description && (
                <div className="mt-6 prose dark:prose-invert max-w-none">
                  <div 
                    className="text-gray-700 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: category.description }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
            <span className="inline-flex items-center">
              <FiBook className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400" />
              {category.name} বিভাগের বইসমূহ
              <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                {books.length}
              </span>
            </span>
          </h2>
          
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  slug={book.slug}
                  coverImage={book.coverImage || '/placeholder-book.jpg'}
                  author={book.author}
                  views={book.views || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <FiBook className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">কোন বই পাওয়া যায়নি</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                এই বিভাগে এখনও কোন বই যোগ করা হয়নি।
              </p>
              <div className="mt-6">
                <Link
                  href="/books"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <span>সমস্ত বই দেখুন</span>
                  <FiChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}