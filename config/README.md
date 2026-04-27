---
title: "Config 디렉터리 가이드"
updated: 2026-04-27
---

# Config 디렉터리

## SSOT (Single Source of Truth)

`site.json`은 사이트 전체의 **유일한 데이터 소스**입니다.  
HTML을 직접 수정하지 않고 이 파일만 변경하면 전체 사이트에 반영됩니다.

## site.json 필드 구조

| 필드 | 용도 | 변경 빈도 |
|------|------|-----------|
| `brand` | 브랜드명, 도메인, 슬로건, 설명 | 거의 없음 |
| `contact` | 전화번호, 카카오 오픈채팅 URL, 텔레그램 | 가끔 |
| `app` | Android/iOS 스토어 URL, 가이드 PDF 경로 | 가끔 |
| `services` | 서비스 목록 (현재 1개: 신용카드 현금화) | 거의 없음 |
| `stats` | 히어로 통계 (년도, 이용자수, 평균시간) | 가끔 |
| `liveFeed` | 실시간 거래 피드 데이터 (이름, 금액) | 자주 |
| `faq` | FAQ 질문/답변 배열 | 가끔 |
| `seo` | 메타 타이틀, 디스크립션, 키워드 | 가끔 |
| `design` | 디자인 톤, 컬러 값, 폰트 | 거의 없음 |
| `company` | 법적 고지, 수수료 안내 | 거의 없음 |
| `disclaimer` | 면책 조항 | 거의 없음 |

## JS에서의 사용

```javascript
// main.js
const config = await loadSiteConfig();  // fetch('config/site.json')
applyContactLinks(config);              // data-cta 바인딩
renderLiveFeed(config);                 // liveFeed 배열
renderFAQ(config);                      // faq 배열
initChatAnimation(config);              // brand.name
```

## 수정 시 주의

- JSON 문법 오류 시 **사이트 전체가 깨집니다** (FAQ, 피드, CTA 모두 비활성화)
- 수정 후 반드시 브라우저 콘솔에서 `[Wegopay] Config load error` 메시지 없는지 확인
- `contact.kakao.url` 변경 시 모든 CTA 버튼에 즉시 반영됨
