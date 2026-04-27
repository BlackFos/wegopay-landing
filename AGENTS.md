# 1_사이트 — 모듈 규칙

- Vanilla HTML/CSS/JS만 사용. 외부 프레임워크 금지 (Font Awesome CDN, Pretendard CDN 허용).
- 모든 연락처·브랜드·FAQ·피드 데이터는 `config/site.json`에서 로드. 하드코딩 금지.
- CSS는 5파일 분리 구조. 로드 순서: `variables.css` → `reset.css` → `layout.css` → `components.css` → `sections.css`.
- Custom Properties로 디자인 토큰 관리 (`variables.css` 집중).
- 반응형: 모바일 퍼스트. 브레이크포인트 768px / 1024px.
- 에셋 경로: `assets/logo/`, `assets/hero/`, `assets/icons/`, `assets/cards/`, `assets/titles/`, `assets/badges/`, `assets/guides/`, `assets/reviews/`, `assets/screenshots/`.
- 배포: Vercel 정적 사이트. 이 디렉터리(`1_사이트/`)가 Vercel 루트.
- 로컬 테스트: `npx serve .` 또는 `python -m http.server 8080`
- `assets/` 하위 이미지는 나노바나나 MCP 제작 + 마스터 직접 제공. `에셋_캡쳐_가이드.md` 참조.
