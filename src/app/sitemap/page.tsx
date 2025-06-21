import Link from 'next/link';

export default function SitemapPage() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Sitemap</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Browse our website easily using the links below to find what you're looking for.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main Pages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Main Pages
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/books" className="text-blue-600 dark:text-blue-400 hover:underline">
                All Books
              </Link>
            </li>
            <li>
              <Link href="/authors" className="text-blue-600 dark:text-blue-400 hover:underline">
                Authors
              </Link>
            </li>
            <li>
              <Link href="/categories" className="text-blue-600 dark:text-blue-400 hover:underline">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/new-releases" className="text-blue-600 dark:text-blue-400 hover:underline">
                New Releases
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Pages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Legal
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/dmca" className="text-blue-600 dark:text-blue-400 hover:underline">
                DMCA
              </Link>
            </li>
            <li>
              <Link href="/sitemap" className="text-blue-600 dark:text-blue-400 hover:underline">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Help & Support */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            Help & Support
          </h2>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/help" className="text-blue-600 dark:text-blue-400 hover:underline">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="text-blue-600 dark:text-blue-400 hover:underline">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-blue-600 dark:text-blue-400 hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Books by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'Fiction', 'Non-Fiction', 'Biography', 'Science', 'Technology',
            'History', 'Romance', 'Mystery', 'Thriller', 'Fantasy',
            'Science Fiction', 'Horror', 'Poetry', 'Drama', 'Comedy',
            'Business', 'Self-Help', 'Travel', 'Cooking', 'Art', 'Photography'
          ].map((category) => (
            <Link 
              key={category}
              href={`/categories/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
