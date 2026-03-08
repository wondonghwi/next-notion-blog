import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-6 md:py-10 lg:py-14">
      <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-9 w-36 rounded-full" />
          <Skeleton className="h-3 w-28" />
        </div>

        <div className="overflow-hidden rounded-[32px] border border-border/70 bg-card/80 shadow-[0_34px_90px_-54px_rgba(15,23,42,0.4)]">
          <Skeleton className="aspect-[16/7] w-full rounded-none" />

          <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-2/3" />
            </div>

            <div className="flex flex-wrap gap-3">
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-36 rounded-full" />
            </div>
          </div>

          <div className="space-y-5 border-t border-border/70 px-6 py-8 md:px-10 md:py-10">
            <Skeleton className="aspect-video w-full rounded-[24px]" />

            <div className="space-y-4">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            <div className="space-y-4 pt-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-32 w-full rounded-[24px]" />
            </div>
          </div>
        </div>

        <Skeleton className="h-28 w-full rounded-[26px]" />
      </div>
    </div>
  );
}
