document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('rsvp-form');
  const message = document.getElementById('form-message');
  const submitBtn = form.querySelector('.submit-btn');

  // Replace this URL with your Google Apps Script Web App URL after deployment
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyvH0Fp490pEL2uwyXIKHsyLAHR9oMiJ5DNHgJQcFet_VlUw_06c91pQ5HnZ8CzSSYl/exec';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
      message.textContent = 'RSVP form is being set up. Please check back soon.';
      message.className = 'form-message error';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'sending...';
    message.className = 'form-message';
    message.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(function () {
        message.textContent = 'Thank you. Your response has been received.';
        message.className = 'form-message success';
        form.reset();
      })
      .catch(function () {
        message.textContent = 'Something went wrong. Please try again.';
        message.className = 'form-message error';
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'send rsvp';
      });
  });
});
