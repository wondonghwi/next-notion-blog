'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { PostFormState } from '@/app/actions/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PostFormProps {
  createPostAction: (prevState: PostFormState, formData: FormData) => Promise<PostFormState>;
}

const initialState: PostFormState = {
  message: '',
  errors: {},
  formData: {
    title: '',
    tag: '',
    content: '',
  },
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} aria-disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {pending ? '발행 중...' : '발행하기'}
    </Button>
  );
}

export default function PostForm({ createPostAction }: PostFormProps) {
  const [state, formAction, isPending] = useActionState(createPostAction, initialState);

  return (
    <form action={formAction}>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <fieldset disabled={isPending} className="space-y-6 disabled:opacity-70">
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                className="h-12 text-lg"
                defaultValue={state.formData?.title ?? ''}
                aria-invalid={Boolean(state.errors?.title?.length)}
              />
              {state.errors?.title?.[0] ? (
                <p className="text-destructive text-sm">{state.errors.title[0]}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tag">태그</Label>
              <Input
                id="tag"
                name="tag"
                placeholder="태그를 입력해주세요"
                className="h-12"
                defaultValue={state.formData?.tag ?? ''}
                aria-invalid={Boolean(state.errors?.tag?.length)}
              />
              {state.errors?.tag?.[0] ? (
                <p className="text-destructive text-sm">{state.errors.tag[0]}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">본문</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="작성해주세요"
                className="min-h-[400px] resize-none"
                defaultValue={state.formData?.content ?? ''}
                aria-invalid={Boolean(state.errors?.content?.length)}
              />
              {state.errors?.content?.[0] ? (
                <p className="text-destructive text-sm">{state.errors.content[0]}</p>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-2">
              <p aria-live="polite" className="text-muted-foreground text-sm">
                {state.message}
              </p>
              <SubmitButton />
            </div>
          </fieldset>
        </CardContent>
      </Card>
    </form>
  );
}
