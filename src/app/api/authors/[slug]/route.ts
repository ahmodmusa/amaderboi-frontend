import { NextResponse } from 'next/server';

// Enable server-side debugging
const DEBUG = true;

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[authors/[slug]/route.ts]', ...args);
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const startTime = Date.now();
  
  try {
    const { slug } = params;
    const wpApiUrl = 'https://admin.amaderboi.net';
    
    log(`Fetching author with slug: ${slug}`);
    
    // First, get the author by slug
    const authorEndpoint = `${wpApiUrl}/wp-json/wp/v2/book_author?slug=${encodeURIComponent(slug)}`;
    log('Fetching author from:', authorEndpoint);
    
    const authorRes = await fetch(authorEndpoint);
    
    if (!authorRes.ok) {
      const errorText = await authorRes.text();
      log('Error fetching author:', {
        status: authorRes.status,
        statusText: authorRes.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch author: ${authorRes.status} ${authorRes.statusText}`);
    }
    
    const authorData = await authorRes.json();
    log('Author API response:', JSON.stringify(authorData, null, 2));
    
    if (!Array.isArray(authorData) || authorData.length === 0) {
      log('No author found with slug:', slug);
      return NextResponse.json(
        { success: false, error: 'Author not found' },
        { status: 404 }
      );
    }
    
    const author = authorData[0];
    log(`Found author: ${author.name} (ID: ${author.id})`);
    
    // Then get books by this author
    const booksEndpoint = `${wpApiUrl}/wp-json/wp/v2/book?book_author=${author.id}&_embed=wp:featuredmedia,wp:term,author&per_page=100`;
    log('Fetching books from:', booksEndpoint);
    
    const booksRes = await fetch(booksEndpoint);
    
    if (!booksRes.ok) {
      const errorText = await booksRes.text();
      log('Error fetching books:', {
        status: booksRes.status,
        statusText: booksRes.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch books: ${booksRes.status} ${booksRes.statusText}`);
    }
    
    const books = await booksRes.json();
    log(`Found ${books.length} books by author ${author.name}`);
    
    // Format the response
    const response = {
      success: true,
      author: {
        id: author.id,
        name: author.name,
        slug: author.slug,
        description: author.description,
        count: author.count,
        link: author.link
      },
      books: books.map((book: any) => ({
        id: book.id,
        title: book.title?.rendered || 'Untitled',
        slug: book.slug,
        excerpt: book.excerpt?.rendered || '',
        coverImage: book._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        author: book._embedded?.['author']?.[0]?.name || 
               book._embedded?.['wp:term']?.flat().find((t: any) => t.taxonomy === 'book_author')?.name || 
               'Unknown Author',
        views: book.meta?.views || 0,
        downloadLink: book.meta?.download_link || '#'
      }))
    };
    
    log(`Processed author page in ${Date.now() - startTime}ms`);
    return NextResponse.json(response);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('Error in author API route:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
