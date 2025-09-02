# Simple Shoppingmall

> 작성자: 김종한

## 1) 개발환경

### 기술 스택

- Node.js: 22.17.1
- 패키지 매니저: pnpm 10.12.4
- 기술 스택: React 19, TypeScript, Vite(SWC)
- 라우팅: React Router v7
- 서버 상태 관리: TanStack Query(react-query v5)
- 스타일링: Tailwind CSS v4
- 기타 도구: ESLint, Prettier
- 정적 웹 호스팅: AWS S3 + CloudFront, Github Actions(CI/CD)
- 테스팅: Playwright(E2E)

### 프로젝트 구조(FSD 패턴)

FSD(Feature-sliced design) 패턴을 적용하여 유지보수성과 확장성을 향상

- `src/main.tsx`: 진입점
- `src/app/`: 레이아웃, 라우터, 전역 스타일, 프로바이더(QueryClient)
- `src/pages/`: 라우트 단위 페이지 컴포넌트
- `src/widgets/`: 페이지를 구성하는 상위 UI 블록(여러 기능 및 엔티티 조합)
- `src/entities/product/{api,model,ui}`: 도메인 엔티티(타입, 쿼리, 뷰)
- `src/shared/{ui,lib,config}`: 공용 컴포넌트, 유틸리티, 상수
- `tests/e2e`: E2E 테스트 코드

## 2) 개발내용

### 요약

- 리스트 페이지
  - 각 상품 정보가 thumbnail, title, price 표시
  - 상품 데이터를 20개씩 로드
  - 스크롤 기반 lazy load(무한 스크롤)
- 상세 페이지
  - 리스트 페이지의 상품 항목 클릭 시 상세 페이지로 이동
  - thumbnail, title, price, tags 표시
- 공통
  - 로딩 UI: 데이터 로딩 중 스피너 UI 표시
  - 파일(번들) 크기 최소화, 캐싱 최적화
  - 정적 페이지 배포
- 기타
  - E2E 테스트 추가

### 리스트 페이지 구현

- 경로: `/products` (루트 경로(`/`)에서 리다이렉트)
- 컴포넌트: `widgets/products-list/ui/InfiniteProductsList.tsx`
  - `useInfiniteProductsQuery`로 `limit=20`씩 로드, `useInView` 활용하여 스크롤 감지하여 다음 페이지
    자동 요청
  - 최초/추가 로딩 상태에 `Spinner` UI 노출, 에러 시 메시지 노출
  - 더 이상 불러올 데이터가 없을 때 하단에 안내 메시지 노출
  - 상품 리스트 데이터를 useMemo로 메모이제이션하여 리렌더링 유발을 방지
- 카드 UI: `entities/product/ui/ProductCard.tsx`
  - thumbnail, title, price 표시
  - 카드 클릭 시 `/products/{id}`로 이동
  - 썸네일 이미지는 `loading="lazy"` 및 `decoding="async"` 적용하여 브라우저 수준 lazy loading 및 병렬적 DOM 렌더링
  - 리렌더링 방지: React.memo() 활용하여 추가 데이터 로드 시 기존 카드 리렌더링 방지

### 상세 페이지 구현

- 경로: `/products/:id`
  - URL 파라미터 검증하여 Not Found 처리(숫자 외 id 입력 시 `Page Not Found` 알림)
- 컴포넌트: `widgets/product-detail/ui/ProductDetailsSection.tsx`
  - `useProductByIdQuery`로 상세 데이터 로드
  - 로딩 시 `Spinner` UI 노출, 에러 시 메시지 표시
- 상세 UI: `entities/product/ui/ProductDetails.tsx`
  - thumbnail, title, price, tags 표시
  - `React.memo()` 활용하여 props 변경 없는 경우 리렌더링을 방지
- 초기값을 캐싱에서 빠르게 가져오기
  - `QueryClient.getQueriesData()`를 사용하여 상품 리스트 데이터에서 id에 해당하는 값 가져와 초기값으로 활용
  - 이후 백그라운드에서 페칭하여 최신값 렌더링

### 성능 및 최적화

- 네트워크/데이터
  - Axios 인스턴스: `src/shared/lib/http`
    - BaseURL, 타임아웃, JSON 헤더 공통화하여 코드 라인 감소
  - TanStack Query 캐싱
    - `stale time`을 30초 설정하여 동일 데이터 리페칭 최소화
- Code splitting
  - React `lazy()`, `Suspense` 활용
  - 라우트 단위 lazy loading 적용: `src/app/router/index.tsx`
  - Suspense 래핑 및 fallback UI 제공: `src/app/layouts/AppLayout`
- 빌드/캐싱(Vite 기본 프로덕션 최적화)
  - ESBuild 기반 번들링, Tree shaking
  - 콘텐츠 해시 파일명(`.hash.js`)으로 브라우저 장기 캐싱 및 캐시 무효화
  - React SWC 플러그인 적용하여 빠른 트랜스파일링

### 접근성/코드품질

- `Spinner.tsx`에 `role="status"` 및 `aria-label` 지정하여 접근성 개선
- ESLint/Prettier 구성으로 일관된 코드 스타일 유지
  - import 정렬 및 Tailwind 유틸 우선 스타일링
- `tailwind-merge`로 tailwind class 충돌 해소

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

- 빌드: `pnpm build`
- 미리보기: `pnpm preview`
- 산출물: `dist/`

## 4) 정적 페이지 배포

- AWS S3 + CloudFront 활용
- GitHub Actions 활용하여 CI/CD 설정
  - `./github/workflows/deploy.yml`

https://d1th7w7l95v1jv.cloudfront.net

## (기타) E2E 테스트(Playwright)

- Playwright 기반 E2E 테스트를 `tests/e2e/*.spec.ts`에 구성
- Chromium, Firefox, WebKit 3종의 브라우저에서 테스트 실행

### 설치/준비

- Playwright 브라우저 설치: `pnpm exec playwright install` (최초 1회)

### 실행 명령어

- 전체 테스트: `pnpm test:e2e`
- UI 모드(선택 실행/디버깅): `pnpm test:e2e:ui`
- Headed 모드(브라우저 표시): `pnpm test:e2e:headed`
- 특정 파일만 실행: `pnpm exec playwright test tests/e2e/products.spec.ts`

### 테스트 시나리오

- 리스트 페이지: `tests/e2e/products.spec.ts`
  - 각 상품 정보가 thumbnail, title, price 표시
  - 리스트 페이지의 상품 항목 클릭 시 상세 페이지로 이동
  - 데이터를 20개씩 로드
  - 스크롤 기반 lazy load(무한 스크롤)
- 상세 페이지: `tests/e2e/product-detail.spec.ts`
  - thumbnail, title, price, tags 표시
