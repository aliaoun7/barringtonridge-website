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
      // Gather form data and submit to the Formspree endpoint specified in the form's action attribute.
      const formData = new FormData(eligibilityForm);
      fetch(eligibilityForm.action, {
        method: eligibilityForm.method,
        body: formData,
        headers: {
          // Accept JSON response so we can detect success or error states
          'Accept': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success message and reset form on successful submission
            successMessage.hidden = false;
            eligibilityForm.reset();
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            // If Formspree returns an error, display a generic alert message
            response.json().then((data) => {
              alert(data.error || 'Oops! There was a problem submitting your form.');
            });
          }
        })
        .catch(() => {
          alert('Oops! There was a problem submitting your form.');
        });
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