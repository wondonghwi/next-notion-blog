'use client';

import { usePathname, useParams, useSearchParams } from 'next/navigation';

export default function RouteInfo() {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  return (
    <div className="mb-4 rounded-lg bg-slate-100 p-4 dark:bg-slate-800">
      <h2 className="mb-2 text-lg font-bold">현재 경로 정보</h2>
      <div className="space-y-2 text-sm">
        <p>
          <strong>pathname:</strong> {pathname}
        </p>
        <p>
          <strong>params:</strong> {JSON.stringify(params)}
        </p>
        <p>
          <strong>searchParams:</strong> {searchParams.toString() || '(없음)'}
        </p>
      </div>
    </div>
  );
}
