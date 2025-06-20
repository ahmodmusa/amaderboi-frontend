import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiEye, FiBookOpen, FiClock, FiCalendar, FiTag, FiFile } from 'react-icons/fi';
import { getBookBySlug, getRelatedBooks } from '@/lib/api';
import BookCard from '@/components/BookCard';
import BookCoverImage from '@/components/BookCoverImage';

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];;
};

interface BookPageProps {
  params: {
    slug: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const book = await getBookBySlug(params.slug);
  
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
  const author = book._embedded?.author?.[0];
  
  // Get related books from the first category
  const categoryIds = categories.map((cat: any) => cat.id);
  let relatedBooks: any[] = [];
  
  try {
    relatedBooks = await getRelatedBooks(categoryIds, book.id);
  } catch (error) {
    console.error('Error loading related books:', error);
    relatedBooks = [];
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <FiArrowLeft className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 p-6">
              <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
                <BookCoverImage
                  slug={params.slug}
                  alt={book.title.rendered}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <div className="mt-6 space-y-4">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FiDownload /> ডাউনলোড করুন ({formatFileSize(book.meta?.file_size || 0)})
                </a>
                
                <div className="flex items-center text-gray-600">
                  <FiEye className="mr-2" />
                  <span>{book.meta?.views?.toLocaleString() || 0} বার দেখা হয়েছে</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <FiFile className="mr-2" />
                  <span>ফাইল সাইজ: {formatFileSize(book.meta?.file_size || 0)}</span>
                </div>
                
                {book.meta?.downloads && (
                  <div className="flex items-center text-gray-600">
                    <FiDownload className="mr-2" />
                    <span>{book.meta.downloads.toLocaleString()} বার ডাউনলোড</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Book Details */}
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-4">{book.title.rendered}</h1>
              
              {author && (
                <div className="mb-6">
                  <Link 
                    href={`/authors/${author.slug}`}
                    className="text-blue-600 hover:underline text-lg"
                  >
                    {author.name}
                  </Link>
                </div>
              )}
              
              <div className="prose max-w-none mb-8" 
                dangerouslySetInnerHTML={{ __html: book.content.rendered }} 
              />
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">বইয়ের বিবরণ</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-700">
                    <FiBookOpen className="mr-2 text-blue-600" />
                    <span>পৃষ্ঠা: {book.meta?.pages || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiFile className="mr-2 text-blue-600" />
                    <span>ফাইল সাইজ: {formatFileSize(book.meta?.file_size || 0)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiClock className="mr-2 text-blue-600" />
                    <span>পঠন সময়: {book.meta?.reading_time || 'N/A'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FiCalendar className="mr-2 text-blue-600" />
                    <span>প্রকাশকাল: {new Date(book.date).toLocaleDateString('bn-BD')}</span>
                  </div>
                  
                  {categories.length > 0 && (
                    <div className="flex items-start text-gray-700">
                      <FiTag className="mr-2 mt-1 text-blue-600 flex-shrink-0" />
                      <div>
                        <span className="block">ক্যাটাগরি: </span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {categories.map((category: any) => (
                            <Link 
                              key={category.id} 
                              href={`/categories/${category.slug}`}
                              className="text-blue-600 hover:underline text-sm bg-blue-50 px-2 py-1 rounded"
                            >
                              {category.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Books - Only show if we have related books */}
        {relatedBooks && relatedBooks.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">সম্পর্কিত বইসমূহ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedBooks.map((book: any) => (
                <BookCard
                  key={book.id}
                  id={book.id}
                  title={book.title.rendered}
                  slug={book.slug}
                  coverImage={book._embedded?.['wp:featuredmedia']?.[0]?.source_url}
                  author={book._embedded?.author?.[0]?.name || 'অজানা লেখক'}
                  views={book.meta?.views || 0}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}