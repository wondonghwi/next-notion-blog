import type { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/notion';
import { siteConfig } from '@/lib/metadata';

const SITEMAP_PAGE_SIZE = 100;

const toAbsoluteUrl = (path: string) => new URL(path, siteConfig.siteUrl).toString();

async function getAllPublishedPosts() {
  const posts = [];
  let nextCursor: string | null | undefined = undefined;

  do {
    const response = await getPublishedPosts({
      pageSize: SITEMAP_PAGE_SIZE,
      startCursor: nextCursor ?? undefined,
    });

    posts.push(...response.posts);
    nextCursor = response.next_cursor;
  } while (nextCursor);

  return posts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPublishedPosts();

  return [
    {
      url: toAbsoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...posts.map((post) => ({
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      lastModified: post.modifiedDate ? new Date(post.modifiedDate) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
