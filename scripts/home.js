'use strict';

// ── Nav scroll behaviour ───────────────────────────────────────────
const nav = document.getElementById('nav');
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

let mobileMenuOpen = false;

function setNavState() {
  nav.classList.toggle('scrolled', mobileMenuOpen || window.scrollY > 40);
}

function updateNav() {
  setNavState();
}

// ── Mobile menu ──────────────────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('menu-toggle');
  mobileMenuOpen = !mobileMenuOpen;
  menu.classList.toggle('hidden');
  btn.querySelector('.icon-burger').classList.toggle('hidden');
  btn.querySelector('.icon-close').classList.toggle('hidden');
  setNavState();
}

// ── Sign-up modal ────────────────────────────────────────────────────
const signupModal = document.getElementById('signup-modal');

function openSignupModal() {
  signupModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeSignupModal() {
  signupModal.classList.add('hidden');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeSignupModal();
});

// ── Course builder (basic + pedicure add-on) ────────────────────────
const pedicureCheck = document.getElementById('pedicure-check');
if (pedicureCheck) {
  const pedicureBox = document.getElementById('pedicure-box');
  const coursePrice = document.getElementById('course-price');
  const courseDays = document.getElementById('course-days');
  const courseTotalDays = document.getElementById('course-total-days');
  const addonNote = document.getElementById('addon-note');
  const readMore = document.getElementById('read-more');
  const readMoreHint = document.getElementById('read-more-hint');

  function applyPedicure(on) {
    pedicureBox.classList.toggle('checked', on);
    coursePrice.textContent = on ? '950' : '650';
    courseDays.textContent = on ? '30 дни' : '20 дни';
    courseTotalDays.textContent = on ? '30 дни' : '20 дни';
    addonNote.classList.toggle('hidden', !on);
    readMore.setAttribute('href', on ? '/course/basics' : '/course/basic-slim');
    readMoreHint.textContent = on
      ? 'Преглед на пълния курс — маникюр, ноктопластика и педикюр'
      : 'Преглед на основния курс — маникюр и ноктопластика';
  }

  pedicureCheck.addEventListener('change', () => applyPedicure(pedicureCheck.checked));
}

window.addEventListener('scroll', updateNav);
