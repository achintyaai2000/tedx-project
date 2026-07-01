/* =========================================================================
   TEDxMDIGurgaon 7.0 — PIVOT
   ------------------------------------------------------------------------
   EDIT ME FIRST: CONFIG.heroClip
   Watch the referenced TEDx6.0 - Metanoia talk, pick your 5–10s highlight,
   then fill in the four fields below. Nothing else needs to change —
   the player, caption and quote update automatically.
   ========================================================================= */
const CONFIG = {
  eventDate: "15 February 2027", // change to your real event date once confirmed

  heroClip: {
    youtubeId: "vDZmVg7MtcY",   // from the reference link — leave as is unless you use a different talk
    speakerName: "Dr. Dheeraj Dogra",      // e.g. "Dr. Dheeraj Dogra, TEDx6.0 - Metanoia"
    quote: "Dr. Dogra provides a visionary path for the leaders of tomorrow, demonstrating that the greatest landmarks are not only constructed with steel but also with empathy and the social impact that lasts for a long time. ",
    clipStartSeconds: 0,        // start of your chosen 5–10s highlight
    clipEndSeconds: 8,          // end of your chosen 5–10s highlight
    autoplayOnLoad: false       // set true once you're ready to autoplay muted on load
  }
};

/* ---------------- Populate dynamic text from CONFIG ---------------- */
document.getElementById("eventDate").textContent = CONFIG.eventDate;
document.getElementById("eventDate2").textContent = CONFIG.eventDate;
document.getElementById("speakerName").textContent = CONFIG.heroClip.speakerName;
document.getElementById("speakerQuote").textContent = `“${CONFIG.heroClip.quote}”`;

/* ---------------- Hero clip: build the YouTube embed on demand ---------------- */
function buildClipSrc({ youtubeId, clipStartSeconds, clipEndSeconds, autoplay }) {
  const params = new URLSearchParams({
    start: clipStartSeconds,
    end: clipEndSeconds,
    autoplay: autoplay ? 1 : 0,
    mute: autoplay ? 1 : 0,
    rel: "0",
    modestbranding: "1",
    playsinline: "1"
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

function mountClipPlayer(autoplay) {
  const container = document.getElementById("clipPlayer");
  const iframe = document.createElement("iframe");
  iframe.src = buildClipSrc({ ...CONFIG.heroClip, autoplay });
  iframe.title = `${CONFIG.heroClip.speakerName} — TEDx6.0 Metanoia highlight`;
  iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  container.innerHTML = "";
  container.appendChild(iframe);
}

const playBtn = document.getElementById("clipPlayBtn");
if (playBtn) {
  playBtn.addEventListener("click", () => mountClipPlayer(true));
}
if (CONFIG.heroClip.autoplayOnLoad) {
  mountClipPlayer(true);
}

/* ---------------- Nav: shrink + mobile menu ---------------- */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.style.background = window.scrollY > 40 ? "rgba(10,10,10,.92)" : "rgba(10,10,10,.72)";
}, { passive: true });

const burger = document.getElementById("burger");
const navMobile = document.getElementById("navMobile");
burger.addEventListener("click", () => {
  const isOpen = navMobile.classList.toggle("is-open");
  burger.classList.toggle("is-active", isOpen);
  burger.setAttribute("aria-expanded", String(isOpen));
});
navMobile.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navMobile.classList.remove("is-open");
    burger.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
  });
});

/* ---------------- Scroll reveal ---------------- */
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 6) * 60}ms`;
  io.observe(el);
});