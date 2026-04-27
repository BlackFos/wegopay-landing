---
title: "위고페이 랜딩 사이트"
version: "2.1"
updated: 2026-04-27
status: production
locked_sections:
  - hero (v1.0)
---

# 위고페이 랜딩 사이트

정적 HTML/CSS/JS 기반 싱글 도메인 랜딩 사이트.  
모든 동적 데이터는 `config/site.json` 단일 소스(SSOT)에서 관리.

---

## 디렉터리 구조

```
1_사이트/
├── index.html          ← 메인 랜딩 (히어로 🔒LOCKED)
├── product.html        ← 상품 소개
├── request.html        ← 문의 방법
├── faq.html            ← FAQ
├── review.html         ← 실제 후기
├── config/
│   └── site.json       ← SSOT (브랜드·연락처·FAQ·피드·SEO·디자인 토큰)
├── css/
│   ├── variables.css   ← 디자인 토큰 (컬러, 폰트, 간격)
│   ├── reset.css       ← 브라우저 초기화
│   ├── layout.css      ← 헤더, 푸터, 컨테이너
│   ├── components.css  ← 버튼, 카드, 폰 목업, 채팅 말풍선
│   └── sections.css    ← 페이지별 섹션 (히어로, FAQ, 리뷰 등)
├── js/
│   └── main.js         ← 전체 로직 (site.json 기반)
├── assets/             ← 이미지·아이콘·배지 (별도 README 참고)
├── _archive/           ← 교체된 레거시 파일 보관소
└── AGENTS.md           ← AI 에이전트용 프로젝트 규칙
```

## CSS 로드 순서

HTML `<head>`에서 반드시 아래 순서로 로드해야 합니다:

```
1. variables.css   — 토큰 정의 (다른 파일이 참조)
2. reset.css       — 브라우저 초기화
3. layout.css      — 구조 레이아웃
4. components.css  — 재사용 컴포넌트
5. sections.css    — 페이지별 섹션 스타일
```

> ⚠️ `_archive/css/style.css`는 레거시 파일이며 로드하지 않습니다.

## 🔒 LOCKED 영역

| 영역 | 버전 | 잠금일 | 스냅샷 |
|------|------|--------|--------|
| 히어로 섹션 | v1.0 | 2026-04-27 | `4_운영/snapshots/hero_v1.0_locked.md` |

LOCKED 영역을 수정하려면:
1. 스냅샷 파일에서 현재 코드를 확인
2. 수정 후 반드시 로컬 QA 수행
3. 문제 시 스냅샷에서 롤백

## 데이터 흐름

```
site.json → main.js (loadSiteConfig) → DOM 바인딩
                                        ├── 연락처 링크 (data-cta)
                                        ├── 실시간 피드 (liveFeed)
                                        ├── FAQ 렌더링 (faq)
                                        └── 채팅 애니메이션 (brand.name)
```

## 로컬 실행

```bash
npx -y http-server ./ -p 8080 -c-1
# → http://localhost:8080
```
