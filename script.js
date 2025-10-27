// Barrington Ridge JavaScript
// Handles client‑side interactivity such as form submission and
// scroll‑based navigation highlights.

document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS animations (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
    });
  }

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list li a');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
  };
  const observer = new IntersectionObserver(handleIntersect, observerOptions);
  sections.forEach((section) => observer.observe(section));

  function handleIntersect(entries) {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.nav-list li a[href="#${id}"]`);
      if (navLink) {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  }
});