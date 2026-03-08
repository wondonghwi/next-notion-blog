'use client';

import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface PostFormProps {
  createPostAction: (formData: FormData) => Promise<void>;
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const { pending } = useFormStatus();
  const isLocked = pending || isSubmitting;

  return (
    <Button type="submit" disabled={isLocked} aria-disabled={isLocked}>
      {isLocked ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isLocked ? '발행 중...' : '발행하기'}
    </Button>
  );
}

export default function PostForm({ createPostAction }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittedRef = useRef(false);

  const handleSubmit = () => {
    if (submittedRef.current) {
      return;
    }

    submittedRef.current = true;
    setIsSubmitting(true);
  };

  return (
    <form action={createPostAction} onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-70">
            {/* 제목 입력 */}
            <div className="space-y-2">
              <Label htmlFor="title">제목</Label>
              <Input
                id="title"
                name="title"
                placeholder="제목을 입력해주세요"
                className="h-12 text-lg"
              />
            </div>

            {/* 태그 입력 */}
            <div className="space-y-2">
              <Label htmlFor="tag">태그</Label>
              <Input id="tag" name="tag" placeholder="태그를 입력해주세요" className="h-12" />
            </div>

            {/* 본문 입력 */}
            <div className="space-y-2">
              <Label htmlFor="content">본문</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="작성해주세요"
                className="min-h-[400px] resize-none"
              />
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-end gap-2">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </fieldset>
        </CardContent>
      </Card>
    </form>
  );
}
