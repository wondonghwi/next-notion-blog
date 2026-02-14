import React from 'react';
import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from '@/tests/msw/server';

process.env.NOTION_TOKEN ??= 'test-notion-token';
process.env.NOTION_DATABASE_ID ??= 'test-database-id';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => {
    return React.createElement('a', { href, ...props }, children);
  },
}));

vi.mock('next/image', () => ({
  default: ({ fill: _fill, priority: _priority, ...props }: Record<string, unknown>) => {
    return React.createElement('img', props);
  },
}));
