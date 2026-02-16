import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/notion';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const tag = searchParams.get('tag') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;
  const pageSize = searchParams.get('pageSize')
    ? parseInt(searchParams.get('pageSize')!)
    : undefined;
  const startCursor = searchParams.get('startCursor') ?? undefined;

  try {
    const data = await getPublishedPosts({
      tag,
      sort,
      pageSize,
      startCursor,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
