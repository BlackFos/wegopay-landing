/* ============================================
   위고페이 v2.1 — Main JS (site.json SSOT 기반)
   ============================================
   함수 맵:
   - loadSiteConfig()      config/site.json 로드
   - applyContactLinks()   data-cta 속성 → 연락처 바인딩
   - initHeader()          헤더 스크롤 + 모바일 메뉴
   - renderFeedDate()      #feed-date 현재 시간 표시
   - initHeroStats()       [data-target] 카운터 애니메이션
   - animateStatCounter()  개별 숫자 카운트업
   - renderLiveFeed()      #feed-body 거래 피드 렌더
   - startFeedScroll()     피드 자동 순환
   - renderFAQ()           #faq-list FAQ 렌더
   - initAccordions()      .faq__item 아코디언 토글
   - initChatAnimation()   #chat-area 채팅 말풍선 🔒 LOCKED
   - initFloatingBar()     #floating-bar 스크롤 표시
   - initScrollReveal()    .fade-up 요소 등장
   - initReviewSlider()    #reviews-track 슬라이더
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadSiteConfig().then(config => {
    applyContactLinks(config);
    renderFeedDate();
    renderLiveFeed(config);
    renderFAQ(config);
    initAccordions();
    initHeader();
    initHeroStats();
    initFloatingBar();
    initScrollReveal();
    initReviewSlider();
    initChatAnimation(config);
  });
});

/* ─── CONFIG LOADER (SSOT) ───
   fetch: config/site.json
   실패 시: 빈 객체 반환 → 피드/FAQ/CTA 비활성화 */
