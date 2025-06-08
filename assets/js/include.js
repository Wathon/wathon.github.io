function includeHTML(callback) {
    const elements = document.querySelectorAll('[include-html]');
    let total = elements.length;
  
    if (total === 0) return callback(); // run immediately if no includes
  
    elements.forEach(el => {
      const file = el.getAttribute('include-html');
      fetch(file)
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
  const scripts = ['assets/js/main.js', 'assets/js/email.js'];

  scripts.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
  });
});

  