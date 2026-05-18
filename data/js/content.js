// Fade-in on scroll
document.addEventListener('DOMContentLoaded', function() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('show'); obs.unobserve(entry.target);} });
  },{threshold:0.15});
  els.forEach(e=>obs.observe(e));
});
