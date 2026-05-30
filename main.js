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

// ─── THEME TOGGLE WITH LOOPING PG ↔ MOON ANIMATION ───

const toggle = document.getElementById('theme-toggle');
let isLight = false;
let loopTimer = null;
let showingMoon = false;

// Swap faces every 2.2s in a loop
function startLoop() {
  loopTimer = setInterval(() => {
    showingMoon = !showingMoon;
    toggle.classList.toggle('show-moon', showingMoon);
  }, 2200);
}

// Kick off the loop
startLoop();

toggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light-mode', isLight);

  // Snap the icon to match the mode:
  // In light mode show moon (click to go dark), in dark mode show PG (click to go light)
  // but let the loop keep running from current state — just reset phase
  clearInterval(loopTimer);
  showingMoon = isLight;
  toggle.classList.toggle('show-moon', showingMoon);
  startLoop();
});

//Glitch Text Effect

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelectorAll(".glitchFX").forEach(element => {
  let interval = null;

  element.addEventListener("mouseover", event => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) =>
          index < iteration
            ? event.target.dataset.value[index]
            : letters[Math.floor(Math.random() * 26)]
        )
        .join("");

      if (iteration >= event.target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  });
});