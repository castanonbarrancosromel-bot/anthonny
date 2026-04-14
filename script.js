/* ⚡ COMERCIAL QUILLACAS — script v6 · Dana AI */

/* ── CURSOR ── */
const cur = document.getElementById('cursor');
window.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
}, { passive: true });

/* ── SERVICIO TÉCNICO — WhatsApp buttons ── */
document.querySelectorAll('.srv-wa-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const srv = btn.dataset.srv || 'Servicio Técnico';
    const msg = `Hola Comercial Quillacas 👋, quisiera solicitar: *${srv}*. ¿Cuándo puedo asistir? 📍 Cochabamba`;
    window.open(`https://wa.me/59165302585?text=${encodeURIComponent(msg)}`, '_blank');
  });
});

/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

/* ── BURGER ── */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('.nl').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

/* ── ACTIVE NAV ── */
const secs = document.querySelectorAll('section[id]');
const nls = document.querySelectorAll('.nl');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  nls.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${cur}`));
}, { passive: true });

/* ── SMOOTH ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── HERO KPI COUNTER ── */
const kpiEls = document.querySelectorAll('[data-count]');
const kpiObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const end = +el.dataset.count;
    const dur = 1600;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(ease * end);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    kpiObs.unobserve(el);
  });
}, { threshold: 0.6 });
kpiEls.forEach(el => kpiObs.observe(el));

/* ── AUTO SUB-FILTER ── */
const autoTabs = document.querySelectorAll('#autoTabs .stab');
const autoCards = document.querySelectorAll('#autoGrid .pcard');

function filterAuto(cat) {
  autoTabs.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  let i = 0;
  autoCards.forEach(card => {
    const show = card.dataset.auto === cat;
    card.classList.toggle('hidden', !show);
    if (show) {
      card.style.animationDelay = `${i * 55}ms`;
      card.style.animation = 'none';
      requestAnimationFrame(() => { card.style.animation = ''; });
      i++;
    }
  });
}
autoTabs.forEach(b => b.addEventListener('click', () => filterAuto(b.dataset.cat)));
filterAuto('liviano');

/* ── MOTO SUB-FILTER ── */
const motoTabs = document.querySelectorAll('#motoTabs .stab-moto');
const motoCards = document.querySelectorAll('#motoGrid .pcard');

function filterMoto(cat) {
  motoTabs.forEach(b => b.classList.toggle('active', b.dataset.mcat === cat));
  let i = 0;
  motoCards.forEach(card => {
    const show = cat === 'all' || card.dataset.mcat === cat;
    card.classList.toggle('hidden', !show);
    if (show) {
      card.style.animationDelay = `${i * 55}ms`;
      card.style.animation = 'none';
      requestAnimationFrame(() => { card.style.animation = ''; });
      i++;
    }
  });
}
motoTabs.forEach(b => b.addEventListener('click', () => filterMoto(b.dataset.mcat)));
filterMoto('all');

/* ── IMG FADE ── */
document.querySelectorAll('.pcard-img img').forEach(img => {
  img.style.opacity = '0';
  img.style.transition = 'opacity .5s';
  const show = () => { img.style.opacity = '1'; };
  if (img.complete) show(); else img.addEventListener('load', show);
});

/* ── CARD MAGNETIC GLOW ── */
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
    const isMoto = card.classList.contains('pcard-moto');
    const color = isMoto ? 'rgba(168,85,247,0.07)' : 'rgba(240,180,41,0.06)';
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color} 0%, transparent 55%), var(--glass)`;
  });
  card.addEventListener('mouseleave', () => { card.style.background = ''; });
});

/* ══════════════════════════════════
   MODAL — WhatsApp Buy System
══════════════════════════════════ */
const modalBg = document.getElementById('modalBg');
const modalBox = document.getElementById('modalBox');
const modalX = document.getElementById('modalX');
const mImg = document.getElementById('mImg');
const mBadge = document.getElementById('mBadge');
const mModel = document.getElementById('mModel');
const mAh = document.getElementById('mAh');
const mCca = document.getElementById('mCca');
const mWa = document.getElementById('mWa');
const mModelName = document.getElementById('mModelName');

