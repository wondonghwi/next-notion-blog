'use server';

import { redirect } from 'next/navigation';
import { createPost } from '@/lib/notion';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  tag: z.string().min(1, { message: '태그를 입력해주세요.' }),
  content: z.string().min(10, { message: '최소 10자 이상 입력해주세요.' }),
});

export interface PostFormData {
  title: string;
  tag: string;
  content: string;
}

export interface PostFormState {
  errors?: {
    title?: string[];
    tag?: string[];
    content?: string[];
  };
  message: string;
  formData?: PostFormData;
}

export async function createPostAction(
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const rawDataFormData = {
    title: formData.get('title') as string,
    tag: formData.get('tag') as string,
    content: formData.get('content') as string,
  };

  const validatedFields = postSchema.safeParse(rawDataFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
      message: '유효성 검사에 실패했습니다.',
      formData: rawDataFormData,
    };
  }

  let createdPostSlug = '';

  try {
    const createdPost = await createPost(validatedFields.data);
    createdPostSlug = createdPost.slug;
  } catch (error) {
    console.error(error);
    return {
      message: '글 생성 실패',
      formData: rawDataFormData,
    };
  }

  redirect(`/blog/${createdPostSlug}`);
}
