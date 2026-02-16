import { Suspense } from 'react';
import { InfinitePostList } from '@/components/features/blog/InfinitePostList';
import { PostListSkeleton } from '@/components/features/blog/PostListSkeleton';
import { QueryErrorBoundary } from '@/components/common/QueryErrorBoundary';
import { TagSection } from '@/app/_components/TagSection';
import { TagSectionSkeleton } from '@/app/_components/TagSectionSkeleton';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getPublishedPosts, getTagsFromPosts } from '@/lib/notion';
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

  // 태그 목록을 위한 전체 포스트 가져오기
  const allPostsPromise = getPublishedPosts({});
  const tagsPromise = allPostsPromise.then(({ posts }) => getTagsFromPosts(posts));

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)_220px]">
        <aside className="order-2 lg:order-1">
          <Suspense fallback={<TagSectionSkeleton />}>
            <TagSection
              tagsPromise={tagsPromise}
              selectedTag={selectedTag}
              selectedSort={selectedSort}
            />
          </Suspense>
        </aside>

        <div className="order-1 space-y-8 lg:order-2">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">
              {selectedTag === '전체' ? '블로그 목록' : `${selectedTag} 관련 글`}
            </h2>

            <SortSelect />
          </div>

          <QueryErrorBoundary
            fallbackTitle="게시글을 불러올 수 없습니다"
            fallbackMessage="게시글을 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          >
            <Suspense fallback={<PostListSkeleton />}>
              <InfinitePostList tag={selectedTag} sort={selectedSort} pageSize={4} />
            </Suspense>
          </QueryErrorBoundary>
        </div>

        <aside className="order-3 flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
