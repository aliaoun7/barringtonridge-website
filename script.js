// Barrington Ridge JavaScript
// Handles client‑side interactivity such as form submission and
// scroll‑based navigation highlights.

document.addEventListener('DOMContentLoaded', function () {
  // Eligibility form submission handler
  const eligibilityForm = document.getElementById('eligibility-form');
  const successMessage = document.getElementById('form-success');
  if (eligibilityForm) {
    eligibilityForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Here you would normally send the form data via AJAX to a server.
      // Since this is a static site, we'll simply display a success message.
      successMessage.hidden = false;
      // Optional: clear form values
      eligibilityForm.reset();
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
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