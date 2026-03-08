import { createPostAction } from '@/app/actions/blog';
import PostForm from '../PostForm';

export default function WritePage() {
  return (
    <div className="container py-10">
      <PostForm createPostAction={createPostAction} />
    </div>
  );
}
