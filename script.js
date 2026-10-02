const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  nav.classList.remove('open');
}));
document.getElementById('year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'));
      entry.target.style.transitionDelay = `${Math.max(0, siblings.indexOf(entry.target)) * 65}ms`;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('visible'));

document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  const select = document.getElementById('property');
  const value = link.dataset.service;
  const option = [...select.options].find(item => item.textContent.trim() === value);
  if (option) select.value = option.value;
}));
document.querySelectorAll('[data-package]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('property').value = link.dataset.package;
}));

document.getElementById('quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    'Hi Solar On, I would like to ask about a solar solution.',
    '',
    `Name: ${data.get('name')}`,
    data.get('phone') ? `Phone: ${data.get('phone')}` : '',
    `Enquiry: ${data.get('property')}`,
    data.get('message') ? `Details: ${data.get('message')}` : ''
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/27647579437?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});
