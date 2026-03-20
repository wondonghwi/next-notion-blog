import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { ArrowLeft, CalendarDays, User } from 'lucide-react';
import { createArticleMetadata, siteConfig } from '@/lib/metadata';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getPostBySlug } from '@/lib/notion';
import { formatDateToKorean } from '@/lib/date';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

const getCachedPostBySlug = cache(async (slug: string) => getPostBySlug(slug));

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getCachedPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  const { post } = postData;

  return createArticleMetadata({
    title: post.title || '블로그 글',
    description: post.description || siteConfig.description,
    images: post.coverImage ? [post.coverImage] : undefined,
    publishedTime: post.date,
    modifiedTime: post.modifiedDate,
    authors: post.author ? [post.author] : undefined,
    tags: post.tags?.map((tag) => tag.name),
  });
}

export default async function BlogPost({ params }: BlogPostProps) {
  const { slug } = await params;
  const postData = await getCachedPostBySlug(slug);

  if (!postData) {
    notFound();
  }

  const { markdown, post } = postData;
  const tags = post.tags?.filter((tag) => tag?.id && tag?.name) ?? [];

  return (
    <div className="container py-6 md:py-10 lg:py-14">
      <section className="mx-auto max-w-4xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="ghost" className="w-fit rounded-full px-0 text-sm font-medium">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              홈으로 돌아가기
            </Link>
          </Button>

          <p className="text-muted-foreground text-[0.7rem] font-semibold tracking-[0.24em] uppercase">
            Notion article
          </p>
        </div>

        <article className="overflow-hidden rounded-[32px] border border-border/70 bg-card/80 shadow-[0_34px_90px_-54px_rgba(15,23,42,0.4)] backdrop-blur-xl">
          {post.coverImage ? (
            <div className="relative aspect-[16/7] overflow-hidden border-b border-border/70">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/10" />
            </div>
          ) : null}

          <div className="from-primary/16 via-primary/6 relative bg-gradient-to-br to-transparent px-6 py-8 md:px-10 md:py-10">
            <div className="space-y-6">
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.id}
                      variant="secondary"
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary shadow-none"
                    >
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              ) : null}

              <div className="space-y-4">
                <p className="text-muted-foreground text-[0.7rem] font-semibold tracking-[0.24em] uppercase">
                  Article
                </p>
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-5xl md:leading-[1.08]">
                  {post.title}
                </h1>
                {post.description ? (
                  <p className="text-muted-foreground max-w-3xl text-sm leading-7 md:text-lg">
                    {post.description}
                  </p>
                ) : null}
              </div>

              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                {post.author ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                ) : null}

                {post.date ? (
                  <div className="flex items-center gap-1.5 rounded-full bg-background/80 px-3.5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatDateToKorean(post.date)}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <Separator className="bg-border/70" />

          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="prose prose-slate prose-headings:scroll-mt-[var(--height-header)] prose-headings:tracking-tight prose-h2:mt-14 prose-h2:border-t prose-h2:border-border/60 prose-h2:pt-10 prose-h3:mt-10 prose-p:text-base prose-p:leading-8 prose-a:text-primary prose-a:font-medium prose-a:no-underline prose-a:underline-offset-4 prose-strong:text-foreground prose-code:rounded-md prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-[24px] prose-pre:border prose-pre:border-border/70 prose-pre:bg-background/95 prose-img:rounded-[24px] prose-img:border prose-img:border-border/70 prose-img:shadow-lg prose-blockquote:border-primary/30 prose-blockquote:bg-muted/25 prose-blockquote:px-6 prose-blockquote:py-3 prose-li:marker:text-primary dark:prose-invert max-w-none">
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

        <div className="grid gap-4 rounded-[26px] border border-border/70 bg-card/65 px-6 py-5 shadow-[0_24px_60px_-46px_rgba(15,23,42,0.35)] backdrop-blur-sm md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="space-y-1.5">
            <p className="text-sm font-medium tracking-tight">다음 탐색</p>
            <p className="text-muted-foreground text-sm leading-6">
              이전/다음 글 탐색 기능은 준비 중입니다. 홈에서 다른 글을 바로 이어서
              확인할 수 있습니다.
            </p>
          </div>

          <Button asChild variant="outline" className="w-full rounded-full sm:w-fit">
            <Link href="/">홈으로 이동</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
