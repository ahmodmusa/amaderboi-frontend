import { NextResponse } from 'next/server';
import { getBookBySlug } from '@/lib/api';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const book = await getBookBySlug(params.slug);
    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}
