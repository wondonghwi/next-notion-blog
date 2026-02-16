import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import type { GetPublishedPostsResponse } from '@/lib/notion';

// ============================================================================
// Types
// ============================================================================

interface UseInfinitePostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
}

// ============================================================================
// API Functions
// ============================================================================

/**
 * Fetch posts from API endpoint with pagination support
 */
export const fetchPosts = async ({
  tag,
  sort,
  pageSize,
  startCursor,
}: {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}): Promise<GetPublishedPostsResponse> => {
  const params = new URLSearchParams();

  if (tag && tag !== '전체') params.append('tag', tag);
  if (sort) params.append('sort', sort);
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (startCursor) params.append('startCursor', startCursor);

  const response = await fetch(`/api/posts?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

// ============================================================================
// Query Keys (Factory Pattern)
// ============================================================================

export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters: UseInfinitePostsParams) =>
    [...postsQueryKeys.lists(), filters] as const,
};

// ============================================================================
// Query Hooks
// ============================================================================

/**
 * Legacy hook for backward compatibility
 * Uses manual loading/error states
 */
export function useInfinitePosts({ tag, sort, pageSize = 6 }: UseInfinitePostsParams = {}) {
  return useInfiniteQuery({
    queryKey: postsQueryKeys.list({ tag, sort, pageSize }),
    queryFn: ({ pageParam }) =>
      fetchPosts({
        tag,
        sort,
        pageSize,
        startCursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  });
}

/**
 * Modern Suspense hook for infinite scroll
 * Auto-suspends on loading, auto-throws on error
 */
export function useSuspenseInfinitePosts({
  tag,
  sort,
  pageSize = 4,
}: UseInfinitePostsParams = {}) {
  const query = useSuspenseInfiniteQuery({
    queryKey: postsQueryKeys.list({ tag, sort, pageSize }),
    queryFn: ({ pageParam }) =>
      fetchPosts({
        tag,
        sort,
        pageSize,
        startCursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
  });

  return {
    ...query,
    // Convenience field for flattened posts
    flattenedPosts: query.data.pages.flatMap((page) => page.posts),
  };
}
