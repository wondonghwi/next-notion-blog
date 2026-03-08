import { use } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PostSort, TagFilterItem } from '@/types/blog';
import Link from 'next/link';

interface TagSectionProps {
  tagsPromise: Promise<TagFilterItem[]>;
  selectedTag: string;
  selectedSort: PostSort;
}

export function TagSection({ tagsPromise, selectedTag, selectedSort }: TagSectionProps) {
  const tags = use(tagsPromise);

  return (
    <Card className="overflow-hidden rounded-[28px] border-border/70 bg-card/80 py-0 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur-xl">
      <CardHeader className="border-b border-border/60 py-5">
        <CardTitle className="text-base font-semibold tracking-tight">태그 목록</CardTitle>
        <CardDescription>관심 있는 주제로 빠르게 이동해보세요.</CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-4">
        <div className="flex flex-col gap-2">
          {tags.map((tag) => {
            const params = new URLSearchParams();
            params.set('tag', tag.name);
            params.set('sort', selectedSort);

            return (
              <Link href={`?${params.toString()}`} key={tag.id} className="block">
                <div
                  className={cn(
                    'flex items-center justify-between gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-200',
                    'text-muted-foreground hover:bg-accent/75 hover:text-foreground',
                    selectedTag === tag.name &&
                      'bg-accent text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]'
                  )}
                >
                  <span className={cn('truncate', selectedTag === tag.name && 'font-medium')}>
                    {tag.name}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      selectedTag === tag.name
                        ? 'bg-background/70 text-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {tag.count}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
