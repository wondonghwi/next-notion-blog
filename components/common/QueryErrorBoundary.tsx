'use client';

import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface QueryErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

export function QueryErrorBoundary({
  children,
  fallbackTitle = '데이터를 불러올 수 없습니다',
  fallbackMessage = '데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => {
            const errorMessage =
              error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다';

            return (
              <Card className="border-destructive/50">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="text-destructive h-5 w-5" />
                    <CardTitle className="text-lg">{fallbackTitle}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{fallbackMessage}</p>

                  {process.env.NODE_ENV === 'development' && (
                    <details className="text-xs">
                      <summary className="text-muted-foreground cursor-pointer font-medium">
                        에러 상세 (개발 모드)
                      </summary>
                      <pre className="bg-muted mt-2 overflow-auto rounded p-2 text-xs">
                        {errorMessage}
                      </pre>
                    </details>
                  )}

                  <Button onClick={resetErrorBoundary} className="w-full">
                    다시 시도
                  </Button>
                </CardContent>
              </Card>
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
