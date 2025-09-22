// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Smooth-close mobile nav when a link is clicked
nav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.getComputedStyle(navToggle).display !== 'none') {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Auto-update footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// FAQ: open one at a time (optional)
document.querySelectorAll('.faq-item > summary').forEach(summary => {
  summary.addEventListener('click', event => {
    const current = summary.parentElement;
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== current) item.removeAttribute('open');
    });
  });
});

// Basic client-side email guard for mailto forms (optional)
const contactForm = document.querySelector('form.contact');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const email = contactForm.querySelector('input[type="email"]');
    if (!email || !email.value.includes('@')) {
      e.preventDefault();
      alert('Please enter a valid email address.');
    }
  });
}

// Accessibility: trap focus when mobile nav open (simple)
function trapFocus(container) {
  const focusables = container.querySelectorAll('a, button');
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  function handle(e){
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  container.addEventListener('keydown', handle);
}
if (nav) trapFocus(nav);
