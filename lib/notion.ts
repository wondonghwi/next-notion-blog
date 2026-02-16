import { Client } from '@notionhq/client';
import type { Post, PostSort, TagFilterItem } from '@/types/blog';
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({
  notionClient: notion,
});

const getDatabaseId = () => {
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!databaseId) {
    throw new Error('NOTION_DATABASE_ID is not configured.');
  }

  return databaseId;
};

const isPageObjectResponse = (
  page: QueryDatabaseResponse['results'][number]
): page is PageObjectResponse => {
  return 'properties' in page;
};

const getNormalizedSort = (sort?: string): PostSort => {
  return sort === 'oldest' ? 'oldest' : 'latest';
};

const getCoverImage = (cover: PageObjectResponse['cover']) => {
  if (!cover) return '';

  switch (cover.type) {
    case 'external':
      return cover.external.url;
    case 'file':
      return cover.file.url;
    default:
      return '';
  }
};

const getPostMetaData = (page: PageObjectResponse): Post => {
  const { properties } = page;

  const tags: TagFilterItem[] =
    properties.Tags.type === 'multi_select'
      ? properties.Tags.multi_select.map((tag) => ({
          id: tag.id,
          name: tag.name,
          count: 1,
        }))
      : [];

  let author = '';
  if (properties.Author.type === 'people' && properties.Author.people.length > 0) {
    const person = properties.Author.people[0];
    if ('name' in person && typeof person.name === 'string') {
      author = person.name;
    }
  }

  return {
    id: page.id,
    title: properties.Title.type === 'title' ? (properties.Title.title[0]?.plain_text ?? '') : '',
    description:
      properties.Description.type === 'rich_text'
        ? (properties.Description.rich_text[0]?.plain_text ?? '')
        : '',
    coverImage: getCoverImage(page.cover),
    tags,
    author,
    date: properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '',
    modifiedDate: page.last_edited_time,
    slug:
      properties.Slug.type === 'rich_text'
        ? (properties.Slug.rich_text[0]?.plain_text ?? page.id)
        : page.id,
  };
};

export const getPostBySlug = async (slug: string) => {
  const response = await notion.databases.query({
    database_id: getDatabaseId(),
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
      ],
    },
  });

  const page = response.results.find(isPageObjectResponse);
  if (!page) {
    return null;
  }

  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    markdown: parent,
    post: getPostMetaData(page),
  };
};

export interface GetPublishedPostsParams {
  tag?: string;
  sort?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPublishedPostsResponse {
  posts: Post[];
  has_more: boolean;
  next_cursor: string | null;
}

export const getPublishedPosts = async ({
  tag,
  sort,
  pageSize = 4,
  startCursor,
}: GetPublishedPostsParams): Promise<GetPublishedPostsResponse> => {
  const normalizedSort = getNormalizedSort(sort);

  const response = await notion.databases.query({
    database_id: getDatabaseId(),
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        ...(tag && tag !== '전체'
          ? [
              {
                property: 'Tags',
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: normalizedSort === 'latest' ? 'descending' : 'ascending',
      },
    ],
    page_size: pageSize,
    start_cursor: startCursor,
  });

  const posts = response.results.filter(isPageObjectResponse).map(getPostMetaData);
  return {
    posts,
    has_more: response.has_more,
    next_cursor: response.next_cursor ?? null,
  };
};

export const getTagsFromPosts = (posts: Post[]): TagFilterItem[] => {
  const tagCount = posts.reduce(
    (acc, post) => {
      post.tags?.forEach((tag) => {
        acc[tag.name] = (acc[tag.name] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const tags: TagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  tags.unshift({
    id: 'all',
    name: '전체',
    count: posts.length,
  });

  const [allTag, ...restTags] = tags;
  const sortedTags = restTags.sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  return [allTag, ...sortedTags];
};

export const getTags = async (): Promise<TagFilterItem[]> => {
  const { posts } = await getPublishedPosts({});
  return getTagsFromPosts(posts);
};
