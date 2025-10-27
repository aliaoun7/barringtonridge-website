// Barrington Ridge JavaScript
// Handles client‑side interactivity such as form submission and
// scroll‑based navigation highlights.

document.addEventListener('DOMContentLoaded', function () {
  // Eligibility form submission handler
  //
  // Formspree's free plan does not support AJAX submissions. To ensure
  // successful delivery of form data, we allow the browser to submit the
  // form normally via POST to the endpoint specified in the form's
  // `action` attribute. The Formspree service will handle the
  // submission and display its default success page or send a follow-up
  // email to the business. If you upgrade to a paid plan that
  // supports AJAX, you can reintroduce an event listener here to send
  // the form asynchronously and display a custom success message.
  //
  // NOTE: Because we're not intercepting the submit event, the
  // browser will follow Formspree's redirect after submission. To
  // modify this behaviour (e.g., redirect back to a page on your
  // domain), you can add a hidden input named `_next` to the form in
  // index.html with the desired URL. See Formspree documentation for
  // details.

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