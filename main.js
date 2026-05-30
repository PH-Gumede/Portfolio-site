// ─── CUSTOM CURSOR ───

const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;

  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
  ring.style.left   = rx + 'px';
  ring.style.top    = ry + 'px';

  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '16px';
    cursor.style.height = '16px';
    ring.style.width    = '48px';
    ring.style.height   = '48px';
    ring.style.borderColor = 'rgba(200,184,154,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    ring.style.width    = '32px';
    ring.style.height   = '32px';
    ring.style.borderColor = 'rgba(200,184,154,0.5)';
  });
});

// ─── SCROLL REVEAL ───

const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));
