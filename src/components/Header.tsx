'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiSearch, FiMenu, FiX, FiBook, FiGrid, FiUsers, FiBookOpen, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  interface NavLink {
    name: string;
    href: string;
    icon?: React.ReactNode;
    submenu?: NavLink[];
  }

  const navLinks: NavLink[] = [
    { 
      name: 'সকল বই', 
      href: '/books',
      icon: <FiBook className="mr-1" />,
      submenu: [
        { name: 'নতুন বই', href: '/books/new' },
        { name: 'বেস্টসেলার', href: '/books/bestseller' },
        { name: 'প্রি-অর্ডার', href: '/books/pre-order' },
      ]
    },
    { 
      name: 'লেখকবৃন্দ', 
      href: '/authors',
      icon: <FiUsers className="mr-1" />
    },
    { 
      name: 'ক্যাটাগরি', 
      href: '/categories',
      icon: <FiGrid className="mr-1" />,
      submenu: [
        { name: 'উপন্যাস', href: '/categories/novel' },
        { name: 'কমিক্স', href: '/categories/comics' },
        { name: 'শিশু-কিশোর', href: '/categories/children' },
      ]
    },
    { 
      name: 'প্রকাশনী', 
      href: '/publishers',
      icon: <FiBookOpen className="mr-1" />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            AmaderBoi
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                  {link.submenu && (
                    <FiChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Link>
                
                {/* Dropdown Menu */}
                {link.submenu && (
                  <div className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Button */}
          <div className="flex items-center">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 ml-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="বই, লেখক বা প্রকাশনী খুঁজুন..."
                className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      pathname === link.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.submenu && (
                    <div className="pl-4 mt-1 space-y-1">
                      {link.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;