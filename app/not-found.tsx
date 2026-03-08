import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="border-border/70 bg-card/80 w-full max-w-xl overflow-hidden rounded-[30px] border shadow-[0_30px_80px_-48px_rgba(15,23,42,0.32)] backdrop-blur-xl">
          <div className="from-primary/14 via-primary/5 h-20 bg-gradient-to-br to-transparent" />
          <CardHeader className="-mt-4 space-y-4 px-6 md:px-8">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-primary h-5 w-5" />
              <span className="text-muted-foreground text-sm font-medium tracking-[0.18em] uppercase">
                404
              </span>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold tracking-tight md:text-3xl">
                페이지를 찾을 수 없습니다
              </CardTitle>
              <p className="text-muted-foreground text-sm leading-6 md:text-base">
                요청하신 페이지가 없거나 이동되었을 수 있습니다. 홈으로 돌아가거나
                새로운 글을 작성해보세요.
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 md:px-8">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="sm:flex-1">
                <Link href="/">홈으로 이동</Link>
              </Button>
              <Button asChild variant="outline" className="sm:flex-1">
                <Link href="/blog/write">글쓰기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
