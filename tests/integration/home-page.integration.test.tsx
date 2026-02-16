import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Post } from '@/types/blog';

vi.mock('@/app/_components/SortSelect.client', () => ({
  default: () => <div data-testid="sort-select" />,
}));

vi.mock('@/lib/notion', () => ({
  getPublishedPosts: vi.fn(),
  getTagsFromPosts: vi.fn(),
}));

// Mock the queries hook to avoid real API calls
vi.mock('@/lib/queries/posts', () => ({
  useSuspenseInfinitePosts: vi.fn(),
}));

import Home from '@/app/page';
import { getPublishedPosts, getTagsFromPosts } from '@/lib/notion';
import { useSuspenseInfinitePosts } from '@/lib/queries/posts';

const mockedGetPublishedPosts = vi.mocked(getPublishedPosts);
const mockedGetTagsFromPosts = vi.mocked(getTagsFromPosts);
const mockedUseSuspenseInfinitePosts = vi.mocked(useSuspenseInfinitePosts);

const allPosts: Post[] = [
  {
    id: 'post-1',
    title: '첫 번째 포스트',
    slug: 'first-post',
    description: 'description 1',
    tags: [{ id: 'react', name: 'React', count: 1 }],
    author: '원동휘',
    date: '2025-01-01',
  },
  {
    id: 'post-2',
    title: '두 번째 포스트',
    slug: 'second-post',
    description: 'description 2',
    tags: [{ id: 'next', name: 'Next', count: 1 }],
    author: '원동휘',
    date: '2025-01-02',
  },
];

const tags = [
  { id: 'all', name: '전체', count: 2 },
  { id: 'Next', name: 'Next', count: 1 },
  { id: 'React', name: 'React', count: 1 },
];

const renderHome = async (params: { tag?: string; sort?: string } = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const view = await Home({ searchParams: Promise.resolve(params) });
  return await act(async () => {
    return render(<QueryClientProvider client={queryClient}>{view}</QueryClientProvider>);
  });
};

describe('홈 페이지 통합', () => {
  beforeEach(() => {
    mockedGetPublishedPosts.mockResolvedValue({
      posts: allPosts,
      has_more: false,
      next_cursor: null,
    });
    mockedGetTagsFromPosts.mockReturnValue(tags);

    // Mock the Suspense query hook
    mockedUseSuspenseInfinitePosts.mockReturnValue({
      data: {
        pages: [{ posts: allPosts, has_more: false, next_cursor: null }],
        pageParams: [undefined],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      flattenedPosts: allPosts,
    } as any);
  });

  it('기본 쿼리에서 블로그 목록과 링크를 렌더링한다', async () => {
    await renderHome();

    expect(mockedGetPublishedPosts).toHaveBeenCalledWith({});
    await waitFor(
      () => {
        expect(mockedGetTagsFromPosts).toHaveBeenCalledWith(allPosts);
      },
      { timeout: 3000 }
    );
    expect(screen.getByRole('heading', { name: '블로그 목록' })).toBeInTheDocument();
    await waitFor(
      () => {
        expect(document.querySelector('a[href="/blog/first-post"]')).toBeInTheDocument();
        expect(document.querySelector('a[href="/blog/second-post"]')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('선택한 태그로 게시글을 필터링하고 헤더를 유지한다', async () => {
    // Mock filtered posts
    const filteredPosts = allPosts.filter((post) =>
      post.tags?.some((tag) => tag.name === 'React')
    );
    mockedUseSuspenseInfinitePosts.mockReturnValue({
      data: {
        pages: [{ posts: filteredPosts, has_more: false, next_cursor: null }],
        pageParams: [undefined],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      flattenedPosts: filteredPosts,
    } as any);

    await renderHome({ tag: 'React', sort: 'oldest' });

    expect(mockedGetPublishedPosts).toHaveBeenCalledWith({});
    expect(screen.getByRole('heading', { name: 'React 관련 글' })).toBeInTheDocument();
    await waitFor(
      () => {
        expect(document.querySelector('a[href="/blog/first-post"]')).toBeInTheDocument();
        expect(document.querySelector('a[href="/blog/second-post"]')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('선택 태그에 맞는 게시글이 없으면 빈 상태를 렌더링한다', async () => {
    // Mock empty posts
    mockedUseSuspenseInfinitePosts.mockReturnValue({
      data: {
        pages: [{ posts: [], has_more: false, next_cursor: null }],
        pageParams: [undefined],
      },
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      flattenedPosts: [],
    } as any);

    await renderHome({ tag: 'TypeScript', sort: 'latest' });

    await waitFor(
      () => {
        expect(screen.getByText('조건에 맞는 게시글이 없습니다.')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
