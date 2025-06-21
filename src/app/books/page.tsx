import { FiSearch, FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { getBooks } from '@/lib/api';
import EyeCatchingBookCard from '@/components/EyeCatchingBookCard';
import { Suspense } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'All Books - Amader Boi',
  description: 'Browse our complete collection of Bengali books across all categories. Find your next great read from our extensive library.'
};

interface Book {
  id: number;
  title: string;
  slug: string;
  coverImage: string | null;
  author: string;
  views: number;
  categories?: Array<{ id: number; name: string; slug: string }>;
}

async function BooksList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : '';
  const category = typeof searchParams.category === 'string' ? searchParams.category : '';
  const sortBy = typeof searchParams.sort === 'string' ? searchParams.sort : 'date';
  const order = typeof searchParams.order === 'string' ? searchParams.order : 'desc';
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const perPage = 12;

  try {
    const { items: books, total, totalPages } = await getBooks({
      search: searchQuery,
      categories: category ? [parseInt(category)] : undefined,
      orderby: sortBy as any,
      order: order as 'asc' | 'desc',
      page,
      per_page: perPage,
      _embed: true
    });

    // Process books data to match Book interface
    const processedBooks = books.map((book: any) => {
      // Get author name from book_author taxonomy (similar to home page)
      const getAuthorName = () => {
        try {
          // Get the first author from the book_author taxonomy
          const authorTerm = book._embedded?.['wp:term']?.[1]?.[0]; // [1] is for book_author terms
          if (authorTerm) {
            return authorTerm.name;
          }
          
          // Fallback to the book_author ID if available
          if (book.book_author?.[0]) {
            return `Author ID: ${book.book_author[0]}`;
          }
          
          return 'অজানা লেখক';
        } catch (error) {
          console.error('Error getting author name:', error);
          return 'অজানা লেখক';
        }
      };

      return {
        id: book.id,
        title: book.title.rendered,
        slug: book.slug,
        coverImage: book._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        author: getAuthorName(),
        views: book.meta?.views || 0,
        categories: book._embedded?.['wp:term']?.[0]?.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug
        })) || []
      };
    });

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Our Book Collection
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover {total}+ books across various categories
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search books by title or author..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                defaultValue={searchQuery}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="relative">
              <select
                name="sort"
                className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md pl-3 pr-8 py-2 text-base focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                defaultValue={sortBy}
              >
                <option value="date">Newest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="views">Most Viewed</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {processedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {processedBooks.map((book) => (
                <EyeCatchingBookCard
                  key={book.id}
                  id={book.id}
                  title={book.title}
                  slug={book.slug}
                  coverImage={book.coverImage || '/placeholder-book.jpg'}
                  author={book.author}
                  views={book.views}
                  categories={book.categories}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = pageNum === page;
                    return (
                      <Link
                        key={pageNum}
                        href={{
                          pathname: '/books',
                          query: { ...searchParams, page: pageNum }
                        }}
                        className={`px-3 py-1 rounded-md ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  })}
                  {page < totalPages && (
                    <Link
                      href={{
                        pathname: '/books',
                        query: { ...searchParams, page: page + 1 }
                      }}
                      className="px-3 py-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      Next
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <FiSearch className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No books found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <Link
                href="/books"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Clear all filters
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading books:', error);
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
            Error Loading Books
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-4">
            We're having trouble loading the books. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 dark:hover:bg-red-900/70 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
}

export default function BooksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mx-auto"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto"></div>
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mt-8 w-full max-w-2xl mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="mt-4 h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    }>
      <BooksList searchParams={searchParams} />
    </Suspense>
  );
}
