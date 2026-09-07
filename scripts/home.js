'use strict';

// ── Helpers ──────────────────────────────────────────────────────────
/** Check whether *el* is fully inside the viewport (getBoundingClientRect). */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/** Fire a callback whenever *el*'s viewport visibility changes. */
function onVisibilityChange(el, callback) {
  let oldVisible;
  return function() {
    const visible = isElementInViewport(el);
    if (visible !== oldVisible) {
      oldVisible = visible;
      if (typeof callback === 'function') callback(visible);
    }
  };
}

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

// ── Hand animation ───────────────────────────────────────────────────
const options = {
  threshold: [0.75] // Trigger when 75% of the element is visible
};
const handOpen = document.getElementById('hand-open');
const handClosed = document.getElementById('hand-closed');
const handContainer = document.getElementById('hand-container');
const aboutInstructor = document.getElementById('about-instructor');

function onEntry(entries) {
  entries.forEach((entry) => {
    if (entry.target === aboutInstructor) {
      if (entry.isIntersecting === true) {
        var viewportOffset = aboutInstructor.getBoundingClientRect();
        var vpr_top = viewportOffset.top;
        var vpr_left = viewportOffset.left;
        handOpen.classList.remove('opacity-0');
        handOpen.classList.add('opacity-100');
      }
      else {
        handOpen.classList.remove('opacity-100');
        handOpen.classList.add('opacity-0');
      }
    }
  });
}

// const observer = new IntersectionObserver(onEntry, options);
// observer.observe(aboutInstructor);

window.addEventListener('scroll', updateNav);
// window.addEventListener('scroll', onScroll);

function onScroll() {
  handStateUpdate(aboutInstructor.getBoundingClientRect().top);
}

function handStateUpdate(top) {
  if (top > window.innerHeight || top < 0) {
    handInvisible();
  }
  else if (top >= window.innerHeight / 2) {
    handOpenVisible();
  }
  else {
    handClosedVisible();
  }
}

function handInvisible() {
  handOpen.classList.remove('opacity-100');
  handOpen.classList.add('opacity-0');
  handClosed.classList.remove('opacity-100');
  handClosed.classList.add('opacity-0');
}

function handOpenVisible() {
  handOpen.classList.remove('opacity-0');
  handOpen.classList.add('opacity-100');
  handClosed.classList.remove('opacity-100');
  handClosed.classList.add('opacity-0');
}

function handClosedVisible() {
  handOpen.classList.remove('opacity-100');
  handOpen.classList.add('opacity-0');
  handClosed.classList.remove('opacity-0');
  handClosed.classList.add('opacity-100');
}
