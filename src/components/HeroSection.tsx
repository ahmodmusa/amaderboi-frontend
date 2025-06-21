'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

interface HeroSectionProps {
  title: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  description?: string;
}

export default function HeroSection({ 
  title, 
  breadcrumbs = [],
  description = '' 
}: HeroSectionProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16 lg:py-20">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-400 mix-blend-multiply filter blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-indigo-400 mix-blend-multiply filter blur-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <motion.nav 
              className="mb-4 flex items-center text-sm" 
              aria-label="Breadcrumb"
              variants={itemVariants}
            >
              <ol className="flex flex-wrap items-center space-x-2">
                <li className="flex items-center">
                  <Link 
                    href="/" 
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                    aria-label="Home"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                    {index === breadcrumbs.length - 1 ? (
                      <span 
                        className="font-medium text-blue-600"
                        aria-current="page"
                      >
                        {crumb.label}
                      </span>
                    ) : (
                      <Link 
                        href={crumb.href} 
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
                      >
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}
          
          {/* Page Title */}
          <motion.h1 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>
          
          {description && (
            <motion.p 
              className="mt-4 max-w-2xl text-lg text-gray-600"
              variants={itemVariants}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
      
      {/* Bottom wave divider */}
      <div className="absolute -bottom-px left-0 right-0 h-6 bg-white overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity="0.25" 
            className="fill-current text-white"
          />
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            opacity="0.5" 
            className="fill-current text-white"
          />
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-current text-white"
          />
        </svg>
      </div>
    </section>
  );
}
