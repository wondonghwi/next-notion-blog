import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const mockTags = [
  { id: 1, name: '전체', count: 20 },
  { id: 2, name: 'HTML', count: 10 },
  { id: 3, name: 'CSS', count: 5 },
  { id: 4, name: 'JavaScript', count: 3 },
  { id: 5, name: 'React', count: 3 },
  { id: 6, name: 'Next.js', count: 3 },
];

export function TagSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>태그 목록</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3">
          {mockTags.map((tag) => (
            <Link href={`?tag=${tag.name}`} key={tag.id}>
              <div className="hover:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 text-sm transition-colors">
                <span>{tag.name}</span>
                <span>{tag.count}</span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
