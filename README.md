# 원동휘의 개인 블로그 with Cursor AI

Next.js App Router와 Cursor AI를 활용하여 개발된 개인 블로그 프로젝트입니다.

## 프로젝트 소개

이 프로젝트는 Cursor를 적극적으로 사용하여 개발되었습니다.

## 프로젝트 구성

```
notion-blog-nextjs/
├── app/                  # Next.js App Router 페이지
│   ├── _components/      # 앱 전역 컴포넌트
│   ├── about/            # 소개 페이지
│   ├── blog/             # 블로그 페이지
│   │   └── [slug]/       # 블로그 상세 페이지
│   ├── docs/             # 문서 페이지
│   └── mdx-page/         # MDX 예제 페이지
├── components/           # 공통 컴포넌트
│   ├── features/         # 기능별 컴포넌트
│   │   └── blog/         # 블로그 관련 컴포넌트
│   ├── layouts/          # 레이아웃 컴포넌트
│   └── ui/               # UI 컴포넌트 (Shadcn)
├── lib/                  # 유틸리티 및 API 함수
│   ├── date.ts           # 날짜 관련 유틸리티
│   ├── notion.ts         # Notion API 연동
│   └── utils.ts          # 일반 유틸리티 함수
└── types/                # 타입 정의
```

## 기술 스택

- **프레임워크**: [Next.js](https://nextjs.org) (App Router)
- **스타일링**: [Tailwind CSS](https://tailwindcss.com) + [Shadcn UI](https://ui.shadcn.com/)
- **콘텐츠 관리**: [Notion API](https://developers.notion.com)
- **개발 도구**: Cursor AI

## 주요 기능

- **블로그 포스트 렌더링**: Notion API 연동 및 마크다운 변환
- **반응형 레이아웃**: 다양한 화면 크기에 최적화된 UI 구현
- **날짜 포맷팅**: 한국어 날짜 형식 지원 유틸리티
- **MDX 통합**: 마크다운과 React 컴포넌트 혼합 사용

## 개발 환경 설정

### 요구사항

- Node.js >= 22.17.1
- pnpm >= 10.14.0

### 설치 방법

1. 저장소 클론:

   ```bash
   git clone https://github.com/wondonghwi/notion-blog-nextjs.git
   cd notion-blog-nextjs
   ```

2. Node.js 버전 확인 및 전환 (nvm 사용 시):

   ```bash
   nvm use  # .nvmrc 파일의 버전으로 자동 전환
   ```

3. pnpm 설치 (필요한 경우):

   ```bash
   npm install -g pnpm@10.14.0
   ```

4. 의존성 설치:

   ```bash
   pnpm install
   ```

5. 환경 변수 설정:
   `.env.local` 파일을 생성하고 다음 변수를 설정합니다:

   ```
   NOTION_API_KEY=your_notion_api_key
   NOTION_DATABASE_ID=your_notion_database_id
   ```

6. 개발 서버 실행:

   ```bash
   pnpm dev
   ```
