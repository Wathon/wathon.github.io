function includeHTML(callback) {
    const elements = document.querySelectorAll('[include-html]');
    let total = elements.length;
    const version = '20260518';
  
    if (total === 0) return callback(); // run immediately if no includes
  
    elements.forEach(el => {
      const file = el.getAttribute('include-html');
      const separator = file.includes('?') ? '&' : '?';

      fetch(`${file}${separator}v=${version}`, { cache: 'no-store' })
        .then(res => res.text())
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute('include-html');
          total--;
          if (total === 0) callback(); // all includes done
        })
        .catch(err => {
          console.error(`Error loading ${file}:`, err);
          total--;
          if (total === 0) callback();
        });
    });
  }
  
// Call includeHTML and then load both main.js and email.js after all partials are inserted
includeHTML(() => {
  const version = '20260518';
  const scripts = ['assets/js/main.js', 'assets/js/email.js'];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = `${src}?v=${version}`;
    document.body.appendChild(script);
  });
});

  
