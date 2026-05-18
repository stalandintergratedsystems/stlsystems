// Basic site JS: smooth scroll and simple nav active state
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){ e.preventDefault(); const t=document.querySelector(this.getAttribute('href')); if(t) t.scrollIntoView({behavior:'smooth'}); });
  });
});
