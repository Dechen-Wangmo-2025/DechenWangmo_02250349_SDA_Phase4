/* Shared JS: menu toggle, typing, reveal on scroll, skills animation, contact validation */

// MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuToggle.classList.toggle('open');
    // Small accessibility: focus first link when opened
    if (navLinks.classList.contains('open')) {
      const first = navLinks.querySelector('a');
      if (first) first.focus();
    }
  });
}

// TYPING EFFECT (on pages with .typing-text)
(function typingEffect(){
  const textArray = ['💻 Developer', '🎨 Designer', '🚀 Creator'];
  const el = document.querySelector('.typing-text');
  if (!el) return;
  let ti = 0, ci = 0;
  const typingDelay = 90, erasingDelay = 40, newTextDelay = 1400;

  function type(){
    if (ci < textArray[ti].length){
      el.textContent += textArray[ti].charAt(ci++);
      setTimeout(type, typingDelay);
    } else setTimeout(erase, newTextDelay);
  }
  function erase(){
    if (ci > 0){
      el.textContent = textArray[ti].substring(0, --ci);
      setTimeout(erase, erasingDelay);
    } else {
      ti = (ti + 1) % textArray.length;
      setTimeout(type, typingDelay + 200);
    }
  }
  document.addEventListener('DOMContentLoaded', () => setTimeout(type, 700));
})();

// REVEAL ON SCROLL (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // If the element has skill bars, animate them once
      if (entry.target.matches('.skill')) animateSkill(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.content-reveal').forEach(el => observer.observe(el));

// Animate skill bar (reads data-skill-level attribute)
function animateSkill(skillEl){
  const bar = skillEl.querySelector('.skill-bar span');
  const level = parseInt(skillEl.getAttribute('data-skill-level') || '60', 10);
  if (!bar) return;
  // animate width
  bar.style.transition = 'width 900ms cubic-bezier(.2,.9,.2,1)';
  requestAnimationFrame(() => bar.style.width = level + '%');
}

// Contact form validation & demo submit
(function contactForm(){
  const form = document.querySelector('#contactForm');
  if (!form) return;
  const status = document.querySelector('#formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // simple validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if (!name || !email || !message) {
      status.textContent = 'Please fill in all fields.';
      status.style.color = 'tomato';
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = 'Please enter a valid email.';
      status.style.color = 'tomato';
      return;
    }
    // Simulate sending
    status.textContent = 'Sending...';
    status.style.color = '#fff';
    setTimeout(() => {
      status.textContent = 'Message sent — thank you! (demo)';
      status.style.color = '#b6ffd6';
      form.reset();
    }, 900);
  });
})();

// Dropdown toggle for Hire Me button
(function dropdownToggle(){
  const hireMeBtn = document.getElementById('hireMeBtn');
  const dropdown = document.querySelector('.dropdown');
  if (hireMeBtn && dropdown) {
    hireMeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dropdown.classList.toggle('open');
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }
})();



// DARK MODE TOGGLE
(function darkModeToggle(){
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '🌙';
  toggleBtn.className = 'dark-mode-toggle';
  toggleBtn.setAttribute('aria-label', 'Toggle dark mode');
  toggleBtn.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 1300;
    background: rgba(255,255,255,0.1);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 18px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  `;

  document.body.appendChild(toggleBtn);

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  });
})();

// Small helper: mark current nav link active based on filename
(function highlightNav(){
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === current) {
      a.classList.add('active');
    }
  });
})();
