(function () {
  emailjs.init({
    publicKey: '7uwKbSfngsbnW-Ust'
  });

  const form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const timeInput = form.querySelector('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    emailjs.sendForm('service_prh4ud5', 'template_art1vqd', form)
      .then(() => {
        alert('Message sent successfully!');
        form.reset();
        const submitButton = form.querySelector('[data-form-btn]');
        if (submitButton) {
          submitButton.setAttribute('disabled', '');
        }
      }, (error) => {
        console.error('Email sending failed:', error);
        alert('Something went wrong. Please try again later.');
      });
  });
})();
