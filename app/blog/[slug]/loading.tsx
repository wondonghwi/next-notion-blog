import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container py-6 md:py-8 lg:py-12">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[220px_minmax(0,1fr)_240px] md:gap-8">
        <aside className="hidden md:block" aria-hidden="true" />

        <section className="min-w-0">
          <div className="overflow-hidden rounded-[30px] border border-border/70 bg-card/80 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.32)]">
            <div className="from-primary/14 via-primary/5 bg-gradient-to-br to-transparent px-5 py-6 md:px-8 md:py-8">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Skeleton className="h-7 w-16 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-10 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="flex flex-wrap gap-3">
                  <Skeleton className="h-8 w-28 rounded-full" />
                  <Skeleton className="h-8 w-32 rounded-full" />
                </div>
              </div>
            </div>

            <div className="px-5 py-5 md:hidden">
              <Skeleton className="h-16 w-full rounded-2xl" />
            </div>

            <div className="space-y-4 px-5 pb-8 md:px-8">
              <Skeleton className="aspect-video w-full rounded-[24px]" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Skeleton className="h-20 w-full rounded-[24px]" />
          </div>
        </section>

        <aside className="relative hidden md:block">
          <div className="sticky top-[var(--sticky-top)] rounded-[26px] border border-border/70 bg-card/85 p-5 shadow-[0_26px_70px_-46px_rgba(15,23,42,0.35)]">
            <div className="space-y-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-12" />
              <div className="space-y-2 pt-2">
                <Skeleton className="h-9 w-full rounded-xl" />
                <Skeleton className="h-9 w-full rounded-xl" />
                <Skeleton className="h-9 w-5/6 rounded-xl" />
                <Skeleton className="h-9 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
