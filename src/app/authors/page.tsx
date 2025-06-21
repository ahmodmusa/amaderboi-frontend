import Link from 'next/link';
import { FiBook, FiChevronRight, FiUser } from 'react-icons/fi';

export const metadata = {
  title: 'লেখকবৃন্দ - আমাদের বই',
  description: 'আমাদের বইয়ের সকল লেখকদের তালিকা',
};

export const revalidate = 3600; // Revalidate every hour

interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  link: string;
}

async function getAuthors(): Promise<Author[]> {
  try {
    // Get the base URL dynamically based on the environment
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000';
    
    // Use the base URL to create the full API URL
    const apiUrl = new URL('/api/authors', baseUrl).toString();
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Failed to fetch authors:', error);
      throw new Error('Failed to fetch authors');
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to load authors');
    }
    
    return data.authors || [];
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error; // Re-throw to be caught by error boundary
  }
}

export default async function AuthorsPage() {
  let authors: Author[] = [];
  let error = '';
  
  try {
    authors = await getAuthors();
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">লেখকবৃন্দ</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            আমাদের বইয়ের সকল লেখকদের তালিকা। প্রতিটি লেখকের বইগুলো দেখতে ক্লিক করুন।
          </p>
        </div>
        
        {error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
              ত্রুটি: লেখক লোড করতে সমস্যা হয়েছে
            </h3>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/70 transition-colors"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : authors.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <FiUser className="mx-auto h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">কোন লেখক পাওয়া যায়নি</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              এই মুহূর্তে কোন লেখকের তথ্য পাওয়া যাচ্ছে না। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <span>প্রথম পাতায় ফিরে যান</span>
              <FiChevronRight className="ml-1 h-5 w-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div 
                key={author.id}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full"
              >
                <Link 
                  href={`/authors/${author.slug}`}
                  className="block flex-grow"
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl">
                        {author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                          {author.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {author.count} টি বই
                        </p>
                      </div>
                    </div>
                    {author.description && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                          {author.description.replace(/<[^>]*>?/gm, '')}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
                <div className="border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 px-6 py-3">
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <span>সমস্ত বই দেখুন</span>
                    <FiChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
