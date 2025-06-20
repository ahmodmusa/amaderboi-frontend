'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBook, FiSearch } from 'react-icons/fi';

// Mock data for search results
const mockBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction' },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian' },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance' },
  { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState<typeof mockBooks>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate search
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setSearchTerm(query);
      
      // Simulate API call
      const timer = setTimeout(() => {
        const filtered = mockBooks.filter(book => 
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.category.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Search Results</h1>
        
        {/* Search Box */}
        <div className="mb-8">
          <form action="/search" method="GET" className="relative">
            <input
              type="text"
              name="q"
              defaultValue={searchTerm}
              placeholder="Search for books, authors, categories..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-indigo-600"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            <p className="text-gray-600">Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"</p>
            <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
              {results.map((book) => (
                <Link 
                  key={book.id} 
                  href={`/book/${book.id}`}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-12 w-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-600">
                      <FiBook className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-500">{book.author}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-1">
                        {book.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-gray-500">We couldn't find any books matching "{query}"</p>
            <div className="mt-6">
              <Link 
                href="/books" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse All Books
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Search for books</h3>
            <p className="mt-1 text-gray-500">Enter a book title, author, or category to find what you're looking for.</p>
          </div>
        )}
      </div>
    </div>
  );
}
