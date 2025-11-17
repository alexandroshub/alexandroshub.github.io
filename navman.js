// Load the fragment, then initialize interactions
async function loadNavbar() {
  const mount = document.getElementById('navbar');
  const res = await fetch('navman.html');
  const html = await res.text();
  mount.innerHTML = html;

  initNavbar(); // attach events after HTML exists
}

function initNavbar() {
  const burger = document.querySelector('.burger');
  const navLinks = document.getElementById('navLinks');
  const toggleBtn = document.querySelector('.toggle-btn');

  // Burger toggle
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('show');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Theme toggle + persist
  const prefersDark = localStorage.getItem('theme') === 'dark';
  if (prefersDark) document.body.classList.add('dark');

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Active link highlighting on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a[href^="#"]');

    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      if (window.pageYOffset >= top - 80) current = section.id;
    });

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// Start
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();
});
