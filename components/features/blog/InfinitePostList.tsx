'use client';

import { useSuspenseInfinitePosts } from '@/lib/queries/posts';
import { PostCard } from './PostCard';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface InfinitePostListProps {
  tag?: string;
  sort?: string;
  pageSize?: number;
}

export function InfinitePostList({ tag, sort, pageSize = 4 }: InfinitePostListProps) {
  // Suspense query - automatically handles loading/error states!
  const { fetchNextPage, hasNextPage, isFetchingNextPage, flattenedPosts } =
    useSuspenseInfinitePosts({ tag, sort, pageSize });

  // Intersection Observer for automatic infinite scroll
  const { ref, inView } = useInView({
    threshold: 0.1, // Trigger when 10% visible
    triggerOnce: false, // Re-trigger on every intersection
  });

  // Auto-fetch next page when observer element is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Empty state (no posts found)
  if (flattenedPosts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-sm text-muted-foreground">조건에 맞는 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Post List - Same layout as before */}
      <ul className="grid gap-4">
        {flattenedPosts.map((post, index) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`} className="block">
              <PostCard post={post} isFirst={index === 0} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Infinite Scroll Trigger + Loading Indicator */}
      {hasNextPage && (
        <div
          ref={ref}
          className="flex justify-center py-8"
          aria-live="polite"
          aria-busy={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">더 불러오는 중...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
