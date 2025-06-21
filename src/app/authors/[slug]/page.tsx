import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiBookOpen, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import BookCard from '@/components/BookCard';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

interface Book {
  id: number;
  title: string;
  slug: string;
  coverImage: string | null;
  author: string;
  views: number;
  downloadLink: string;
  excerpt: string;
}

interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  link: string;
}

interface ApiResponse {
  success: boolean;
  author: Author;
  books: Book[];
  error?: string;
  timestamp?: string;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = params;
  const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/authors/${encodeURIComponent(slug)}`;
  
  try {
    console.log(`Fetching author data from: ${apiUrl}`);
    const response = await fetch(apiUrl, { 
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Failed to parse error response');
      console.error('Failed to fetch author data:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        url: apiUrl
      });
      throw new Error(`Failed to fetch author data: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse = await response.json();
    
    // Handle API error responses
    if (!data.success) {
      console.error('API returned error:', data.error);
      throw new Error(data.error || 'Unknown API error');
    }
    
    if (!data.author) {
      console.error('Author data is missing in response');
      throw new Error('Author data is missing in response');
    }
    
    const { author, books = [] } = data;
    const bookCount = books.length;
    
    // Log successful data fetch
    console.log(`Successfully fetched author: ${author.name} with ${bookCount} books`);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link 
            href="/authors" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-6"
          >
            <FiArrowLeft className="mr-2" /> 
            <span>সমস্ত লেখক</span>
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
              {author.name}
            </h1>
            
            {author.description ? (
              <div 
                className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-4"
                dangerouslySetInnerHTML={{ __html: author.description }}
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                No description available for this author.
              </p>
            )}
            
            <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
              <FiBookOpen className="mr-2" />
              <span>{bookCount} {bookCount === 1 ? 'Book' : 'Books'}</span>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Books by {author.name}
          </h2>
          
          {bookCount > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  slug={book.slug}
                  coverImage={book.coverImage || '/placeholder-book.jpg'}
                  author={book.author}
                  views={book.views}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 inline-block">
                <FiBookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Books Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No books have been added for this author yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in AuthorPage:', error);
    
    // Show a more user-friendly error page
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <FiAlertCircle className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Author
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We couldn't load the author information. Please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center"
            >
              <FiRefreshCw className="mr-2" />
              Try Again
            </button>
            <Link
              href="/authors"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 inline-flex items-center justify-center dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <FiArrowLeft className="mr-2" />
              Back to Authors
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
