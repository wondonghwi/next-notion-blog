import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/metadata';

export const metadata: Metadata = createPageMetadata({
  title: '소개',
  description: '원동휘의 프로필과 작업 방향을 소개하는 페이지입니다.',
});

export default function About() {
  return (
    <div className="container py-8">
      <div className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">소개</h2>
      </div>
    </div>
  );
}
