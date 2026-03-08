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

function TableOfContentsLink({
  item,
  level = 0,
}: {
  item: TableOfContentsItem;
  level?: number;
}) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id}`}
        className="text-muted-foreground hover:text-foreground block rounded-xl px-3 py-2 text-sm font-medium tracking-tight transition-colors hover:bg-accent/70"
        style={{ paddingLeft: `${0.75 + level * 0.75}rem` }}
      >
        {item.title}
      </Link>
      {item.items && item.items.length > 0 && (
        <div className="space-y-2">
          {item.items.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} level={level + 1} />
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
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)_240px] md:gap-8">
        <aside className="hidden md:block" aria-hidden="true" />
        <section className="min-w-0">
          <article className="overflow-hidden rounded-[30px] border border-border/70 bg-card/80 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.32)] backdrop-blur-xl">
            <div className="from-primary/14 via-primary/5 relative bg-gradient-to-br to-transparent px-5 py-6 md:px-8 md:py-8">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map((tag) => (
                      <Badge
                        key={tag.id}
                        className="rounded-full bg-primary/10 px-3 py-1 text-primary shadow-none"
                        variant="secondary"
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <p className="text-muted-foreground text-[0.7rem] font-semibold tracking-[0.24em] uppercase">
                      Article
                    </p>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {post.title}
                    </h1>
                    {post.description ? (
                      <p className="text-muted-foreground max-w-3xl text-sm leading-6 md:text-base">
                        {post.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="text-muted-foreground flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                  <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1.5">
                    <CalendarDays className="h-4 w-4" />
                    <span>{post.date ? formatDateToKorean(post.date) : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-border/70" />

            <div className="px-5 py-5 md:hidden">
              <details className="rounded-2xl border border-border/70 bg-muted/55 p-4 backdrop-blur-sm">
                <summary className="cursor-pointer list-none text-sm font-semibold tracking-tight">
                  목차 보기
                </summary>
                <nav className="mt-4 space-y-2" aria-label="모바일 블로그 목차">
                  {mockTableOfContents.map((item) => (
                    <TableOfContentsLink key={item.id} item={item} />
                  ))}
                </nav>
              </details>
            </div>

            <div className="px-5 pb-8 md:px-8">
              <div className="prose prose-slate prose-headings:scroll-mt-[var(--height-header)] prose-pre:rounded-2xl dark:prose-invert max-w-none">
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
            </div>
          </article>

          <Separator className="my-10 md:my-12" />

          <div className="text-muted-foreground rounded-[24px] border border-dashed border-border/80 bg-card/50 px-6 py-5 text-sm backdrop-blur-sm">
            이전/다음 글 탐색 기능은 준비 중입니다.
          </div>
        </section>

        <aside className="relative hidden md:block">
          <div className="sticky top-[var(--sticky-top)]">
            <div className="overflow-hidden rounded-[26px] border border-border/70 bg-card/85 p-5 shadow-[0_26px_70px_-46px_rgba(15,23,42,0.35)] backdrop-blur-xl">
              <div className="mb-4 space-y-1">
                <p className="text-muted-foreground text-[0.68rem] font-semibold tracking-[0.24em] uppercase">
                  Contents
                </p>
                <h3 className="text-lg font-semibold tracking-tight">목차</h3>
              </div>
              <nav className="space-y-2" aria-label="블로그 목차">
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
