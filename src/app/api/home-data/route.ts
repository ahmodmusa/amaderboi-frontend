import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch categories
    const categoriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.amaderboi.net'}/wp-json/wp/v2/book_category?per_page=50`
    );
    
    // Fetch authors
    const authorsRes = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://admin.amaderboi.net'}/wp-json/wp/v2/book_author?per_page=50`
    );

    if (!categoriesRes.ok || !authorsRes.ok) {
      throw new Error('Failed to fetch home data');
    }

    const categories = await categoriesRes.json();
    const authors = await authorsRes.json();

    return NextResponse.json({
      categories: categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
      })),
      authors: authors.map((author: any) => ({
        id: author.id,
        name: author.name,
        slug: author.slug,
        count: author.count,
      })),
    });
  } catch (error) {
    console.error('Error in home-data API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch home data' },
      { status: 500 }
    );
  }
}
