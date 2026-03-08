import type { GetPublishedPostsResponse } from '@/lib/notion';
import { getPublishedPosts } from '@/lib/notion';
import { postsQueryKeys, type UseInfinitePostsParams } from '@/lib/queries/posts';

export function getServerInfinitePostsQueryOptions({
  tag,
  sort,
  pageSize = 10,
}: UseInfinitePostsParams = {}) {
  return {
    queryKey: postsQueryKeys.list({ tag, sort, pageSize }),
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getPublishedPosts({
        tag,
        sort,
        pageSize,
        startCursor: pageParam,
      }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage: GetPublishedPostsResponse) => lastPage.next_cursor ?? undefined,
  };
}
