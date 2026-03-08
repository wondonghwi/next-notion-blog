'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container py-8">
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="text-destructive h-5 w-5" />
              <CardTitle>오류가 발생했습니다</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              페이지를 표시하는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="text-xs">
                <summary className="cursor-pointer font-medium">에러 상세 (개발 모드)</summary>
                <pre className="bg-muted mt-2 overflow-auto rounded p-2">{error.message}</pre>
              </details>
            )}

            <Button onClick={reset} className="w-full">
              다시 시도
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
