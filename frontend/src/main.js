/* ─────────────────────────────────────────
   FÁBULA — main.js
───────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initStars();
  initHamburger();
  initModal();
  initNavScroll();
  initContact();
});

/* ── Stars ── */
function initStars() {
  const starsEl = document.getElementById('stars');
  if (!starsEl) return;

  for (let i = 0; i < 30; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.cssText = `
      width:${size}px;
      height:${size}px;
      top:${Math.random() * 60}%;
      left:${Math.random() * 100}%;
      --d:${1.5 + Math.random() * 3}s;
      --dl:${Math.random() * 2}s;
    `;
    starsEl.appendChild(s);
  }
}

/* ── Hamburger menu ── */
function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  const links   = mobileNav ? mobileNav.querySelectorAll('a') : [];

  if (!btn || !mobileNav) return;

  function openMenu() {
    btn.classList.add('open');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    btn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    btn.classList.contains('open') ? closeMenu() : openMenu();
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ── Modal ── */
function initModal() {
  const overlay   = document.getElementById('modal');
  const submitBtn = document.getElementById('submit-btn');
  const closeBtn  = document.getElementById('modal-close');

  if (!overlay) return;

  window.showModal = function () {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function () {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (submitBtn) submitBtn.addEventListener('click', window.showModal);
  if (closeBtn)  closeBtn.addEventListener('click', window.closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) window.closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') window.closeModal();
  });
}

/* ── Nav background on scroll ── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(13,11,15,0.97)';
      nav.style.backdropFilter = 'blur(8px)';
    } else {
      nav.style.background = 'linear-gradient(to bottom, rgba(13,11,15,0.95), transparent)';
      nav.style.backdropFilter = '';
    }
  }, { passive: true });
}

/* ── Contact form ── */
function initContact() {
  const btn      = document.getElementById('contact-submit-btn');
  const feedback = document.getElementById('contact-feedback');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const nome     = document.getElementById('c-nome').value.trim();
    const email    = document.getElementById('c-email').value.trim();
    const mensagem = document.getElementById('c-mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      feedback.textContent = 'Preencha todos os campos antes de enviar.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando...';
    feedback.textContent = '';

    try {
      const res = await fetch('http://localhost:5000/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      const data = await res.json();

      if (data.ok) {
        feedback.textContent = '✦ Mensagem enviada! Retornamos em breve.';
        document.getElementById('c-nome').value = '';
        document.getElementById('c-email').value = '';
        document.getElementById('c-mensagem').value = '';
      } else {
        feedback.textContent = 'Algo deu errado. Tente novamente.';
      }
    } catch (err) {
      feedback.textContent = 'Não foi possível conectar ao servidor.';
    }

    btn.disabled = false;
    btn.textContent = 'Enviar mensagem ✦';
  });
}