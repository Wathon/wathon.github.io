(function () {
    emailjs.init({
      publicKey: '7uwKbSfngsbnW-Ust'
    });
  })();
  
  window.addEventListener('load', function () {
    const form = document.getElementById('contact-form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      emailjs.sendForm('service_prh4ud5', 'template_art1vqd', form)
        .then(() => {
          alert('✅ Message sent successfully!');
          form.reset();
        }, (error) => {
          console.error('❌ Email sending failed:', error);
          alert('⚠️ Something went wrong. Please try again later.');
        });
    });
  });
  