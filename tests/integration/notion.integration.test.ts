// @vitest-environment node

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/tests/msw/server';
import type { Post } from '@/types/blog';

const notionQueryUrl = 'https://api.notion.com/v1/databases/:databaseId/query';

interface MockPageOptions {
  id: string;
  title: string;
  slug: string;
  tagNames?: string[];
}

const createMockPage = ({ id, title, slug, tagNames = ['React'] }: MockPageOptions) => {
  return {
    id,
    last_edited_time: '2025-01-02T00:00:00.000Z',
    cover: {
      type: 'external',
      external: {
        url: 'https://picsum.photos/800/400',
      },
    },
    properties: {
      Title: {
        type: 'title',
        title: [{ plain_text: title }],
      },
      Description: {
        type: 'rich_text',
        rich_text: [{ plain_text: `${title} description` }],
      },
      Tags: {
        type: 'multi_select',
        multi_select: tagNames.map((tag) => ({ id: `${id}-${tag}`, name: tag })),
      },
      Author: {
        type: 'people',
        people: [{ name: '원동휘' }],
      },
      Date: {
        type: 'date',
        date: {
          start: '2025-01-01',
        },
      },
      Slug: {
        type: 'rich_text',
        rich_text: [{ plain_text: slug }],
      },
      Status: {
        type: 'select',
        select: {
          name: 'Published',
        },
      },
    },
  };
};

describe('Notion 데이터 통합', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('최신순 요청 시 정렬 방향과 게시글 메타데이터를 매핑한다', async () => {
    let sortDirection = '';

    server.use(
      http.post(notionQueryUrl, async ({ request }) => {
        const body = (await request.json()) as {
          sorts?: Array<{ direction?: string }>;
        };

        sortDirection = body.sorts?.[0]?.direction ?? '';

        return HttpResponse.json({
          object: 'list',
          results: [createMockPage({ id: 'page-1', title: '첫 글', slug: 'first-post' })],
          has_more: false,
          next_cursor: null,
          type: 'page_or_database',
          page_or_database: {},
        });
      })
    );

    const { getPublishedPosts } = await import('@/lib/notion');
    const posts = await getPublishedPosts(undefined, 'latest');

    expect(sortDirection).toBe('descending');
    expect(posts).toHaveLength(1);
    expect(posts[0]).toMatchObject({
      title: '첫 글',
      slug: 'first-post',
      author: '원동휘',
      description: '첫 글 description',
    });
  });

  it('오래된순 요청 시 오름차순 정렬을 요청한다', async () => {
    let sortDirection = '';

    server.use(
      http.post(notionQueryUrl, async ({ request }) => {
        const body = (await request.json()) as {
          sorts?: Array<{ direction?: string }>;
        };

        sortDirection = body.sorts?.[0]?.direction ?? '';

        return HttpResponse.json({
          object: 'list',
          results: [],
          has_more: false,
          next_cursor: null,
          type: 'page_or_database',
          page_or_database: {},
        });
      })
    );

    const { getPublishedPosts } = await import('@/lib/notion');
    await getPublishedPosts(undefined, 'oldest');

    expect(sortDirection).toBe('ascending');
  });

  it('게시글 목록으로 전체 카운트와 정렬된 태그 목록을 만든다', async () => {
    const posts: Post[] = [
      {
        id: '1',
        slug: 'one',
        title: 'one',
        tags: [
          { id: 'r1', name: 'React', count: 1 },
          { id: 'n1', name: 'Next', count: 1 },
        ],
      },
      {
        id: '2',
        slug: 'two',
        title: 'two',
        tags: [{ id: 'r2', name: 'React', count: 1 }],
      },
    ];

    const { getTagsFromPosts } = await import('@/lib/notion');
    const tags = getTagsFromPosts(posts);

    expect(tags).toEqual([
      { id: 'all', name: '전체', count: 2 },
      { id: 'Next', name: 'Next', count: 1 },
      { id: 'React', name: 'React', count: 2 },
    ]);
  });

  it('슬러그에 해당하는 게시글이 없으면 null을 반환한다', async () => {
    let requestedSlug = '';

    server.use(
      http.post(notionQueryUrl, async ({ request }) => {
        const body = (await request.json()) as {
          filter?: {
            and?: Array<{ rich_text?: { equals?: string } }>;
          };
        };

        requestedSlug = body.filter?.and?.[0]?.rich_text?.equals ?? '';

        return HttpResponse.json({
          object: 'list',
          results: [],
          has_more: false,
          next_cursor: null,
          type: 'page_or_database',
          page_or_database: {},
        });
      })
    );

    const { getPostBySlug } = await import('@/lib/notion');
    const post = await getPostBySlug('missing-post');

    expect(requestedSlug).toBe('missing-post');
    expect(post).toBeNull();
  });
});