async function loadSiteConfig() {
  try {
    const res = await fetch('config/site.json');
    if (!res.ok) throw new Error(`site.json load failed: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('[Wegopay] Config load error:', err);
    return {};
  }
}

/* ─── CONTACT LINKS ───
   DOM: [data-cta="kakao"], [data-cta="phone"]
   config: contact.kakao.url, contact.phone */
function applyContactLinks(config) {
  const kakaoUrl = config?.contact?.kakao?.url || '#';
  document.querySelectorAll('[data-cta="kakao"]').forEach(el => {
    el.href = kakaoUrl;
  });
  document.querySelectorAll('[data-cta="phone"]').forEach(el => {
    el.href = `tel:${(config?.contact?.phone || '').replace(/-/g, '')}`;
  });
}

/* ─── HEADER ─── */
function initHeader() {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileNav = document.getElementById('mobile-nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.classList.add('mobile-nav-open');
    });
    menuClose?.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.classList.remove('mobile-nav-open');
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.classList.remove('mobile-nav-open');
      })
    );
  }
}

/* ─── FEED DATE ─── */
function renderFeedDate() {
  const el = document.getElementById('feed-date');
  if (!el) return;
  const now = new Date();
  el.textContent = `${now.getMonth()+1}월 ${now.getDate()}일 ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} 기준 이용자`;
}

/* ─── COUNTER ─── */
function initHeroStats() {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStatCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateStatCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ─── LIVE FEED (site.json 기반) ─── */
function renderLiveFeed(config) {
  const body = document.getElementById('feed-body');
  if (!body) return;

  const feedData = config?.liveFeed || [];
  if (feedData.length === 0) return;

  feedData.forEach(item => {
    const row = document.createElement('div');
    row.className = 'feed__row';
    row.innerHTML = `
      <span class="feed__row-name">${item.name} (신용카드)</span>
      <span class="feed__row-amount">${item.amount.toLocaleString()}원</span>
      <span class="feed__row-status"><span class="feed__status-badge">입금완료</span></span>
    `;
    body.appendChild(row);
  });

  startFeedScroll(body);
}

function startFeedScroll(body) {
  const rows = body.querySelectorAll('.feed__row');
  if (rows.length <= 5) return;
  setInterval(() => {
    const first = body.firstElementChild;
    if (!first) return;
    first.style.transition = 'transform .5s ease, opacity .5s ease';
    first.style.transform = 'translateY(-100%)';
    first.style.opacity = '0';
    setTimeout(() => {
      first.style.transition = 'none';
      first.style.transform = '';
      first.style.opacity = '';
      body.appendChild(first);
    }, 500);
  }, 2500);
}

/* ─── FAQ (site.json 기반) ─── */
function renderFAQ(config) {
  const list = document.getElementById('faq-list');
  if (!list) return;

  const faqData = config?.faq || [];
  // 메인 페이지: 3개만 / faq.html: 전체
  const isMainPage = !document.body.classList.contains('page-faq');
  const items = isMainPage ? faqData.slice(0, 3) : faqData;

  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'faq__item';
    div.innerHTML = `
      <button class="faq__question">
        ${item.q}
        <i class="fas fa-chevron-down"></i>
      </button>
      <div class="faq__answer">
        <div class="faq__answer-inner">${item.a}</div>
      </div>
    `;
    list.appendChild(div);
  });
}

function initAccordions() {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(item => {
    const q = item.querySelector('.faq__question');
    if (q) q.addEventListener('click', () => {
      items.forEach(other => { if (other !== item) other.classList.remove('active'); });
      item.classList.toggle('active');
      const answer = item.querySelector('.faq__answer');
      if (answer) answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + 'px' : '0';
      items.forEach(other => {
        if (other !== item) {
          const otherAnswer = other.querySelector('.faq__answer');
          if (otherAnswer) otherAnswer.style.maxHeight = '0';
        }
      });
    });
  });
}

/* ─── CHAT ANIMATION — 🔒 LOCKED v1.0 ───
   DOM: #chat-area (phone-mockup 내부), #hero (IntersectionObserver)
   config: brand.name
   CSS: .chat-bubble, .chat-typing (components.css) */
function initChatAnimation(config) {
  const chatArea = document.getElementById('chat-area');
  if (!chatArea) return;

  const brandName = config?.brand?.name || '위고페이';
  const messages = [
    { type: 'bot', text: `안녕하세요, ${brandName}입니다!` },
    { type: 'bot', text: '신용카드 현금화 상담을 도와드리겠습니다.' },
    { type: 'user', text: '네, 카드 현금화 문의드려요' },
    { type: 'bot', text: '네! 카드 종류와 희망 금액을 알려주세요.' },
    { type: 'user', text: '삼성카드 200만원이요' },
    { type: 'bot', text: '확인했습니다! 업계 최저 수수료로 안내드릴게요. 바로 진행 도와드리겠습니다.' },
  ];

  let index = 0;

  function showTyping() {
    const typing = document.createElement('div');
    typing.className = 'chat-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chatArea.appendChild(typing);
    chatArea.scrollTop = chatArea.scrollHeight;
    return typing;
  }

  function addMessage() {
    if (index >= messages.length) {
      setTimeout(() => { chatArea.innerHTML = ''; index = 0; addMessage(); }, 3000);
      return;
    }

    const msg = messages[index];
    const delay = msg.type === 'bot' ? 800 : 500;

    if (msg.type === 'bot') {
      const typing = showTyping();
      setTimeout(() => {
        typing.remove();
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble--bot';
        bubble.textContent = msg.text;
        chatArea.appendChild(bubble);
        chatArea.scrollTop = chatArea.scrollHeight;
        index++;
        setTimeout(addMessage, 600);
      }, delay + 400);
    } else {
      setTimeout(() => {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble chat-bubble--user';
        bubble.textContent = msg.text;
        chatArea.appendChild(bubble);
        chatArea.scrollTop = chatArea.scrollHeight;
        index++;
        setTimeout(addMessage, 600);
      }, delay);
    }
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      setTimeout(addMessage, 800);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.3 });

  const hero = document.getElementById('hero');
  if (hero) observer.observe(hero);
}

/* ─── FLOATING BAR ─── */
function initFloatingBar() {
  const bar = document.getElementById('floating-bar');
  const hero = document.getElementById('hero');
  if (!bar) return;
  if (!hero) { bar.classList.add('visible'); return; }

  const observer = new IntersectionObserver(([entry]) => {
    bar.classList.toggle('visible', !entry.isIntersecting);
  }, { threshold: 0 });
  observer.observe(hero);
}

/* ─── SCROLL REVEAL ─── */
function initScrollReveal() {
  const els = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => observer.observe(el));
}

/* ─── REVIEW SLIDER ─── */
function initReviewSlider() {
  const track = document.getElementById('reviews-track');
  if (!track) return;

  const cards = track.children;
  if (cards.length <= 1) return;

  let position = 0;
  const gap = 20;

  function getCardWidth() {
    return cards[0].offsetWidth + gap;
  }

  function slide() {
    position++;
    if (position >= cards.length - 1) position = 0;
    track.style.transform = `translateX(-${position * getCardWidth()}px)`;
  }

  let autoSlide = setInterval(slide, 3500);

  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlide);
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) position = Math.min(position + 1, cards.length - 1);
      else position = Math.max(position - 1, 0);
      track.style.transform = `translateX(-${position * getCardWidth()}px)`;
    }
    autoSlide = setInterval(slide, 3500);
  }, { passive: true });

  window.addEventListener('resize', () => {
    track.style.transform = `translateX(-${position * getCardWidth()}px)`;
  });
}