const badgeCfg = {
  liviano: { text: '🚗 Liviano', bg: 'rgba(34,211,238,.15)', color: '#22d3ee', border: '1px solid rgba(34,211,238,.3)' },
  suv: { text: '🚙 Camioneta', bg: 'rgba(16,185,129,.15)', color: '#34d399', border: '1px solid rgba(16,185,129,.3)' },
  pesado: { text: '🚛 Pesado', bg: 'rgba(244,63,94,.15)', color: '#fb7185', border: '1px solid rgba(244,63,94,.3)' },
  agm: { text: '🔩 AGM/Diésel', bg: 'rgba(34,211,238,.12)', color: '#67e8f9', border: '1px solid rgba(34,211,238,.25)' },
  premium: { text: '⭐ Premium', bg: 'rgba(168,85,247,.15)', color: '#c084fc', border: '1px solid rgba(168,85,247,.3)' },
  moto: { text: '🏍 Moto', bg: 'rgba(168,85,247,.18)', color: '#d8b4fe', border: '1px solid rgba(168,85,247,.35)' },
};

function openModal(card) {
  const model = card.dataset.model;
  const brand = card.dataset.brand || '';
  const ah = card.dataset.ah || '—';
  const cca = card.dataset.cca || '—';
  const img = card.dataset.img || '';
  const autoC = card.dataset.auto || 'moto';
  const isMoto = card.classList.contains('pcard-moto');
  const cat = isMoto ? 'moto' : autoC;

  mImg.src = img;
  mImg.alt = model;

  const cfg = badgeCfg[cat] || badgeCfg.liviano;
  mBadge.textContent = cfg.text;
  Object.assign(mBadge.style, { background: cfg.bg, color: cfg.color, border: cfg.border });

  mModel.textContent = model;
  mModelName.textContent = model;

  mAh.innerHTML = `<small>Capacidad</small><strong>${ah}</strong>`;
  mCca.innerHTML = `<small>CCA / Tecnología</small><strong>${cca}</strong>`;

  const waText = `Hola Comercial Quillacas 👋, quiero saber el precio de la batería *${model}* (marca ${brand}, ${ah}). ¿Me puede cotizar?`;
  mWa.href = `https://wa.me/59165302585?text=${encodeURIComponent(waText)}`;

  modalBg.classList.add('open');
  modalBg.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalBg.classList.remove('open');
  modalBg.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.pcard-buy').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    openModal(btn.closest('.pcard'));
  });
});

document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('click', () => openModal(card));
});

modalX?.addEventListener('click', closeModal);
modalBg?.addEventListener('click', e => { if (e.target === modalBg) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── SCROLL REVEAL ── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.ci, .sec-head, .contact-box').forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${Math.min(i * 60, 350)}ms`;
  revObs.observe(el);
});

/* ── CONTACT FORM ── */
const cform = document.getElementById('cform');
const formOk = document.getElementById('formOk');
const formBtn = document.getElementById('formBtn');

cform?.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  if (!name) {
    const inp = document.getElementById('f-name');
    inp.style.borderColor = 'rgba(244,63,94,.6)';
    inp.style.boxShadow = '0 0 0 3px rgba(244,63,94,.1)';
    inp.focus();
    setTimeout(() => { inp.style.borderColor = ''; inp.style.boxShadow = ''; }, 2200);
    return;
  }
  const tel = document.getElementById('f-tel').value.trim();
  const veh = document.getElementById('f-veh').value;
  const msg = document.getElementById('f-msg').value.trim();

  let wa = `Hola, soy ${name}.`;
  if (tel) wa += ` Tel: ${tel}.`;
  if (veh) wa += ` Tengo un ${veh}.`;
  if (msg) wa += ` Consulta: ${msg}`;
  wa += ' (Catálogo web)';

  formBtn.textContent = 'Enviando…';
  formBtn.disabled = true;

  setTimeout(() => {
    formBtn.innerHTML = 'Enviar por WhatsApp →';
    formBtn.disabled = false;
    formOk.style.display = 'block';
    cform.reset();
    setTimeout(() => window.open(`https://wa.me/59165302585?text=${encodeURIComponent(wa)}`, '_blank'), 700);
  }, 1100);
});

console.log('%c⚡ COMERCIAL QUILLACAS', 'color:#f0b429;font-size:22px;font-weight:900;letter-spacing:3px;');
console.log('%cBaterías Auto & Moto · Cochabamba, Bolivia · 📞 65302585', 'color:#6b85a8;font-size:13px;');

