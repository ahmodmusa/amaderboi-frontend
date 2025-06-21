import { NextResponse } from 'next/server';

// Enable server-side debugging
const DEBUG = true;

interface Category {
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
    console.log('[categories/route.ts]', ...args);
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  
  try {
    const wpApiUrl = 'https://admin.amaderboi.net';
    log('Using WordPress API URL:', wpApiUrl);

    // Fetch from book_category taxonomy instead of default categories
    const endpoint = `${wpApiUrl}/wp-json/wp/v2/book_category?per_page=100&_fields=id,name,slug,description,count,link`;
    log('Fetching categories from:', endpoint);
    
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
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const categoriesData = await response.json() as Category[];
    log(`Found ${categoriesData.length} categories`);
    
    // Format the categories data for the frontend
    const categories = categoriesData.map(category => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      count: category.count,
      link: category.link
    }));

    log(`Processed ${categories.length} categories in ${Date.now() - startTime}ms`);
    
    return NextResponse.json({ 
      success: true,
      count: categories.length,
      categories
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    log('Error in categories API route:', error);
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
