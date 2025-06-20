'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface BookCoverImageProps extends Omit<ImageProps, 'src'> {
  slug: string;
}

export default function BookCoverImage({ slug, ...props }: BookCoverImageProps) {
  const [src, setSrc] = useState(`https://cdn.amaderboi.net/covers/${slug}.webp`);
  
  return (
    <Image
      {...props}
      src={src}
      onError={() => setSrc('/placeholder-book.jpg')}
      alt={props.alt || 'Book Cover'}
    />
  );
}
