import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PostSort, TagFilterItem } from '@/types/blog';
import Link from 'next/link';

interface TagSectionProps {
  tags: TagFilterItem[];
  selectedTag: string;
  selectedSort: PostSort;
}

export function TagSection({ tags, selectedTag, selectedSort }: TagSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          {tags.map((tag) => {
            const params = new URLSearchParams();
            params.set('tag', tag.name);
            params.set('sort', selectedSort);

            return (
              <Link href={`?${params.toString()}`} key={tag.id}>
                <div
                  className={cn(
                    'hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors',
                    selectedTag === tag.name && 'bg-muted-foreground/10 text-foreground font-medium'
                  )}
                >
                  <span>{tag.name}</span>
                  <span>{tag.count}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
