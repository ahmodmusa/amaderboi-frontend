'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface BookCoverImageProps extends Omit<ImageProps, 'src' | 'width' | 'height'> {
  slug: string;
  width?: number;
  height?: number;
}

export default function BookCoverImage({ 
  slug, 
  width = 300, 
  height = 450,
  ...props 
}: BookCoverImageProps) {
  const [src, setSrc] = useState(`https://cdn.amaderboi.net/covers/${slug}.webp`);
  
  return (
    <div className="relative" style={{ width: '100%', paddingBottom: '150%' }}>
      <Image
        {...props}
        src={src}
        width={width}
        height={height}
        onError={() => setSrc('/placeholder-book.jpg')}
        alt={props.alt || 'Book Cover'}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
