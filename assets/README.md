---
title: "에셋 디렉터리 가이드"
updated: 2026-04-27
---

# Assets 디렉터리

모든 이미지·아이콘·문서 에셋을 관리합니다.

## 폴더 구조 및 용도

| 폴더 | 용도 | 활성 파일 |
|------|------|-----------|
| `hero/` | 히어로 섹션 배경·목업 | hero-bg-v2.png, hero-phone-mockup.png |
| `cards/` | 서비스 카드 이미지 | service-hero-card-clean.png, intro-card-*.png (4종) |
| `logo/` | 브랜드 로고 변형 | 11개 (수평, 수직, 아이콘, 모노크롬, OG, 푸터 등) |
| `badges/` | 인증 배지 | PG인증, SGI보험, SSL보안, 런칭배지 |
| `icons/` | UI 아이콘 | kakao-icon.svg, credit-card-visual.png |
| `titles/` | 섹션 타이틀 이미지 | hero-title, section-title-* (9종) |
| `guides/` | 앱 이용 가이드 PDF | ⚠️ 현재 비어있음 (site.json에서 참조 중) |
| `giftcards/` | 상품권 이미지 (예정) | — |
| `screenshots/` | 히어로 스냅샷·QA 캡처 | — |
| `reviews/` | 고객 후기 이미지 (예정) | — |

## 네이밍 규칙

```
[카테고리]-[설명]-[버전].확장자

예시:
  hero-bg-v2.png          ← 히어로 배경 버전2
  service-hero-card-clean.png  ← 히어로용 카드 (깔끔 버전)
  intro-card-speed.png    ← 소개 카드: 속도
  wegopay-logo-horizontal.png  ← 수평형 로고
```

- 공백 사용 금지 → 하이픈(`-`) 사용
- 버전이 있을 경우 `-v숫자` 접미사
- PNG 우선, 벡터는 SVG

## 주의사항

- `guides/` 폴더는 `index.html`과 `site.json`에서 PDF 경로를 참조 중  
  → 삭제 금지, 실제 PDF 배치 필요
- 교체된 에셋은 `_archive/assets/YYYY-MM-DD/`로 이동 (삭제하지 않음)
- 상세 에셋 현황은 `에셋_마스터_리스트.md` 참고
