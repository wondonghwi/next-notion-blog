import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TAG_SKELETON_ROWS = Array.from({ length: 9 });

export function TagSectionSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[28px] border-border/70 bg-card/80 py-0 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.3)] backdrop-blur-xl">
      <CardHeader className="border-b border-border/60 py-5">
        <Skeleton className="h-7 w-24" />
      </CardHeader>

      <CardContent className="px-4 py-4">
        <div className="flex flex-col gap-2">
          {TAG_SKELETON_ROWS.map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 rounded-2xl px-3 py-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-6 w-8 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
