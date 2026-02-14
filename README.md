# 원동휘의 개인 블로그

Next.js App Router와 Notion API를 이용해 만든 개인 블로그 프로젝트입니다.

## 기술 스택

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4 + shadcn/ui
- Notion API + notion-to-md
- Vitest + Testing Library + MSW

## 프로젝트 구조

```text
notion-blog-nextjs/
├── app/                  # 라우트 및 페이지
│   ├── _components/      # 앱 전용 컴포넌트
│   ├── about/            # 소개 페이지
│   └── blog/[slug]/      # 블로그 상세 페이지
├── components/           # 공통 UI/레이아웃/기능 컴포넌트
├── lib/                  # Notion API, 유틸리티
├── tests/                # Vitest 통합 테스트
└── types/                # 공통 타입
```

## 개발 환경

- Node.js >= 22.17.1
- pnpm >= 10.14.0

## 설치 및 실행

```bash
git clone https://github.com/wondonghwi/notion-blog-nextjs.git
cd notion-blog-nextjs
nvm use
pnpm install
cp .env.example .env.local
pnpm dev
```

## 환경 변수

`.env.local` 파일에 아래 값을 설정하세요.

```bash
NOTION_TOKEN=your_notion_token
NOTION_DATABASE_ID=your_notion_database_id
```

## 주요 명령어

```bash
pnpm dev            # 개발 서버
pnpm build          # 프로덕션 빌드
pnpm start          # 프로덕션 실행
pnpm lint           # 린트
pnpm test           # Vitest
pnpm test --run     # 단발 실행(CI 용)
pnpm test:watch     # watch + verbose
```

## CI

GitHub Actions(`.github/workflows/ci.yml`)에서 아래를 자동 실행합니다.

1. `pnpm lint`
2. `pnpm test --run`
3. `pnpm build`
