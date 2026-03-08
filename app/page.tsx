import { Suspense } from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { InfinitePostList } from '@/components/features/blog/InfinitePostList';
import { PostListSkeleton } from '@/components/features/blog/PostListSkeleton';
import { QueryErrorBoundary } from '@/components/common/QueryErrorBoundary';
import { TagSection } from '@/app/_components/TagSection';
import { TagSectionSkeleton } from '@/app/_components/TagSectionSkeleton';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getPublishedPosts, getTagsFromPosts } from '@/lib/notion';
import { getServerInfinitePostsQueryOptions } from '@/lib/queries/posts.server';
import { getQueryClient } from '@/lib/react-query/queryClient';
import SortSelect from './_components/SortSelect.client';
import type { PostSort } from '@/types/blog';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

const normalizeSort = (sort?: string): PostSort => {
  return sort === 'oldest' ? 'oldest' : 'latest';
};

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = normalizeSort(sort);
  const queryClient = getQueryClient();

  // 태그 목록을 위한 전체 포스트 가져오기
  const allPostsPromise = getPublishedPosts({});
  const tagsPromise = allPostsPromise.then(({ posts }) => getTagsFromPosts(posts));
  await queryClient.prefetchInfiniteQuery(
    getServerInfinitePostsQueryOptions({
      tag: selectedTag,
      sort: selectedSort,
      pageSize: 10,
    })
  );

  return (
    <div className="container py-8 md:py-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_minmax(0,1fr)_220px] lg:grid-cols-[200px_minmax(0,1fr)_240px] lg:gap-8">
        <aside className="order-2 md:order-1 md:sticky md:top-[var(--sticky-top)] md:self-start">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection
              tagsPromise={tagsPromise}
              selectedTag={selectedTag}
              selectedSort={selectedSort}
            />
          </Suspense>
        </aside>

        <div className="order-3 space-y-6 md:order-2 md:space-y-8">
          <div className="relative overflow-hidden rounded-[28px] border border-border/70 bg-card/80 px-5 py-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl md:px-6">
            <div className="from-primary/16 via-primary/6 absolute inset-x-0 top-0 h-28 bg-gradient-to-br to-transparent" />
            <div className="relative flex flex-col gap-5">
              <div className="space-y-3">
                <p className="text-muted-foreground text-[0.7rem] font-semibold tracking-[0.24em] uppercase">
                  Notion-driven archive
                </p>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {selectedTag === '전체' ? '전체 글' : `${selectedTag} 관련 글`}
                  </h2>
                  <p className="text-muted-foreground max-w-2xl text-sm leading-6">
                    노션을 기반으로 정리한 개발 기록과 프론트엔드 실험을 태그별로 모아
                    두었습니다.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground text-sm">
                  현재 필터: <span className="text-foreground font-medium">{selectedTag}</span>
                </p>
                <SortSelect />
              </div>
            </div>
          </div>

          <QueryErrorBoundary
            fallbackTitle="게시글을 불러올 수 없습니다"
            fallbackMessage="게시글을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          >
            <HydrationBoundary state={dehydrate(queryClient)}>
              <Suspense fallback={<PostListSkeleton />}>
                <InfinitePostList tag={selectedTag} sort={selectedSort} pageSize={10} />
              </Suspense>
            </HydrationBoundary>
          </QueryErrorBoundary>
        </div>

        <aside className="order-1 flex flex-col gap-6 md:order-3 md:sticky md:top-[var(--sticky-top)] md:self-start">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
