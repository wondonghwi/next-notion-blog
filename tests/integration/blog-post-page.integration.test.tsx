import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  return {
    getPostBySlug: vi.fn(),
    notFound: vi.fn(() => {
      throw new Error('NOT_FOUND');
    }),
  };
});

vi.mock('@/lib/notion', () => ({
  getPostBySlug: mocks.getPostBySlug,
}));

vi.mock('next/navigation', () => ({
  notFound: mocks.notFound,
}));

vi.mock('next-mdx-remote-client/rsc', () => ({
  MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-content">{source}</div>,
}));

import BlogPost from '@/app/blog/[slug]/page';

describe('블로그 상세 페이지 통합', () => {
  beforeEach(() => {
    mocks.getPostBySlug.mockReset();
    mocks.notFound.mockClear();
  });

  it('게시글이 없으면 notFound를 호출한다', async () => {
    mocks.getPostBySlug.mockResolvedValue(null);

    await expect(BlogPost({ params: Promise.resolve({ slug: 'missing-post' }) })).rejects.toThrow(
      'NOT_FOUND'
    );
    expect(mocks.notFound).toHaveBeenCalledTimes(1);
  });

  it('게시글 상세와 마크다운 본문을 렌더링한다', async () => {
    mocks.getPostBySlug.mockResolvedValue({
      markdown: '# 테스트 본문',
      post: {
        id: 'post-1',
        title: '테스트 포스트',
        slug: 'test-post',
        author: '원동휘',
        date: '2025-01-01',
        tags: [{ id: 'react', name: 'React', count: 1 }],
      },
    });

    const view = await BlogPost({ params: Promise.resolve({ slug: 'test-post' }) });
    render(view);

    expect(screen.getByRole('heading', { name: '테스트 포스트' })).toBeInTheDocument();
    expect(screen.getByTestId('mdx-content')).toHaveTextContent('# 테스트 본문');
    expect(screen.getByText('이전/다음 글 탐색 기능은 준비 중입니다.')).toBeInTheDocument();
    expect(document.querySelector('a[href="/blog/previous-post"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href="/blog/next-post"]')).not.toBeInTheDocument();
  });
});
