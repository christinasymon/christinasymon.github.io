// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});

// Close mobile menu when clicking a link
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  }
});

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Simple carousel
const track = document.getElementById("carTrack");
const viewport = document.getElementById("carViewport");
const btns = document.querySelectorAll(".carBtn");

let index = 0;

function cardWidth() {
  const first = track.querySelector(".projectCard");
  if (!first) return 0;
  const styles = getComputedStyle(track);
  const gap = parseInt(styles.gap || "0", 10);
  return first.getBoundingClientRect().width + gap;
}

function maxIndex() {
  const w = cardWidth();
  if (!w) return 0;
  const total = track.children.length;
  const visible = Math.max(1, Math.floor(viewport.getBoundingClientRect().width / w));
  return Math.max(0, total - visible);
}

function render() {
  const w = cardWidth();
  const max = maxIndex();
  index = Math.min(Math.max(index, 0), max);
  track.style.transform = `translateX(${-index * w}px)`;
}

btns.forEach(btn => {
  btn.addEventListener("click", () => {
    index += Number(btn.dataset.dir);
    render();
  });
});

window.addEventListener("resize", render);
render();

// FAQ accordion
document.querySelectorAll(".faq__q").forEach((q) => {
  q.addEventListener("click", () => {
    const expanded = q.getAttribute("aria-expanded") === "true";
    const a = q.nextElementSibling;

    q.setAttribute("aria-expanded", String(!expanded));
    q.querySelector(".faq__icon").textContent = expanded ? "+" : "–";
    a.hidden = expanded;
  });
});
