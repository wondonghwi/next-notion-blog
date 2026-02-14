import { act, Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TagSection } from '@/app/_components/TagSection';
import SortSelect from '@/app/_components/SortSelect.client';

const navigationMocks = vi.hoisted(() => {
  return {
    push: vi.fn(),
    useSearchParams: vi.fn(() => new URLSearchParams('tag=React&sort=latest')),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigationMocks.push }),
  useSearchParams: () => navigationMocks.useSearchParams(),
}));

vi.mock('@/components/ui/select', async () => {
  const React = await import('react');
  let onValueChangeHandler: ((value: string) => void) | null = null;

  return {
    Select: ({
      children,
      onValueChange,
    }: {
      children: React.ReactNode;
      onValueChange: (value: string) => void;
    }) => {
      onValueChangeHandler = onValueChange;
      return React.createElement('div', null, children);
    },
    SelectTrigger: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
    SelectValue: ({ placeholder }: { placeholder?: string }) =>
      React.createElement('span', null, placeholder ?? ''),
    SelectContent: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
    SelectItem: ({ value, children }: { value: string; children: React.ReactNode }) =>
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: () => {
            onValueChangeHandler?.(value);
          },
        },
        children
      ),
  };
});

describe('필터 컨트롤 통합', () => {
  beforeEach(() => {
    navigationMocks.push.mockReset();
    navigationMocks.useSearchParams.mockReturnValue(new URLSearchParams('tag=React&sort=latest'));
  });

  it('정렬을 변경해도 현재 태그를 유지한다', async () => {
    const user = userEvent.setup();

    render(<SortSelect />);

    await user.click(screen.getByRole('button', { name: '오래된순' }));

    expect(navigationMocks.push).toHaveBeenCalledWith('?tag=React&sort=oldest');
  });

  it('태그 링크를 만들 때 현재 정렬 값을 보존한다', async () => {
    await act(async () => {
      render(
        <Suspense fallback={<div>loading</div>}>
          <TagSection
            tagsPromise={Promise.resolve([
              { id: 'all', name: '전체', count: 2 },
              { id: 'react', name: 'React', count: 1 },
            ])}
            selectedTag="전체"
            selectedSort="oldest"
          />
        </Suspense>
      );
    });

    const hrefs = (await screen.findAllByRole('link', {}, { timeout: 3000 })).map((link) =>
      decodeURIComponent(link.getAttribute('href') ?? '')
    );

    expect(hrefs).toContain('?tag=전체&sort=oldest');
    expect(hrefs).toContain('?tag=React&sort=oldest');
  });
});
