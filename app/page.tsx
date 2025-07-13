import { PostCard } from '@/components/features/blog/PostCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TagSection } from '@/app/_components/TagSection';
import { ProfileSection } from '@/app/_components/ProfileSection';
import { ContactSection } from '@/app/_components/ContactSection';
import Link from 'next/link';
import { getPublishedPosts } from '@/lib/notion';

const mockTags = [
  { id: '1', name: '전체', count: 20 },
  { id: '2', name: 'HTML', count: 10 },
  { id: '3', name: 'CSS', count: 5 },
  { id: '4', name: 'JavaScript', count: 3 },
  { id: '5', name: 'React', count: 3 },
  { id: '6', name: 'Next.js', count: 3 },
];

export default async function Home() {
  const posts = await getPublishedPosts();

  return (
    <div className="container py-8">
      <div className="grid grid-cols-[200px_1fr_220px] gap-6">
        <aside>
          <TagSection tags={mockTags} />
        </aside>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">블로그 목록</h2>
            <Select defaultValue="latest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 방식 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="oldest">오래된순</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-4">
            {posts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id}>
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <ProfileSection />
          <ContactSection />
        </aside>
      </div>
    </div>
  );
}
