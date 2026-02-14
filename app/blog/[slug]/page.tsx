import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, User } from 'lucide-react';
import { getPostBySlug } from '@/lib/notion';
import { formatDateToKorean } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface TableOfContentsItem {
  id: string;
  title: string;
  items?: TableOfContentsItem[];
}

const mockTableOfContents: TableOfContentsItem[] = [
  {
    id: 'intro',
    title: '소개',
    items: [],
  },
  {
    id: 'getting-started',
    title: '시작하기',
    items: [
      {
        id: 'prerequisites',
        title: '사전 준비사항',
        items: [
          {
            id: 'node-installation',
            title: 'Node.js 설치',
          },
          {
            id: 'npm-setup',
            title: 'NPM 설정',
          },
        ],
      },
      {
        id: 'project-setup',
        title: '프로젝트 설정',
        items: [
          {
            id: 'create-project',
            title: '프로젝트 생성',
          },
          {
            id: 'folder-structure',
            title: '폴더 구조',
          },
        ],
      },
    ],
  },
  {
    id: 'shadcn-ui-setup',
    title: 'Shadcn UI 설정하기',
    items: [
      {
        id: 'installation',
        title: '설치 방법',
        items: [
          {
            id: 'cli-installation',
            title: 'CLI 도구 설치',
          },
          {
            id: 'component-setup',
            title: '컴포넌트 설정',
          },
        ],
      },
      {
        id: 'configuration',
        title: '환경 설정',
        items: [
          {
            id: 'theme-setup',
            title: '테마 설정',
          },
          {
            id: 'typography',
            title: '타이포그래피',
          },
        ],
      },
    ],
  },
];

function TableOfContentsLink({ item }: { item: TableOfContentsItem }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.title}
      </Link>
      {item.items && item.items.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.items.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  const { markdown, post } = postData;

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_240px]">
        <section className="min-w-0">
          {/* 블로그 헤더 */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                {post.tags?.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold">{post.title}</h1>
            </div>

            {/* 메타 정보 */}
            <div className="text-muted-foreground flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{post.date ? formatDateToKorean(post.date) : ''}</span>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* 블로그 본문 */}
          <div className="prose prose-slate dark:prose-invert prose-headings:scroll-mt-[var(--height-header)] max-w-none">
            <MDXRemote
              source={markdown}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSanitize],
                },
              }}
            />
          </div>

          <Separator className="my-16" />

          <div className="text-muted-foreground rounded-lg border border-dashed p-6 text-sm">
            이전/다음 글 탐색 기능은 준비 중입니다.
          </div>
        </section>
        <aside className="relative hidden xl:block">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="bg-muted/60 space-y-4 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold">목차</h3>
              <nav className="space-y-3 text-sm" aria-label="블로그 목차">
                {mockTableOfContents.map((item) => (
                  <TableOfContentsLink key={item.id} item={item} />
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
