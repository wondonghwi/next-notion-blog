import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import type { GetPublishedPostsResponse } from '@/lib/notion';

export interface UseInfinitePostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
}

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

export const postsQueryKeys = {
  all: ['posts'] as const,
  lists: () => [...postsQueryKeys.all, 'list'] as const,
  list: (filters: UseInfinitePostsParams) =>
    [...postsQueryKeys.lists(), filters] as const,
};

export function getInfinitePostsQueryOptions({
  tag,
  sort,
  pageSize = 4,
}: UseInfinitePostsParams = {}) {
  return {
    queryKey: postsQueryKeys.list({ tag, sort, pageSize }),
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      fetchPosts({
        tag,
        sort,
        pageSize,
        startCursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: GetPublishedPostsResponse) => lastPage.next_cursor ?? undefined,
  };
}

export function useInfinitePosts({ tag, sort, pageSize = 6 }: UseInfinitePostsParams = {}) {
  return useInfiniteQuery(getInfinitePostsQueryOptions({ tag, sort, pageSize }));
}

export function useSuspenseInfinitePosts({
  tag,
  sort,
  pageSize = 4,
}: UseInfinitePostsParams = {}) {
  const query = useSuspenseInfiniteQuery(getInfinitePostsQueryOptions({ tag, sort, pageSize }));

  return {
    ...query,
    flattenedPosts: query.data.pages.flatMap((page) => page.posts),
  };
}
