# Biz.AI Landing Page

KT DS의 AI 솔루션을 소개하는 랜딩 페이지입니다.

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [기술 스택](#-기술-스택)
- [라이브러리](#-라이브러리)
- [디자인 시스템](#-디자인-시스템)
- [프로젝트 구조](#-프로젝트-구조)
- [실행 방법](#-실행-방법)
- [환경 변수](#-환경-변수)
- [주요 섹션](#-주요-섹션)

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | Biz.AI |
| **타입** | 랜딩 페이지 (SPA) |
| **라이선스** | Apache-2.0 |
| **Repository** | [github.com/chowonhee332/biz.ai](https://github.com/chowonhee332/biz.ai) |

---

## 🛠 기술 스택

| 분류 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | React | 19.0 |
| **빌드 도구** | Vite | 6.2 |
| **언어** | TypeScript | 5.8 |
| **스타일링** | Tailwind CSS | 4.1 |
| **디자인 시스템** | shadcn/ui | 3.8 |

---

## 📦 라이브러리

### Dependencies (런타임)

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **react** | ^19.0.0 | UI 프레임워크 |
| **react-dom** | ^19.0.0 | React DOM 렌더링 |
| **@vitejs/plugin-react** | ^5.0.4 | Vite React 플러그인 |
| **tailwindcss** | ^4.1.14 | 유틸리티-first CSS |
| **@tailwindcss/vite** | ^4.1.14 | Tailwind v4 Vite 통합 |
| **lucide-react** | ^0.546.0 | 아이콘 라이브러리 |
| **radix-ui** | ^1.4.3 | shadcn 기반 접근성 프리미티브 |
| **class-variance-authority** | ^0.7.1 | 컴포넌트 variant 관리 |
| **clsx** | ^2.1.1 | 조건부 클래스 병합 |
| **tailwind-merge** | ^3.5.0 | Tailwind 클래스 충돌 해결 |
| **motion** | ^12.23.24 | 애니메이션 (선택적) |
| **express** | ^4.21.2 | 백엔드 (선택적) |
| **@google/genai** | ^1.29.0 | Gemini API (선택적) |
| **dotenv** | ^17.2.3 | 환경 변수 |
| **better-sqlite3** | ^12.4.1 | DB (선택적) |

### DevDependencies

| 패키지 | 버전 | 용도 |
|--------|------|------|
| **typescript** | ~5.8.2 | 타입 체킹 |
| **vite** | ^6.2.0 | 빌드 툴 |
| **shadcn** | ^3.8.5 | UI 컴포넌트 CLI |
| **tw-animate-css** | ^1.4.0 | 애니메이션 유틸리티 |
| **autoprefixer** | ^10.4.21 | CSS 벤더 프리픽스 |
| **@types/node** | ^22.14.0 | Node 타입 정의 |
| **tsx** | ^4.21.0 | TypeScript 실행 |

---

## 🎨 디자인 시스템

### shadcn/ui

- **스타일**: New York
- **베이스 컬러**: Neutral
- **아이콘**: Lucide React
- **테마**: CSS 변수 기반 (라이트/다크 지원)

**사용 컴포넌트:**

| 컴포넌트 | 경로 | 용도 |
|----------|------|------|
| Button | `@/components/ui/button` | CTA, 네비게이션 버튼 |
| Card | `@/components/ui/card` | 카드 레이아웃, 후기, 스튜디오 |
| Badge | `@/components/ui/badge` | 태그, 라벨, 에이전트 표시 |

### Tailwind CSS v4

- **설정**: `@tailwindcss/vite` 플러그인 (configless)
- **테마**: `src/index.css` 내 `@theme` 지시어 사용

### Biz.AI 커스텀 테마

```css
/* 주요 색상 토큰 */
--primary        /* 다크 네이비 - 버튼, 헤더, 푸터 */
--primary-foreground
--brand          /* 로즈/레드 - 강조, 섹션 타이틀 */
--brand-foreground
--background     /* 페이지 배경 */
--foreground     /* 본문 텍스트 */
--muted          /* 보조 배경 */
--muted-foreground /* 보조 텍스트 */
--border         /* 테두리 */
--chart-1 ~ 5    /* 차트/아이콘 색상 */
```

### 폰트

- **Sans**: Inter (Google Fonts)
- **Weight**: 400, 500, 600, 700, 800

---

## 📁 프로젝트 구조

```
bizai/
├── components/           # shadcn UI 컴포넌트
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── badge.tsx
├── lib/
│   └── utils.ts          # cn() 등 유틸리티
├── src/
│   ├── App.tsx           # 메인 앱 (랜딩 페이지 전체)
│   ├── main.tsx          # 엔트리포인트
│   ├── index.css         # 글로벌 스타일 + 테마
│   └── components/       # 레거시 컴포넌트 (미사용)
├── components.json       # shadcn 설정
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env.example
```

---

## 🚀 실행 방법

### Prerequisites

- Node.js 18+

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 참고

- 개발 서버 실행 시 `--host=0.0.0.0` 옵션 사용 시 네트워크 인터페이스 오류가 발생할 수 있음
- 이 경우 `npx vite --port=3000` 으로 실행

---

## ⚙️ 환경 변수

| 변수 | 필수 | 설명 |
|------|------|------|
| `GEMINI_API_KEY` | 선택 | Google Gemini API (AI Studio 연동 시) |

`.env.example`을 참고하여 `.env` 또는 `.env.local` 생성

---

## 📑 주요 섹션

| 섹션 | ID | 설명 |
|------|-----|------|
| Navigation | - | 고정 네비게이션, 반응형 메뉴 |
| Hero | - | 메인 비주얼, CTA 버튼 |
| AI 솔루션 | `#solution` | 6개 솔루션 카드 (AI:ON-U, Works AI 등) |
| 도메인별 Multi-Agent | `#domain` | 금융, 공공기관, 일반기업 등 |
| Use Cases | `#use-cases` | Works AI, Audit Agent, 지능형 회의록 |
| 고객 후기 | `#testimonials` | 한국기계산업진흥회, 경기도 |
| Why KT DS | `#why` | Retriever/Analyst, Writer/Executor, 통계 |
| AI Agent 스튜디오 | `#studio` | 4개 카드 (Agent 개발, Core Agent 등) |
| Footer | - | 링크, SNS, 저작권 |

---

## 📄 라이선스

Apache-2.0
# lab0323
