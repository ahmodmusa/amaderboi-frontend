'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import Head from 'next/head';

interface BookCoverImageProps extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  slug: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export default function BookCoverImage({ 
  slug, 
  width = 300, 
  height = 450,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className = '',
  ...props 
}: BookCoverImageProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [src, setSrc] = useState(`https://cdn.amaderboi.net/covers/${slug}.webp`);
  const optimizedSrc = `https://cdn.amaderboi.net/covers/${slug}.webp?w=${width * 2}&q=75&auto=format`;
  const placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMWYxIi8+PC9zdmc+';
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleError = () => {
    setSrc('/placeholder-book.jpg');
  };
  
  return (
    <>
      {isMounted && priority && (
        <Head>
          <link 
            rel="preload" 
            as="image" 
            href={optimizedSrc} 
            imageSrcSet={`${optimizedSrc} 1x, ${optimizedSrc} 2x`}
          />
        </Head>
      )}
      <div className={`relative w-full`} style={{ aspectRatio: '2/3' }}>
        <Image
          {...props}
          src={src}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={75}
          sizes={sizes}
          placeholder="blur"
          blurDataURL={placeholder}
          onError={handleError}
          alt={props.alt || 'Book Cover'}
          className={`absolute inset-0 w-full h-full object-contain bg-white ${className}`}
        />
      </div>
    </>
  );
}
