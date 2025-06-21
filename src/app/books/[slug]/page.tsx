import Link from 'next/link';
import { FiDownload, FiEye, FiBookOpen, FiClock, FiCalendar, FiTag, FiFile, FiUser, FiBook, FiArrowRight } from 'react-icons/fi';
import { getBookBySlug, getRelatedBooks, getBooks } from '@/lib/api';
import { getFileSize, formatFileSize } from '@/lib/file-utils';
import BookCard from '@/components/BookCard';
import BookCoverImage from '@/components/BookCoverImage';
import ShareButtons from '@/components/ShareButtons';



// Helper function to get random books
const getRandomBooks = (books: any[], count: number, excludeId: number): any[] => {
  const filtered = books.filter(book => book.id !== excludeId);
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

interface BookPageProps {
  params: {
    slug: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookBySlug(params.slug);
  // Fetch more books for better randomization
  const allBooksResponse = await getBooks({ per_page: 20 });
  const allBooks = allBooksResponse?.items || [];
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book not found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // CDN URL for book download
  const downloadUrl = `https://cdn.amaderboi.net/books/${params.slug}.pdf`;
  const categories = book._embedded?.['wp:term']?.[0] || [];
  // Get author from wp:term (same as home page) or fallback to other sources
  const authorTerm = book._embedded?.['wp:term']?.[1]?.[0]; // [1] is for book_author terms
  const author = authorTerm 
    ? { name: authorTerm.name }
    : book._embedded?.author?.[0] || 
      (book.meta?.author ? { name: book.meta.author } : { name: 'Unknown Author' });
  
  // Get PDF file size
  const pdfSize = await getFileSize(downloadUrl);
  const formattedFileSize = formatFileSize(pdfSize || book.meta?.file_size);
  
    // Get related books from the first category
  const categoryIds = categories.map((cat: any) => cat.id);
  console.log('Category IDs:', categoryIds);
  let relatedBooks: any[] = [];
  
  try {
    relatedBooks = await getRelatedBooks(categoryIds, book.id);
    console.log('Fetched related books:', relatedBooks);
    // Filter out the current book and limit to 4
    relatedBooks = relatedBooks.filter((b: any) => b.id !== book.id).slice(0, 4);
    console.log('Filtered related books:', relatedBooks);
  } catch (error) {
    console.error('Error loading related books:', error);
    relatedBooks = [];
  }

  // Get recommended books (random 5 books from the same categories)
  let recommendedBooks: any[] = [];
  try {
    if (categoryIds.length > 0) {
      console.log('Fetching recommended books for categories:', categoryIds);
      
      // First try to get books from the same categories
      const { items } = await getBooks({
        categories: categoryIds,
        per_page: 20, // Fetch more to ensure we get enough after filtering
        orderby: 'date',
        order: 'desc',
        _embed: true // Explicitly request embedded data
      });
      
      console.log('Fetched recommended books:', items);
      
      // Process the books
      if (items && items.length > 0) {
        // Filter out the current book and ensure we have unique books
        const uniqueBooks = Array.from(new Map(
          items.map((item: any) => [item.id, item])
        ).values());
        
        recommendedBooks = uniqueBooks
          .filter((item: any) => item.id !== book.id)
          .slice(0, 5); // Limit to 5 books
        
        console.log('Filtered recommended books:', recommendedBooks);
      }
    } else {
      console.log('No category IDs found for recommendations');
    }
    
    // If not enough category-based recommendations, add random books
    if (recommendedBooks.length < 5) {
      console.log('Adding random books to recommendations');
      const needed = 5 - recommendedBooks.length;
      const availableBooks = allBooks.filter(b => b.id !== book.id);
      const randomBooks = getRandomBooks(availableBooks, needed, book.id);
      recommendedBooks = [...recommendedBooks, ...randomBooks];
      console.log('Final recommended books:', recommendedBooks);
    }
  } catch (error) {
    console.error('Error loading recommended books:', error);
    recommendedBooks = getRandomBooks(allBooks, 5, book.id);
  }

  // Generate universal book description
  const categoryNames = categories.map((cat: any) => cat.name).join(', ');
  const universalDescription = `${book.title.rendered} book written by ${author.name}${categoryNames ? ` in ${categoryNames}` : ''}. It has been viewed ${book.meta?.views?.toLocaleString() || '0'} times.`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Main Book Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Book Cover and Info */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Book Cover */}
              <div className="md:w-1/3">
                <div className="sticky top-4">
                  <BookCoverImage 
                    slug={params.slug}
                    alt={book.title.rendered}
                    className="rounded-lg shadow-lg w-full max-w-xs mx-auto"
                  />
                  <div className="mt-4 flex justify-center">
                    <ShareButtons 
                      url={`${process.env.NEXT_PUBLIC_SITE_URL}/books/${params.slug}`}
                      title={book.title.rendered}
                      description={`Check out "${book.title.rendered}" by ${author.name}`}
                    />
                  </div>
                </div>
              </div>
              
              {/* Book Info */}
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title.rendered}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <FiUser className="mr-2 text-blue-600" />
                  <span className="font-medium">{author?.name || 'Unknown Author'}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <FiBook className="mr-1" /> {categories[0]?.name || 'Uncategorized'}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiEye className="mr-1" /> {book.meta?.views?.toLocaleString() || '0'} views
                  </span>
                </div>
                
                {/* Universal Description */}
                <div className="prose max-w-none mb-6 text-gray-700">
                  <p>{universalDescription}</p>
                </div>
                
                {/* Download Button */}
                <div className="mt-6">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full md:w-auto"
                  >
                    <FiDownload className="mr-2" />
                    Download Now
                  </a>
                </div>
                
                {/* Book Details */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Book Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <FiFile className="mr-2 text-blue-600 flex-shrink-0" />
                      <span>Format: PDF</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiFile className="mr-2 text-blue-600 flex-shrink-0" />
                      <span>Size: {formattedFileSize}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiBookOpen className="mr-2 text-blue-600 flex-shrink-0" />
                      <span>Pages: {book.meta?.pages || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FiCalendar className="mr-2 text-blue-600 flex-shrink-0" />
                      <span>Published: {new Date(book.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Book Content */}
            {book.content?.rendered && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">About This Book</h2>
                <div 
                  className="prose max-w-none text-gray-700" 
                  dangerouslySetInnerHTML={{ __html: book.content.rendered }} 
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Right Sidebar - Recommended Books */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
              <FiBook className="mr-2 text-blue-600" />
              Recommended For You
            </h2>
            <div className="space-y-4">
              {recommendedBooks.map((recBook: any) => (
                <Link 
                  key={recBook.id} 
                  href={`/books/${recBook.slug}`}
                  className="block hover:bg-gray-50 p-2 rounded-md transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <BookCoverImage 
                        slug={recBook.slug}
                        alt={recBook.title.rendered}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {recBook.title.rendered}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {recBook._embedded?.author?.[0]?.name || 'Unknown Author'}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <FiEye className="mr-1" />
                        <span>{recBook.meta?.views?.toLocaleString() || '0'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Books Section */}
      <div className="mt-16 space-y-12">
        {/* Related Books - Same Category */}
        {relatedBooks.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">More in {categories[0]?.name || 'This Category'}</h2>
              {categories[0]?.slug && (
                <Link 
                  href={`/categories/${categories[0].slug}`}
                  className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                >
                  View All <FiArrowRight className="ml-1" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedBooks.map((book: any) => {
                const bookAuthor = book._embedded?.['wp:term']?.[1]?.[0]?.name || 
                                book._embedded?.author?.[0]?.name || 'Unknown Author';
                
                return (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title.rendered}
                    slug={book.slug}
                    coverImage={book._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                    author={bookAuthor}
                    views={book.meta?.views || 0}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Recommended Books - Always show this section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">You May Also Like</h2>
          {recommendedBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {recommendedBooks.map((book: any) => {
                const bookAuthor = book._embedded?.['wp:term']?.[1]?.[0]?.name || 
                                book._embedded?.author?.[0]?.name || 'Unknown Author';
                
                return (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title.rendered}
                    slug={book.slug}
                    coverImage={book._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                    author={bookAuthor}
                    views={book.meta?.views || 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recommendations available at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}