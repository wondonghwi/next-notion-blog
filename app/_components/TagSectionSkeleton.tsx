import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const TAG_SKELETON_ROWS = Array.from({ length: 9 });

export function TagSectionSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-24" />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-3">
          {TAG_SKELETON_ROWS.map((_, idx) => (
            <div key={idx} className="flex items-center justify-between gap-3 rounded-md p-1.5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
