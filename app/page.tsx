import { Suspense } from 'react';
import { PostList } from '@/components/features/blog/PostList';
import { PostListSkeleton } from '@/components/features/blog/PostListSkeleton';
import { TagSection } from '@/app/_components/TagSection.client';
import { TagSectionSkeleton } from '@/app/_components/TagSectionSkeleton';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import { getPublishedPosts, getTagsFromPosts } from '@/lib/notion';
import SortSelect from './_components/SortSelect';
import type { Post, PostSort } from '@/types/blog';

interface HomeProps {
  searchParams: Promise<{ tag?: string; sort?: string }>;
}

const normalizeSort = (sort?: string): PostSort => {
  return sort === 'oldest' ? 'oldest' : 'latest';
};

const filterPostsByTag = (posts: Post[], selectedTag: string) => {
  if (selectedTag === '전체') {
    return posts;
  }

  return posts.filter((post) => post.tags?.some((tag) => tag.name === selectedTag));
};

export default async function Home({ searchParams }: HomeProps) {
  const { tag, sort } = await searchParams;
  const selectedTag = tag || '전체';
  const selectedSort = normalizeSort(sort);

  const allPostsPromise = getPublishedPosts(undefined, selectedSort);
  const tagsPromise = allPostsPromise.then(getTagsFromPosts);
  const postsPromise = allPostsPromise.then((posts) => filterPostsByTag(posts, selectedTag));

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

          <Suspense fallback={<PostListSkeleton />}>
            <PostList postsPromise={postsPromise} />
          </Suspense>
        </div>

        <aside className="order-3 flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
