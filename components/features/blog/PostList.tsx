import { use } from 'react';
import Link from 'next/link';
import type { Post } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostListProps {
  postsPromise: Promise<Post[]>;
}

export function PostList({ postsPromise }: PostListProps) {
  const posts = use(postsPromise);

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground text-sm">조건에 맞는 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {posts.map((post, index) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`} className="block">
            <PostCard post={post} isFirst={index === 0} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
