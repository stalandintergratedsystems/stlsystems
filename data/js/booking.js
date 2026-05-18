// Simple contact form handler — stores messages locally if no endpoint configured
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = new FormData(form);
    const message = {
      name: data.get('name') || 'Anonymous',
      email: data.get('email') || '',
      phone: data.get('phone') || '',
      subject: data.get('subject') || '',
      message: data.get('message') || '',
      submittedAt: new Date().toISOString()
    };

    const endpoint = form.getAttribute('data-endpoint') || '';
    if (endpoint) {
      fetch(endpoint, {method:'POST',body: new FormData(form)}).then(res=>{
        if (res.ok) alert('Message sent successfully');
      }).catch(()=>alert('Submission failed'));
      return;
    }

    // Fallback: save to localStorage
    try {
      const messages = JSON.parse(localStorage.getItem('staland_messages')||'[]');
      messages.push(message);
      localStorage.setItem('staland_messages', JSON.stringify(messages));
      alert('Message saved locally.');
      form.reset();
    } catch (err) { console.error(err); alert('Unable to save message.'); }
  });
});
