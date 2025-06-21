import { NextResponse } from 'next/server';

// Enable server-side debugging
const DEBUG = true;

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[categories/[slug]/route.ts]', ...args);
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
    
    log(`Fetching category with slug: ${slug}`);
    
    // First, get the category by slug to get the ID
    const categoryEndpoint = `${wpApiUrl}/wp-json/wp/v2/book_category?slug=${encodeURIComponent(slug)}`;
    log('Fetching category from:', categoryEndpoint);
    
    const categoryRes = await fetch(categoryEndpoint);
    
    if (!categoryRes.ok) {
      const errorText = await categoryRes.text();
      log('Error fetching category:', {
        status: categoryRes.status,
        statusText: categoryRes.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch category: ${categoryRes.status} ${categoryRes.statusText}`);
    }
    
    const [category] = await categoryRes.json();
    
    if (!category) {
      log(`Category not found with slug: ${slug}`);
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }
    
    log(`Found category: ${category.name} (ID: ${category.id})`);
    
    // Then get books in this category
    const booksEndpoint = `${wpApiUrl}/wp-json/wp/v2/book?book_category=${category.id}&_embed=wp:featuredmedia,wp:term,author&per_page=100`;
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
    log(`Found ${books.length} books in category ${category.name}`);
    
    // Format the response
    const response = {
      success: true,
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        count: category.count,
        link: category.link
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
    
    log(`Processed category page in ${Date.now() - startTime}ms`);
    return NextResponse.json(response);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('Error in category API route:', error);
    
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
