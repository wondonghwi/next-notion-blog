# 저장소 지침

## 사용자 최우선 규칙

- 모든 사용자 대상 출력은 기본적으로 한국어로 작성한다. 여기에는 채팅 답변, 설명, 요약, 진행 업데이트, 코드리뷰 코멘트, GitHub PR 리뷰 코멘트, 수정 제안 문구가 포함된다.
- 코드, 식별자, 파일 경로, 함수명, 클래스명, 명령어, 환경변수, 에러 원문처럼 번역하면 안 되는 항목만 원문 그대로 유지한다.
- 사용자가 영어를 명시적으로 요청한 경우에만 영어로 전환한다.
- 커밋은 Conventional Commits 형식 **영문 prefix**(예: `feat`, `fix`, `chore`)를 유지한다.
- 커밋 메시지는 **영문 prefix + 한국어 제목(subject)** 형식을 사용한다. 예: `feat(ui): 홈 게시물 무한 스크롤로 전환`
- PR 제목은 **항상 한국어**로 작성한다.
- 브랜치를 새로 만들 때는 항상 `feature/작업내용(영문-kebab-case)` 형식을 사용한다. 예: `feature/infinite-post-list-refactor`
- PR 본문(description)은 핵심 변경 사항이 바로 드러나도록 구체적으로 작성한다. 반드시 변경 내용, 변경 이유, 영향 범위, 실행 점검(`pnpm lint`, `pnpm test --run`, `pnpm build`), 관련 이슈, UI 변경 시 스크린샷/GIF를 포함한다.
- 사용자가 “커밋 후 PR 올려줘”라고 요청하면:
  1. `main` 브랜치에서 `feature/` 접두사 브랜치 생성
  2. 역할/범위 기준으로 분리 커밋 작성
  3. PR 생성
  4. 작업 후 `main` 브랜치 복귀

이 프로젝트는 Notion API를 사용하는 Next.js App Router 기반 블로그입니다. 변경사항은 기존 구조와 도구 체계를 따르고, 작고 재현 가능한 단위로 정리합니다.

## 프로젝트 구조 및 모듈 구성

- `app/`: 라우트 폴더 (`about/`, `blog/[slug]/`, `docs/`, `mdx-page/`)와 공통 `app/_components/`.
- `components/`: 재사용 UI(`ui/`), 레이아웃(`layouts/`), 기능 컴포넌트(`features/blog/`).
- `lib/`: Notion API 연동(`notion.ts`), 날짜 포맷, 유틸 등 공통 헬퍼.
- `types/`: 공통 TypeScript 타입 저장소(재정의보다 임포트 우선).
- `public/`: 정적 자산. `mdx-components.tsx`에서 MDX 바인딩 관리.

## 빌드/개발 명령

pnpm 사용 (`Node >= 22.17.1`, `pnpm >= 10.14.0`):

```bash
pnpm dev          # 로컬 개발 서버 (Turbopack)
pnpm build        # 프로덕션 빌드
pnpm start        # 빌드 결과 실행
pnpm lint         # TypeScript/JS/MDX 정적 점검
pnpm lint:fix     # 자동 수정 가능한 lint 이슈 정리
pnpm format       # Prettier + Tailwind 플러그인 포맷
```

PR 전 최소 점검은 `pnpm lint`, `pnpm test --run`, `pnpm build`를 기준으로 한다.

## 코딩 스타일 및 네이밍

- TypeScript strict 기반으로 작성, 기본은 서버 컴포넌트. 필요한 경우에만 `'use client'`.
- 컴포넌트/React 파일은 PascalCase, 유틸/헬퍼는 camelCase, 라우트 폴더는 Next.js 규칙 준수.
- Tailwind CSS v4 + Prettier Tailwind 플러그인 사용, 클래스 순서는 포맷터 기준.
- 임포트는 `@/*` 별칭 사용.
- `next lint`/`eslint-config-prettier`를 기준으로 정리, 불필요한 `console` 제거는 지양.

## 테스트 가이드

- 이 저장소는 Vitest를 사용한다. 자동 검증은 `pnpm lint`, `pnpm test --run`, `pnpm build`를 기본으로 한다.
- 핵심 플로우(홈, 포스트 상세, docs)는 필요 시 수동 점검으로 보완한다.
- 테스트 추가 시 `*.test.ts`, `*.test.tsx` 또는 `__tests__/`에 배치, Vitest 또는 Jest + React Testing Library 선호.

## 커밋/PR 가이드

- Commitlint의 Conventional Commits 타입 허용: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`.
- 브랜치명은 `feature/작업내용(영문-kebab-case)` 형식을 따른다.
- 커밋 메시지는 **영문 prefix + 한국어 제목(subject)** 형식을 사용한다. 예: `feat(blog): 노션 게시물 캐시 처리 로직 추가`
- PR 제목은 **항상 한글**로 작성한다.
- PR 본문은 핵심 변경 사항이 즉시 드러나게 작성하고, 변경 내용, 변경 이유, 영향 범위, 실행한 점검(`pnpm lint`, `pnpm test --run`, `pnpm build`), 관련 이슈, UI 변경 시 스크린샷/GIF를 포함한다.
- 새 환경변수(`NOTION_TOKEN`, `NOTION_DATABASE_ID` 등)가 생기면 PR 설명에 명시.

## 구성 및 보안

- 비밀값은 `.env.local`에만 두고, 환경 파일은 커밋하지 않는다.
- `engines` 기준에 맞춰 버전 정합성 유지.
- 신규 외부 연동은 `lib/` 중심으로 정리해 라우트 코드를 가볍게 유지.

## 작업 플로우 (요청 기반)

- 사용자가 “커밋 후 PR 올려줘”를 요청하면 기본적으로 `main`에서 `feature/` 접두사 브랜치를 만들고, 작업 단위별로 분리 가능한 커밋을 작성한 뒤 PR을 생성한다.
- 브랜치명은 작업 내용을 설명하는 영문 kebab-case로 작성한다. 예: `feature/infinite-post-list-refactor`
- PR 생성 후에는 `main` 브랜치로 돌아간다.
