// Basic site script: handles contact form storage and simple interactions
document.addEventListener('DOMContentLoaded', function(){
  // Scroll animation
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("show");
          }
      });
  });

  elements.forEach(el => observer.observe(el));

  // Contact form handling: submit to configured endpoint (Formspree) or fallback to localStorage
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const endpoint = form.getAttribute('data-endpoint') || '';
      const fd = new FormData(form);

      if (endpoint) {
        // Submit via fetch to Formspree
        fetch(endpoint, {
          method: 'POST',
          body: fd,
          headers: { 'Accept': 'application/json' }
        }).then(async (res) => {
          if (res.ok) {
            // show success
            alert('Thank you — your message was sent.');
            form.reset();
          } else {
            let text = await res.text();
            console.error('Formspree error:', res.status, text);
            alert('Submission failed. Please try again later.');
          }
        }).catch((err) => {
          console.error('Submit error:', err);
          alert('Submission failed. Please check your connection and try again.');
        });

        return;
      }

      // Fallback: save to localStorage
      try {
        const obj = {
          name: fd.get('name') || '',
          email: fd.get('email') || '',
          phone: fd.get('phone') || '',
          subject: fd.get('subject') || '',
          message: fd.get('message') || '',
          time: new Date().toISOString()
        };
        const arr = JSON.parse(localStorage.getItem('staland_messages') || '[]');
        arr.push(obj);
        localStorage.setItem('staland_messages', JSON.stringify(arr));
        alert('Message saved locally.');
        form.reset();
      } catch (err) {
        console.error(err);
        alert('Unable to save message.');
      }
    });
  }
});
