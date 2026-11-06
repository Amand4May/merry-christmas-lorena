(() => {
  'use strict';

  const C = christmasContent;
  const TZ = 'America/Sao_Paulo';
  const STORAGE_KEY = 'lorena-portas-abertas';
  const TYPE_LABEL = { mensagem: 'uma mensagem', memoria: 'uma lembrança', foto: 'uma foto', vale: 'um vale', musica: 'uma música', piada: 'uma piada interna' };

  const $ = (sel) => document.querySelector(sel);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };

  /* ---------- Data / fuso America/Sao_Paulo ---------- */
  // O ?data=AAAA-MM-DD só funciona em desenvolvimento (localhost ou arquivo local).
  const isDev = ['localhost', '127.0.0.1', '[::1]', ''].includes(location.hostname) || location.protocol === 'file:';
  const simulated = (() => {
    if (!isDev) return null;
    const v = new URLSearchParams(location.search).get('data');
    if (!v || !/^\d{4}-\d{2}-\d{2}$/.test(v)) return null;
    const t = Date.parse(`${v}T12:00:00-03:00`);
    return Number.isNaN(t) ? null : { value: v, offset: t - Date.now() };
  })();
  const now = () => Date.now() + (simulated ? simulated.offset : 0);

  const dateFmt = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  function spDate(ms) {
    const parts = Object.fromEntries(dateFmt.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    return { y: +parts.year, m: +parts.month, d: +parts.day };
  }
  const UNLOCK_AT = Date.parse(`${C.ano}-12-01T00:00:00-03:00`);

  // Retorna { locked, day } — day = último dia liberado (0..24)
  function adventState(ms) {
    const { y, m, d } = spDate(ms);
    if (y > C.ano) return { locked: false, day: 24 };
    if (y < C.ano || m < 12) return { locked: true, day: 0 };
    return { locked: false, day: Math.min(d, 24) };
  }

  /* ---------- localStorage (sempre com try/catch) ---------- */
  function readOpened() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(raw) ? raw.filter((n) => Number.isInteger(n) && n >= 1 && n <= 24) : [];
    } catch { return []; }
  }
  function saveOpened(list) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* opcional */ }
  }
  const opened = new Set(readOpened());

  /* ---------- Modal ---------- */
  const modal = $('#modal');
  const modalContent = $('#modal-content');
  let lastFocus = null;

  function showModal({ rotulo, titulo, texto, imagem, link, linkTexto, placeholder }) {
    modalContent.replaceChildren();
    if (imagem) {
      const img = el('img', 'modal-photo');
      img.src = imagem; img.alt = titulo; img.loading = 'lazy';
      modalContent.append(img);
    } else {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('class', 'bow modal-bow');
      svg.setAttribute('aria-hidden', 'true');
      svg.innerHTML = '<use href="#bow"/>';
      modalContent.append(svg);
    }
    const label = el('p', 'eyebrow eyebrow-dark', rotulo);
    const title = el('h3', null, titulo); title.id = 'modal-title';
    modalContent.append(label, title, el('p', 'modal-text', texto));
    if (link) {
      const a = el('a', 'button', `${linkTexto || 'Abrir'} →`);
      a.href = link; a.target = '_blank'; a.rel = 'noopener noreferrer';
      modalContent.append(a);
    }
    if (isDev && placeholder) modalContent.append(el('p', 'dev-tag', 'placeholder — troque em content.js'));
    lastFocus = document.activeElement;
    modal.showModal();
  }
  $('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
  modal.addEventListener('close', () => { if (lastFocus && lastFocus.focus) lastFocus.focus(); });

  /* ---------- 1. Calendário do Advento ---------- */
  const grid = $('#advent-grid');
  const status = $('#advent-status');
  let renderedKey = null;
  let countdownEl = null;

  function openDoor(button, n) {
    const door = C.portas[n - 1];
    if (!opened.has(n)) {
      opened.add(n);
      saveOpened([...opened]);
      button.classList.add('opened', 'just-opened');
    }
    showModal({ rotulo: TYPE_LABEL[door.tipo] || 'um presente', ...door });
  }

  function renderAdvent(state) {
    status.replaceChildren();
    if (state.locked) {
      status.className = 'advent-status is-locked';
      status.append(el('strong', null, 'O calendário está embrulhado.'),
        el('span', null, ' Ele começa a abrir em 1º de dezembro. Falta:'));
      countdownEl = el('div', 'countdown');
      countdownEl.setAttribute('role', 'timer');
      status.append(countdownEl);
      updateCountdown();
    } else {
      countdownEl = null;
      status.className = 'advent-status';
      status.append(el('strong', null, state.day >= 24 ? 'Todas as portas estão abertas.' : `Hoje é dia ${state.day}.`),
        el('span', null, state.day >= 24 ? ' Releia quando quiser.' : ' As portas de hoje e dos dias anteriores estão esperando por você.'));
    }

    grid.replaceChildren();
    C.portas.forEach((_, i) => {
      const n = i + 1;
      const available = !state.locked && n <= state.day;
      const isToday = !state.locked && n === state.day && spDate(now()).y === C.ano && spDate(now()).d <= 24;
      const b = el('button', 'door');
      b.type = 'button'; b.setAttribute('role', 'listitem');
      if (opened.has(n)) b.classList.add('opened');
      if (isToday) b.classList.add('today');
      if (!available) b.classList.add('locked');
      b.setAttribute('aria-disabled', String(!available));
      b.setAttribute('aria-label', available ? `Porta ${n}${opened.has(n) ? ', já aberta' : ''}` : `Porta ${n}, trancada`);
      b.append(el('span', 'door-num', String(n)), el('span', 'door-mark'));
      b.addEventListener('click', () => {
        if (b.classList.contains('locked')) {
          b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake');
          return;
        }
        openDoor(b, n);
      });
      grid.append(b);
    });
  }

  function updateCountdown() {
    if (!countdownEl) return;
    let s = Math.max(0, Math.floor((UNLOCK_AT - now()) / 1000));
    const days = Math.floor(s / 86400); s -= days * 86400;
    const hours = Math.floor(s / 3600); s -= hours * 3600;
    const mins = Math.floor(s / 60); s -= mins * 60;
    const cells = [[days, 'dias'], [hours, 'horas'], [mins, 'min'], [s, 'seg']];
    if (countdownEl.children.length !== 4) {
      countdownEl.replaceChildren(...cells.map(() => { const c = el('div', 'cd-cell'); c.append(el('b'), el('small')); return c; }));
    }
    cells.forEach(([v, label], i) => {
      const c = countdownEl.children[i];
      c.firstChild.textContent = String(v).padStart(2, '0');
      c.lastChild.textContent = label;
    });
  }

  function tick() {
    const state = adventState(now());
    const key = `${state.locked}-${state.day}`;
    if (key !== renderedKey) { renderedKey = key; renderAdvent(state); }
    else updateCountdown();
  }

  if (simulated) {
    const banner = $('#dev-banner');
    banner.hidden = false;
    banner.textContent = `Modo teste: data simulada ${simulated.value}`;
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- 2. Árvore de memórias ---------- */
  const tree = $('#tree');
  const colors = ['#e2a04e', '#d9503f', '#eabf67', '#f3e6d3', '#d9503f', '#e2a04e', '#f3e6d3', '#eabf67'];
  C.memorias.forEach((mem, i) => {
    const b = el('button', 'ornament');
    b.type = 'button';
    b.style.left = `${mem.x}%`; b.style.top = `${mem.y}%`;
    b.style.setProperty('--c', colors[i % colors.length]);
    b.style.setProperty('--d', `${(i % 4) * 0.4}s`);
    b.setAttribute('aria-label', `Memória: ${mem.titulo}`);
    b.addEventListener('click', () => showModal(mem));
    tree.append(b);
  });
  // A carta principal só abre a partir de 24/12 (fuso de São Paulo).
  // Para testar em localhost: ?data=2026-12-24 ou ?carta=aberta
  const letterBypass = isDev && new URLSearchParams(location.search).get('carta') === 'aberta';
  function letterUnlocked() {
    if (letterBypass) return true;
    const { y, m, d } = spDate(now());
    return y > C.ano || (y === C.ano && m === 12 && d >= 24);
  }
  const star = $('#tree-star');
  function updateStar() {
    const locked = !letterUnlocked();
    star.classList.toggle('locked', locked);
    star.setAttribute('aria-label', locked ? 'Carta principal, abre no dia 24 de dezembro' : 'Abrir a carta principal');
  }
  star.addEventListener('click', () => {
    if (letterUnlocked()) { showModal(C.carta); return; }
    showModal({
      rotulo: 'ainda embrulhada',
      titulo: 'Calma, tá quase!',
      texto: 'A carta principal só abre no dia 24 de dezembro. Até lá, aproveite os enfeites e as portinhas do calendário.'
    });
  });
  updateStar();
  setInterval(updateStar, 1000);

  /* ---------- 4. Presente físico: libera no dia 25/12 ---------- */
  // Para testar em localhost: ?data=2026-12-25 ou ?presente=aberto
  const G = C.presenteFisico;
  const giftBypass = isDev && new URLSearchParams(location.search).get('presente') === 'aberto';
  function giftUnlocked() {
    if (giftBypass) return true;
    const { y, m, d } = spDate(now());
    return y > C.ano || (y === C.ano && m === 12 && d >= 25);
  }
  $('#gift-title').textContent = G.titulo;
  $('#gift-intro').textContent = G.abertura;
  $('#gift-letter-title').textContent = G.carta.titulo;
  $('#gift-letter-text').textContent = G.carta.texto;
  $('#gift-gallery').replaceChildren(...G.fotos.map((f) => {
    const fig = el('figure', 'gift-photo');
    if (f.imagem) {
      const img = el('img'); img.src = f.imagem; img.alt = f.legenda; img.loading = 'lazy';
      fig.append(img);
    } else {
      const ph = el('div', 'gift-photo-empty');
      ph.innerHTML = '<svg class="bow" aria-hidden="true"><use href="#bow"/></svg>';
      fig.append(ph);
    }
    fig.append(el('figcaption', null, f.legenda));
    return fig;
  }));
  const giftTag = $('#tag-presente');
  const giftTagSub = $('#tag-presente-sub');
  function updateGift() {
    const locked = !giftUnlocked();
    giftTag.classList.toggle('locked', locked);
    giftTag.setAttribute('aria-disabled', String(locked));
    giftTagSub.textContent = locked ? 'indisponível por aqui · abre no dia 25' : 'já pode abrir';
    $('[data-nav="presente"]').classList.toggle('locked', locked);
  }
  document.querySelectorAll('a[href="#presente"]').forEach((a) => a.addEventListener('click', (e) => {
    if (giftUnlocked()) return;
    e.preventDefault();
    showModal({ rotulo: G.aviso.rotulo, titulo: G.aviso.titulo, texto: G.aviso.texto });
  }));
  updateGift();
  setInterval(updateGift, 1000);

  /* ---------- 3. Lista de desejos ---------- */
  const W = C.desejos;
  $('#wish-lead').textContent = W.abertura;
  $('#wishes-list').replaceChildren(...W.lista.map((t) => el('li', null, t)));
  $('#wish-sign').textContent = W.assinatura;
  if (W.ilustracao) {
    $('#wish-photo').src = W.ilustracao;
    $('#wish-caption').textContent = W.ilustracaoLegenda || '';
    $('#wish-figure').hidden = false;
  }
  if (W.vale) {
    const v = el('div', 'voucher');
    v.append(el('i', 'tape'), el('small', null, 'vale'), el('strong', null, W.vale.titulo), el('p', null, W.vale.texto));
    if (isDev && W.vale.placeholder) v.append(el('span', 'dev-tag', 'placeholder'));
    $('#wish-voucher').append(v);
  }
  $('#footer-year').textContent = `dezembro · ${C.ano}`;

  /* ---------- Menu mobile + aparecer ao rolar ---------- */
  const toggle = $('.menu-toggle');
  const nav = $('#main-nav');
  toggle.addEventListener('click', () => toggle.setAttribute('aria-expanded', String(nav.classList.toggle('is-open'))));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- Telas (menu → seção), por #hash ---------- */
  const views = [...document.querySelectorAll('.view')];
  const navLinks = [...nav.querySelectorAll('a')];
  let currentView = null;
  function route() {
    const id = location.hash.slice(1);
    let key = views.some((v) => v.dataset.view === id) ? id : 'inicio';
    if (key === 'presente' && !giftUnlocked()) key = 'inicio'; // trancado até o dia 25
    views.forEach((v) => { v.hidden = v.dataset.view !== key; });
    navLinks.forEach((a) => (a.dataset.nav === key ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
    document.body.dataset.view = key;
    if (key !== currentView) {
      window.scrollTo(0, 0);
      if (currentView) { const h = document.querySelector(`.view[data-view="${key}"] [tabindex="-1"]`); if (h) h.focus({ preventScroll: true }); }
      currentView = key;
    }
  }
  window.addEventListener('hashchange', route);
  route();
})();
