import { NextResponse } from 'next/server';

// Enable server-side debugging
const DEBUG = true;

interface Author {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  link: string;
  taxonomy: string;
  meta: any[];
  _links: any;
}

function log(...args: unknown[]) {
  if (DEBUG) {
    console.log('[authors/route.ts]', ...args);
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  
  try {
    // Get the base URL from the request
    const baseUrl = new URL(request.url).origin;
    const wpApiUrl = 'https://admin.amaderboi.net';
    
    log('Using WordPress API URL:', wpApiUrl);

    const endpoint = `${wpApiUrl}/wp-json/wp/v2/book_author?per_page=100`;
    log('Fetching authors from:', endpoint);
    
    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
      headers: { 'Accept': 'application/json' },
    });

    if (!response.ok) {
      const errorText = await response.text();
      log('Error response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`Failed to fetch authors: ${response.status} ${response.statusText}`);
    }

    const authorsData = await response.json() as Author[];
    log(`Found ${authorsData.length} authors`);
    
    // Format the authors data for the frontend
    const authors = authorsData.map(author => ({
      id: author.id,
      name: author.name,
      slug: author.slug,
      description: author.description,
      count: author.count,
      link: author.link
    }));

    log(`Processed ${authors.length} authors in ${Date.now() - startTime}ms`);
    
    return NextResponse.json({ 
      success: true,
      count: authors.length,
      authors
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('Error in authors API route:', error);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
