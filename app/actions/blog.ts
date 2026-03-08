'use server';

import { redirect } from 'next/navigation';
import { createPost } from '@/lib/notion';

export async function createPostAction(formData: FormData) {
  const { title, tag, content } = Object.fromEntries(formData.entries());

  const createdPost = await createPost({
    title: String(title),
    tag: String(tag),
    content: String(content),
  });

  redirect(`/blog/${createdPost.slug}`);
}
