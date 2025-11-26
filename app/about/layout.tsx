import { ReactNode } from 'react';
import Link from 'next/link';
import { Code2, User, Coffee, ExternalLink } from 'lucide-react';

interface AboutLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: User, label: '프로필', href: '/about' },
  { icon: Code2, label: '기술 스택', href: '/about/skills' },
  { icon: Coffee, label: '컨택', href: 'mailto:donghwi1289@gmail.com', external: true },
  { icon: ExternalLink, label: 'Github', href: 'https://github.com/wondonghwi', external: true },
];

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="container py-8">
      <div className="flex gap-8">
        <aside className="w-64 shrink-0">
          <nav className="bg-card sticky top-8 space-y-1 rounded-lg border p-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
                {...(item.external && {
                  target: '_blank',
                  rel: 'noopener noreferrer',
                })}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
