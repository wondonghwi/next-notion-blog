import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const POST_SKELETON_ROWS = Array.from({ length: 2 });

function PostCardSkeleton() {
  return (
    <Card className="bg-card/50 border-border/40 gap-0 overflow-hidden py-0">
      <Skeleton className="aspect-[2/1] w-full rounded-none" />
      <CardContent className="p-6">
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <div className="space-y-3">
          <Skeleton className="h-8 w-3/5" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardContent>
    </Card>
  );
}

export function PostListSkeleton() {
  return (
    <ul className="grid gap-4">
      {POST_SKELETON_ROWS.map((_, idx) => (
        <li key={idx}>
          <PostCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
