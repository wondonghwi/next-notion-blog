import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const tagRows = Array.from({ length: 9 });
const postRows = Array.from({ length: 3 });
const contactRows = Array.from({ length: 2 });

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

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[200px_minmax(0,1fr)_220px]">
        <aside className="order-2 lg:order-1">
          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-24" />
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-3">
                {tagRows.map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3 rounded-md p-1.5">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="order-1 space-y-8 lg:order-2">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-10 w-40 sm:w-52" />
            <Skeleton className="h-10 w-32 sm:w-48" />
          </div>

          <ul className="grid gap-4">
            {postRows.map((_, idx) => (
              <li key={idx}>
                <PostCardSkeleton />
              </li>
            ))}
          </ul>
        </div>

        <aside className="order-3 flex flex-col gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Skeleton className="h-40 w-40 rounded-full" />
                </div>

                <div className="space-y-2 text-center">
                  <Skeleton className="mx-auto h-7 w-20" />
                  <Skeleton className="mx-auto h-5 w-36" />
                </div>

                <div className="flex justify-center gap-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>

                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-7 w-24" />
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {contactRows.map((_, idx) => (
                  <div key={idx} className="bg-primary/5 flex items-start gap-4 rounded-lg p-3">
                    <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
