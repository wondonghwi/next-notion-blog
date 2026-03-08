'use server';

import { redirect } from 'next/navigation';
import { createPost } from '@/lib/notion';

export async function createPostAction(formData: FormData) {
  console.log(formData);
  const { title, tag, content } = Object.fromEntries(formData.entries());

  const createdPost = await createPost({
    title: String(title),
    tag: String(tag),
    content: String(content),
  });
  console.log('포스트 생성 완료');

  redirect(`/blog/${createdPost.slug}`);
}
