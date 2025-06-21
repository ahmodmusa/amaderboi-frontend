import Link from 'next/link';
import { FiBook, FiUser, FiArrowRight } from 'react-icons/fi';
import BookCard from '@/components/BookCard';
import CategoryCard from '@/components/CategoryCard';

export default async function Home() {
  // Fetch featured books with embedded featured media and author data
  const booksRes = await fetch('https://admin.amaderboi.net/wp-json/wp/v2/book?_embed=wp:featuredmedia,wp:term&per_page=4');
  const books = await booksRes.json();
  
  // Helper function to get author name from book data
  const getAuthorName = (book: any): string => {
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

  // Fetch categories and authors data
  const homeDataRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/home-data`, {
    next: { revalidate: 3600 } // Revalidate every hour
  });
  
  if (!homeDataRes.ok) {
    console.error('Failed to fetch home data');
  }
  
  const { categories = [], authors = [] } = await homeDataRes.json().catch(() => ({
    categories: [],
    authors: []
  }));
  
  // Get top 4 categories and authors for the homepage
  const featuredCategories = categories.slice(0, 4).map((cat: any) => ({
    ...cat,
    icon: <FiBook />
  }));
  
  const featuredAuthors = authors.slice(0, 4).map((author: any) => ({
    ...author,
    icon: <FiUser />,
    bookCount: author.count || 0
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">আমাদের বই পড়ার জগতে স্বাগতম</h1>
            <p className="text-xl mb-8 opacity-90">হাজারো বইয়ের বিশাল সংগ্রহ থেকে আপনার পছন্দের বইটি খুঁজে নিন</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/books" 
                className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors flex items-center justify-center gap-2"
              >
                বই ব্রাউজ করুন <FiArrowRight />
              </Link>
              <Link 
                href="/categories" 
                className="bg-transparent border-2 border-white hover:bg-white hover:bg-opacity-10 px-8 py-3 rounded-md font-semibold transition-colors"
              >
                ক্যাটাগরি দেখুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">জনপ্রিয় বইসমূহ</h2>
            <Link href="/books" className="text-blue-600 hover:underline flex items-center gap-1">
              সব দেখুন <FiArrowRight />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book: any) => (
              <BookCard
                key={book.id}
                id={book.id}
                title={book.title.rendered}
                slug={book.slug}
                coverImage={book._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-book.jpg'}
                author={getAuthorName(book)}
                views={book.meta?.views || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">বিষয়ভিত্তিক বই</h2>
            <Link href="/categories" className="text-blue-600 hover:underline flex items-center gap-1">
              সব ক্যাটাগরি <FiArrowRight />
            </Link>
          </div>
          
          {featuredCategories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredCategories.map((category: any) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  slug={category.slug}
                  count={category.count}
                  icon={category.icon}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              কোনো ক্যাটাগরি পাওয়া যায়নি
            </div>
          )}
        </div>
      </section>

      {/* Popular Authors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">জনপ্রিয় লেখক</h2>
            <Link href="/authors" className="text-blue-600 hover:underline flex items-center gap-1">
              সব লেখক <FiArrowRight />
            </Link>
          </div>
          
          {featuredAuthors.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredAuthors.map((author: any) => (
                <Link 
                  key={author.id} 
                  href={`/authors/${author.slug}`}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl mb-3">
                    {author.icon}
                  </div>
                  <h3 className="font-semibold text-lg">{author.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{author.bookCount} বই</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              কোনো লেখক পাওয়া যায়নি
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">আজই শুরু করুন আপনার পড়াশোনা</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">হাজারো বইয়ের বিশাল সংগ্রহ থেকে আপনার পছন্দের বইটি খুঁজে নিন এবং পড়া শুরু করুন</p>
          <Link 
            href="/books" 
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors inline-flex items-center gap-2"
          >
            বই ব্রাউজ করুন <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
