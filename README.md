# Simple Shoppingmall

## 1) 개발환경

### 기술 스택

- Node.js: 22.17.1
- 패키지 매니저: pnpm 10.12.4
- 기술 스택: React 19, TypeScript, Vite(SWC)
- 라우팅: React Router v7
- 서버 상태 관리: TanStack Query(react-query v5)
- 스타일링: Tailwind CSS v4
- 기타 도구: ESLint + Prettier(정렬/정적 분석)

### 프로젝트 구조(FSD 패턴)

- `src/app/`: 레이아웃, 라우터, 전역 스타일, 프로바이더
- `src/pages/`: 라우트 엔트리 컴포넌트(Products, ProductDetail 등)
- `src/entities/product/{api,model,ui}`: 도메인 엔티티(타입/쿼리/뷰)
- `src/widgets/`: 페이지 섹션 단위 UI(예: 무한 상품 리스트, 상세 섹션)
- `src/shared/{ui,lib,config}`: 공용 UI/라이브러리/설정
- 진입점: `src/main.tsx`

### API 설정

- Base URL: `src/shared/config/index.ts` → `API_BASE_URL = https://dummyjson.com`
- 엔드포인트: `API_ENDPOINT.PRODUCTS = /products`
- 기본 페이지 크기: `API_GET_LIMIT = 20`

## 2) 개발내용

### 요구사항 반영 요약

- 리스트 페이지: thumbnail, title, price 표시, 20개씩 로드, 스크롤 기반 lazy load(무한 스크롤)
- 상세 페이지: 리스트에서 상품 클릭 시 이동, thumbnail, title, price, tags 표시
- 로딩 UX/UI: 데이터 로딩 중 스피너 UI 표시

### 라우팅

- 경로: `/products`(리스트), `/products/:id`(상세)
- 구현: `src/app/router/index.tsx`
  - 인덱스는 `/products`로 리다이렉트
  - 잘못된 경로는 `NotFound` 처리

### 데이터 계층(entities/product)

- 타입: `model/types.ts` → `Product`, `ProductsResponse`
- API: `api/queries.ts` → Axios 클라이언트로 dummyjson 호출(AbortSignal 지원)
- 쿼리 훅: `model/queries.ts`
  - `useInfiniteProductsQuery({ limit })`: 무한 스크롤(페이지 파라미터 `skip` 계산)
  - `useProductByIdQuery(id)`: 단건 상세 조회
- 캐싱: TanStack Query 옵션 활용(`staleTime=30s`)

### 리스트 페이지 구현

- 컴포넌트: `widgets/products-list/ui/InfiniteProductsList.tsx`
  - `useInfiniteProductsQuery`로 `limit=20`씩 로드, `useInView` 활용하여 스크롤 감지하여 다음 페이지 자동 요청
  - 초기/추가 로딩 상태에서 `Spinner` 노출, 에러 시 알림 메시지 노출
  - 하단에 더 이상 데이터가 없을 때 안내 메시지 노출
- 카드 UI: `entities/product/ui/ProductCard.tsx`
  - 썸네일, 제목, 가격 표시 및 카드 클릭 시 `/products/{id}`로 이동
  - 썸네일 이미지는 `loading="lazy"` 및 `decoding="async"` 적용하여 브라우저 수준 lazy loading 및 병렬적 DOM 렌더링

### 상세 페이지 구현

- 엔트리: `pages/ProductDetail.tsx` → URL 파라미터 검증(숫자 외 `NotFound`)
- 섹션: `widgets/product-detail/ui/ProductDetailsSection.tsx`
  - `useProductByIdQuery`로 상세 데이터 로드
  - 로딩/에러 처리 시 `Spinner` 또는 메시지 표시
  - `entities/product/ui/ProductDetails.tsx`로 썸네일/제목/가격/태그 출력

### 성능 및 최적화

- 네트워크/데이터
  - Axios 인스턴스: `src/shared/lib/http`, BaseURL/타임아웃/JSON 헤더 공통화
  - AbortSignal로 취소 가능(빠른 라우팅 전환 시 낭비 최소화)
  - TanStack Query 캐시로 동일 데이터 재요청 최소화
- 렌더링/이미지
  - 이미지 `loading="lazy"`, 필요한 시점에만 로드
  - 작은 컴포넌트로 분리해 재사용성/가독성 향상
- 빌드/캐싱(Vite 기본 프로덕션 최적화)
  - ESBuild 기반 압축/트리쉐이킹/코드 분할
  - 콘텐츠 해시 파일명(`.hash.js`)으로 브라우저 장기 캐싱 및 캐시 무효화
  - React SWC 플러그인으로 빠른 개발/빌드 사이클 유지

### 접근성/품질

- 스피너에 `role="status"`/`aria-label` 지정
- ESLint/Prettier 구성으로 일관된 코드 스타일 유지
- import 정렬 및 Tailwind 유틸 우선 스타일링, `tailwind-merge`로 충돌 해소

### 에지 케이스 처리

- 잘못된 상품 ID: 숫자 검증 후 미일치 시 `NotFound`
- API 오류: 리스트/상세 모두 에러 안내 메시지 제공

## 3) 빌드 및 실행방법

### 사전 요구사항

- Node.js `>=22.17.1 <23`
- pnpm 설치(루트의 `pnpm-lock.yaml` 사용 권장)

### 설치

- 의존성 설치: `pnpm install`

### 개발 서버

- 실행: `pnpm dev`
- 기본 주소: `http://localhost:5173` (Vite 기본 포트)

### 프로덕션 빌드

- 빌드: `pnpm build` (TypeScript 빌드 + Vite 번들)
- 미리보기: `pnpm preview`
- 산출물: `dist/` (압축/코드분할/해시 파일명으로 캐싱 최적화)

## 평가 항목 대응

- 프로젝트 구성: FSD 레이어(app/pages/entities/widgets/shared)로 모듈화, 타입/쿼리/UI 분리
- 요구사항 이해: 리스트(20개씩, thumbnail/title/price, 무한 스크롤)와 상세(thumbnail/title/price/tags, 클릭 이동) 구현
- 기능 구현 정확도: 라우팅/파라미터 검증/로딩 스피너/에러 처리/이미지 지연 로딩 반영
- 코드 구조 및 명료성: domain-first로 책임 분리, 재사용 가능한 UI 컴포넌트(Card/Badge/Spinner 등) 구성
- 기술 선택 및 설명 문서: React + Vite + TanStack Query + Tailwind 선택 이유와 설정을 본 문서에 기술, Vite 빌드 최적화로 파일 크기/캐싱 대응