/* ══════════════════════════════════
   DANA IA — CHAT WIDGET ✨
══════════════════════════════════ */
(function () {
  const fab = document.getElementById('chatFab');
  const panel = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const messages = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const badge = document.getElementById('chatBadge');
  const quickArea = document.getElementById('chatQuick');

  let chatOpen = false;
  let typing = null;

  /* ── DRAG ── */
  let isDragging = false;
  let dragMoved = false;
  let dragStartX, dragStartY, fabStartLeft, fabStartTop;

  /* ── PANEL POSITION (relative to FAB) ── */
  function positionPanel() {
    const rect = fab.getBoundingClientRect();
    const pw = Math.min(370, window.innerWidth - 16);
    const ph = Math.min(580, window.innerHeight - 100);
    const gap = 14;
    let left = rect.left + rect.width / 2 - pw / 2;
    left = Math.max(8, Math.min(window.innerWidth - pw - 8, left));
    let top = rect.top - ph - gap;
    if (top < 8) top = rect.bottom + gap;
    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
  }

  /* ── OPEN / CLOSE ── */
  function openChat() {
    chatOpen = true;
    positionPanel();
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.querySelector('.chat-icon-open').style.display = 'none';
    fab.querySelector('.chat-icon-close').style.display = 'flex';
    badge.classList.add('hidden');
    setTimeout(() => { messages.scrollTop = messages.scrollHeight; }, 50);
    input.focus();
  }

  function closeChat() {
    chatOpen = false;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.querySelector('.chat-icon-open').style.display = 'flex';
    fab.querySelector('.chat-icon-close').style.display = 'none';
  }

  /* ── DRAG HANDLERS ── */
  function onDragStart(e) {
    isDragging = true;
    dragMoved = false;
    const pt = e.touches ? e.touches[0] : e;
    dragStartX = pt.clientX;
    dragStartY = pt.clientY;
    const rect = fab.getBoundingClientRect();
    fabStartLeft = rect.left;
    fabStartTop = rect.top;
    fab.style.transition = 'box-shadow .2s ease';
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('mouseup', onDragEnd);
    document.addEventListener('touchend', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    if (e.cancelable) e.preventDefault();
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - dragStartX;
    const dy = pt.clientY - dragStartY;
    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dragMoved = true;
    if (!dragMoved) return;
    let newLeft = Math.max(0, Math.min(window.innerWidth - 60, fabStartLeft + dx));
    let newTop = Math.max(0, Math.min(window.innerHeight - 60, fabStartTop + dy));
    fab.style.left = newLeft + 'px';
    fab.style.top = newTop + 'px';
    fab.style.right = 'auto';
    fab.style.bottom = 'auto';
    if (chatOpen) positionPanel();
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    fab.style.transition = '';
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    document.removeEventListener('touchend', onDragEnd);
    if (dragMoved && chatOpen) positionPanel();
  }

  fab.addEventListener('click', () => {
    if (dragMoved) { dragMoved = false; return; }
    chatOpen ? closeChat() : openChat();
  });
  fab.addEventListener('mousedown', onDragStart);
  fab.addEventListener('touchstart', onDragStart, { passive: true });
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && chatOpen) closeChat(); });

  /* ── TIME ── */
  function timeNow() {
    const d = new Date();
    return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
  }

  /* ── ADD MESSAGE ── */
  function addMsg(who, html) {
    const wrap = document.createElement('div');
    wrap.className = `chat-msg ${who}`;
    const av = document.createElement('div');
    av.className = 'chat-msg-avatar';
    av.textContent = who === 'bot' ? '✨' : '👤';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = html + `<span class="chat-time">${timeNow()}</span>`;
    wrap.appendChild(av);
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  /* ── TYPING DOTS ── */
  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-typing chat-msg bot';
    wrap.innerHTML = `
      <div class="chat-msg-avatar">✨</div>
      <div class="chat-bubble">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>`;
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
    return wrap;
  }

  /* ── BOT REPLY (delayed, for fallback) ── */
  function botReply(html, delay = 900) {
    const t = showTyping();
    return new Promise(res => {
      typing = setTimeout(() => {
        t.remove();
        addMsg('bot', html);
        res();
      }, delay);
    });
  }

  /* ════════════════════════════════════════
     DANA IA — GEMINI API
     Clave gratis: https://aistudio.google.com/app/apikey
  ════════════════════════════════════════ */
  const GEMINI_KEY = 'AIzaSyC5fFhd-kslMrGCFxixaS7Sl3pAyNBi2to';

  const DANA_SYSTEM = `Eres Dana, una asesora de ventas experta y muy amigable de "Comercial Quillacas", una tienda especializada en baterías para autos y motos ubicada en Cochabamba, Bolivia.

TU PERSONALIDAD:
- Eres cálida, expresiva y profesional como vendedora boliviana de confianza
- Hablas en español boliviano casual, tratas al cliente de "tú"
- Usas emojis con moderación para ser más expresiva y cercana
- Haces UNA pregunta de seguimiento cuando necesitas más información del cliente
- Eres honesta: si no sabes algo exacto, lo dices sin inventar
- Cuando el cliente quiere comprar, lo invitas al WhatsApp 65302585
- Tus respuestas son detalladas y amplias, brindando toda la información de manera completa y amable.
- NUNCA inventas precios exactos en bolivianos — los precios se consultan por WhatsApp
- Si el cliente dice que su batería no arranca o está fallando, reacciona con empatía primero
- Recuerda lo que el cliente ha dicho antes en la conversación para dar respuestas coherentes

CATÁLOGO COMPLETO:

🚗 BATERÍAS AUTO — LIVIANOS:
• NS40ZL FBC: 35-40Ah, 350 CCA — compactos hasta 1.3L
• NS60L FBC: 45-55Ah, 450 CCA — sedanes 1.4-2.0L ⭐ MÁS VENDIDA
• NS50L TOYO: 50-55Ah, 470 CCA — start-stop modernos (NUEVA)
• B145 Energetic: 45-50Ah, 420 CCA — importados asiáticos
• AUTOBAT 55: 55Ah, 500 CCA — económica urbana

🚙 SUV / CAMIONETA:
• NS70L FBC: 70-75Ah, 600 CCA — 2.4L+ japonesas
• BT54 TOYO: 55-60Ah, 500 CCA — camionetas con mucho equipo eléctrico
• BT70 Energetic: 70-75Ah, 620 CCA — alta durabilidad
• 80D31R VOLTA: 75-80Ah, 700 CCA — diésel y 4x4
• NS80D26L Panasonic: 70-80Ah, 680 CCA — Hilux/Land Cruiser Prado, 24m garantía (NUEVA)

🚛 PESADOS:
• N100 FBC: 100Ah, 850 CCA — microbuses, camiones ligeros
• N120 Energetic: 120Ah, 950 CCA — buses, camiones de carga
• N150 VOLTA: 150Ah, 1100 CCA — flotas interdepartamentales
• N200 FBC: 200Ah, 1400 CCA — tractocamiones y maquinaria ⚡ EL MÁS POTENTE

🔩 AGM / DIÉSEL HD:
• AGM 70D VOLTA: 70Ah, 720 CCA — start-stop, BMW/Mercedes/VW, sin derrame
• HD Diesel 120 TOYO: 120Ah, 1000 CCA — minería y flota pesada

⭐ PREMIUM:
• Silver Plus VOLTA: placas de plata, anti-calor, anti-vibración, 24m
• Panasonic N200: 200Ah, tecnología japonesa, 36m garantía 🏆

🏍 MOTOS:
• Scooter 50-125cc: MF5L-BS FBC (5Ah), MF6L-BS Energetic (6Ah)
• Naked/Urbana 110-250cc: MF7L-BS FBC (7Ah), MF9-BS Energetic (9Ah), MF10-BS AUTOBAT (10Ah)
• Sport 250-750cc: MF12-BS AUTOBAT (12Ah/185CCA), YTX12-BS FBC (10Ah/180CCA), YTX14-BS Energetic (12Ah/200CCA)
• Enduro/Trail: MF7B-4 FBC (7Ah), YTX9-BS AUTOBAT (8Ah), YTZ10S Energetic (8.6Ah/190CCA)
• Touring/Big 1000cc+: YTX20L-BS FBC (18Ah/270CCA), BTX14-BS AUTOBAT (12Ah/230CCA), BTX16-BS Energetic (14Ah/250CCA)

MARCAS: FBC (japonesa, más vendida), TOYO (AGM), VOLTA (4x4/diésel), Energetic (calidad/precio), AUTOBAT (económica), Panasonic (premium)

GARANTÍAS: 6m motos básicas | 12m livianos/pesados estándar | 18m SUV y AGM | 24m premium/AGM alta gama | 36m Panasonic Top Tier

SERVICIOS TÉCNICOS:
• Diagnóstico: GRATIS
• Carga y recuperación: desde Bs. 30
• Reparación de celdas: desde Bs. 80
• Mantenimiento preventivo flota: Bs. 150/mes
• Reposición electrolito: desde Bs. 20
• Instalación: GRATIS con compra

CONTACTO: WhatsApp/Tel 65302585 | Cochabamba, Bolivia | Lun-Sáb 8:00-18:00

REGLAS IMPORTANTES:
1. Responde SIEMPRE en español
2. Nunca digas precios exactos en Bs — deriva al WhatsApp para cotizar
3. Si el cliente pregunta por un vehículo específico, recomienda el modelo más adecuado
4. Al final de cada respuesta, haz UNA acción concreta: recomendar producto, sugerir WhatsApp, o hacer una pregunta clave
5. Si el cliente usa groserías o temas fuera de tema, redirige amablemente a las baterías`;

  /* Historial para contexto conversacional */
  let chatHistory = [];

  /* ── LLAMADA A GEMINI API ── */
  async function callGemini(userText) {
    chatHistory.push({ role: 'user', parts: [{ text: userText }] });
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: DANA_SYSTEM }] },
          contents: chatHistory,
          generationConfig: { temperature: 0.85, maxOutputTokens: 800, topP: 0.92 }
        })
      }
    );
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    if (!reply) throw new Error('Respuesta vacía');
    chatHistory.push({ role: 'model', parts: [{ text: reply }] });
    if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
    return reply;
  }

  /* ── FALLBACK KB (sin API o error de red) ── */
  function fallbackReply(text) {
    const t = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, ' ');
    const has = (...words) => words.some(w => t.includes(w));

    if (has('precio', 'costo', 'cuanto', 'valor', 'cotiz', 'barata'))
      return 'Los precios los manejo por WhatsApp para darte el mejor trato 😊<br>Escríbeme el modelo de tu vehículo y te cotizo al instante ⚡<br><a href="https://wa.me/59165302585?text=Hola%2C%20quisiera%20una%20cotizaci%C3%B3n." target="_blank" class="chat-wa-link">📲 Cotizar por WhatsApp</a>';

    if (has('garantia', 'meses', 'dura', 'vida'))
      return '¡Todas vienen con garantía escrita! 🛡<br>Van de 6 meses (motos) hasta 36 meses (Panasonic Premium).<br>¿Para qué tipo de vehículo buscas la batería?';

    if (has('ubicacion', 'donde', 'direccion', 'cochabamba', 'visitar', 'horario', 'hora', 'abierto'))
      return 'Estamos en <b>Cochabamba, Bolivia</b> 📍<br>Atendemos <b>Lun–Sáb de 8:00 a 18:00</b>.<br>Para la dirección exacta escríbeme por WhatsApp 😊<br><a href="https://wa.me/59165302585" target="_blank" class="chat-wa-link">📲 65302585</a>';

    if (has('servicio', 'tecnico', 'reparacion', 'diagnostico', 'carga', 'mantenimiento', 'instalacion'))
      return 'Ofrecemos servicio técnico completo 🔧<br>• Diagnóstico: <b>GRATIS</b><br>• Carga/recuperación: desde <b>Bs. 30</b><br>• Reparación: desde <b>Bs. 80</b><br>• Instalación: <b>GRATIS</b> con compra';

    if (has('moto', 'scooter', 'honda', 'yamaha', 'kawasaki', 'ktm', 'enduro', 'sport', 'naked'))
      return '¡Claro, tenemos 14 modelos para moto! 🏍<br>Cuéntame: ¿cuántos cc tiene tu moto y de qué marca es?';

    if (has('hilux', '4x4', 'suv', 'camioneta', 'prado', 'fortuner', 'land', 'pajero'))
      return 'Para camionetas y 4x4 tenemos excelentes opciones 🚙<br>La <b>NS80D26L Panasonic</b> es ideal para Hilux y Prado con 24 meses de garantía.<br>¿Me dices el modelo exacto?';

    if (has('camion', 'bus', 'pesado', 'flota', 'tractocamion', 'maquinaria'))
      return 'Para vehículos pesados tenemos desde 100Ah hasta 200Ah 🚛<br>El <b>N200 FBC</b> es el más potente: 200Ah y 1400 CCA.<br>¿Cuántos vehículos tiene tu flota?';

    if (has('marca', 'fbc', 'toyo', 'volta', 'energetic', 'autobat', 'panasonic'))
      return 'Manejamos 6 marcas líderes 🏷<br>FBC, TOYO, VOLTA, Energetic, AUTOBAT y Panasonic.<br>¿Tienes alguna preferencia o te ayudo a elegir según tu vehículo?';

    if (has('hola', 'buenos', 'buenas', 'hey', 'saludos', 'buen dia'))
      return '¡Hola! 👋 Soy Dana, asesora de Comercial Quillacas ✨<br>¿Para qué tipo de vehículo buscas tu batería?';

    if (has('gracias', 'ok', 'perfecto', 'genial', 'listo', 'chevere'))
      return '¡Con gusto! 🙌 Aquí estoy para lo que necesites.<br><a href="https://wa.me/59165302585" target="_blank" class="chat-wa-link">📲 65302585</a>';

    if (has('whatsapp', 'llamar', 'telefono', 'contacto', 'numero'))
      return '📱 WhatsApp: <b><a href="tel:+59165302585">65302585</a></b><br>📍 Cochabamba, Bolivia | Lun–Sáb 8:00–18:00<br><a href="https://wa.me/59165302585" target="_blank" class="chat-wa-link">📲 Abrir WhatsApp</a>';

    return 'Mmm, déjame ver si te entiendo bien 🤔<br>¿Me podrías contar más? ¿Qué marca y modelo de vehículo tienes?<br><a href="https://wa.me/59165302585?text=' + encodeURIComponent('Hola, tengo esta consulta: ' + text) + '" target="_blank" class="chat-wa-link">📲 Escribir a WhatsApp</a>';
  }

  /* ── QUICK REPLIES MAP ── */
  const quickMap = {
    precios: 'precios y cotización',
    marcas: 'Qué marcas de baterías tienen?',
    garantia: 'Cuánto tiempo de garantía tienen las baterías?',
    ubicacion: 'Dónde están ubicados y cuál es el horario?',
    servicio: 'Qué servicios técnicos ofrecen?',
    whatsapp: 'Cómo los contacto por WhatsApp?'
  };

  /* ── HANDLE MESSAGE ── */
  async function handleMessage(text) {
    if (!text.trim()) return;
    addMsg('user', text);
    input.value = '';
    quickArea.style.display = 'none';

    const useAI = GEMINI_KEY && GEMINI_KEY.length > 15 && GEMINI_KEY !== 'TU_API_KEY_AQUI';

    if (useAI) {
      const typingEl = showTyping();
      try {
        const aiText = await callGemini(text);
        typingEl.remove();
        const html = aiText.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
        addMsg('bot', html);
      } catch (err) {
        typingEl.remove();
        console.warn('Dana AI fallback:', err.message);
        addMsg('bot', fallbackReply(text));
      }
    } else {
      await botReply(fallbackReply(text), 800);
    }
  }

  /* ── FORM SUBMIT ── */
  form.addEventListener('submit', e => {
    e.preventDefault();
    handleMessage(input.value.trim());
  });

  /* ── QUICK REPLY BUTTONS ── */
  quickArea.querySelectorAll('.cq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      handleMessage(quickMap[btn.dataset.q] || btn.textContent);
    });
  });

  /* ── WELCOME MESSAGE (primera vez que abre) ── */
  let welcomed = false;
  fab.addEventListener('click', () => {
    if (!welcomed && chatOpen) {
      welcomed = true;
      setTimeout(() => {
        const useAI = GEMINI_KEY && GEMINI_KEY.length > 15 && GEMINI_KEY !== 'TU_API_KEY_AQUI';
        if (useAI) {
          const t = showTyping();
          callGemini('Saluda al cliente de forma amigable y pregúntale en qué puedes ayudarle (máximo 3 líneas).')
            .then(reply => {
              t.remove();
              addMsg('bot', reply.replace(/\n/g, '<br>'));
            })
            .catch(() => {
              t.remove();
              addMsg('bot', '¡Hola! 👋 Soy <b>Dana</b>, tu asesora de Comercial Quillacas ✨<br>¿Para qué tipo de vehículo estás buscando una batería?');
            });
        } else {
          botReply('¡Hola! 👋 Soy <b>Dana</b>, tu asesora de Comercial Quillacas ✨<br>¿Para qué tipo de vehículo estás buscando una batería?', 600);
        }
      }, 200);
    }
  });

})(); // end IIFE