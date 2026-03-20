import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '블로그',
  description: '노션으로 발행한 개발 기록과 프론트엔드 아카이브를 모아보는 페이지입니다.',
});

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">블로그</h2>
      </div>
    </div>
  );
}
