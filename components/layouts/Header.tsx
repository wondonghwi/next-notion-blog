import Link from 'next/link';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 border-b">
      <div className="justify container flex h-[var(--height-header)] items-center">
        <div className="flex w-full items-center justify-between gap-4">
          <Link href="/" className="text-xl font-semibold">
            <span className="font-bold">원동휘</span>
          </Link>

          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="gap-2">
              <Link href="/blog/write">글쓰기</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
