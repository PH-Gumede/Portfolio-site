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
      setTimeout(() => {
        entry.target.classList.add('visible');
        // if the revealed element is a glitchFX, fire it
        if (entry.target.classList.contains('glitchFX')) {
          setTimeout(() => runGlitch(entry.target), i * 80);
        }
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ─── THEME TOGGLE WITH LOOPING PG ↔ MOON ANIMATION ───

const toggle = document.getElementById('theme-toggle');
let isLight = false;
let loopTimer = null;
let showingAlt = false;

function startLoop() {
  loopTimer = setInterval(() => {
    showingAlt = !showingAlt;
    if (isLight) {
      toggle.classList.toggle('show-moon', showingAlt);
      toggle.classList.remove('show-sun');
    } else {
      toggle.classList.toggle('show-sun', showingAlt);
      toggle.classList.remove('show-moon');
    }
  }, 2200);
}

startLoop();

toggle.addEventListener('click', () => {
  isLight = !isLight;
  document.body.classList.toggle('light-mode', isLight);

  clearInterval(loopTimer);
  showingAlt = false;
  toggle.classList.remove('show-moon', 'show-sun');
  startLoop();
});


//Glitch Text Effect

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function runGlitch(element) {
  let iteration = 0;
  const target = element.dataset.value;
  if (!target) return;

  // clear any running interval on this element
  if (element._glitchInterval) clearInterval(element._glitchInterval);

  element._glitchInterval = setInterval(() => {
    element.innerText = element.innerText
      .split("")
      .map((letter, index) =>
        index < iteration
          ? target[index]
          : letters[Math.floor(Math.random() * 26)]
      )
      .join("");

    if (iteration >= target.length) {
      clearInterval(element._glitchInterval);
    }

    iteration += 1 / 3;
  }, 30);
}

// Mouseover still works on all glitchFX elements
document.querySelectorAll(".glitchFX").forEach(element => {
  element.addEventListener("mouseover", () => runGlitch(element));
});

// Fire on page load for hero-name spans
window.addEventListener("load", () => {
  // stagger first name and last name slightly
  document.querySelectorAll(".hero-name .glitchFX").forEach((el, i) => {
    setTimeout(() => runGlitch(el), 600 + i * 300);
  });
});