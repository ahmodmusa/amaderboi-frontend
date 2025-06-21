import Link from 'next/link';
import { FiBook, FiChevronRight, FiFolder } from 'react-icons/fi';

export const metadata = {
  title: 'বিভাগসমূহ - আমাদের বই',
  description: 'আমাদের বইয়ের সকল বিভাগের তালিকা',
};

export const revalidate = 3600; // Revalidate every hour

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  link: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    // Get the base URL dynamically based on the environment
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd ? process.env.NEXT_PUBLIC_SITE_URL : 'http://localhost:3000';
    
    // Use the base URL to create the full API URL
    const apiUrl = new URL('/api/categories', baseUrl).toString();
    
    const res = await fetch(apiUrl, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error('Failed to fetch categories:', error);
      throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Failed to load categories');
    }
    
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let error = '';

  try {
    categories = await getCategories();
  } catch (err) {
    console.error('Error in CategoriesPage:', err);
    error = err instanceof Error ? err.message : 'An unknown error occurred';
  }

  // Function to get initials from category name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Function to get a random color class for the category avatar
  const getRandomColor = (id: number) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-green-100 text-green-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
      'bg-yellow-100 text-yellow-600',
      'bg-indigo-100 text-indigo-600',
      'bg-red-100 text-red-600',
      'bg-teal-100 text-teal-600',
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            বিভাগসমূহ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            আমাদের বইয়ের সকল বিভাগের তালিকা
          </p>
        </div>

        {error ? (
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
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  আবার চেষ্টা করুন
                </button>
              </div>
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full mb-4">
                  <svg
                    className="h-8 w-8 text-yellow-600 dark:text-yellow-400"
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
                <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                  কোন বিভাগ পাওয়া যায়নি
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                  এখনও কোন বইয়ের বিভাগ যোগ করা হয়নি।
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  <span>হোমপেজে ফিরে যান</span>
                  <FiChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${getRandomColor(category.id)}`}
                    >
                      <FiFolder className="h-6 w-6" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {category.name}
                      </h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <FiBook className="mr-1.5 h-4 w-4 flex-shrink-0" />
                        <span>
                          {category.count} টি বই
                        </span>
                      </div>
                    </div>
                  </div>
                  {category.description && (
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {category.description.replace(/<[^>]*>?/gm, '')}
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      বিস্তারিত দেখুন
                      <FiChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
