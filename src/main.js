import "./r7-media.js";
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");
if (reduce) reveals.forEach((el) => el.classList.add("visible"));
else if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  reveals.forEach((el) => io.observe(el));
} else reveals.forEach((el) => el.classList.add("visible"));

document.querySelectorAll("video[data-auto]").forEach((v) => {
  if (reduce) { v.removeAttribute("autoplay"); v.pause(); v.controls = true; }
  else { v.muted = true; v.play().catch(() => {}); }
});

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const sel = btn.getAttribute("data-copy");
    const el = document.querySelector(sel);
    const text = el?.textContent?.trim() || "";
    try { await navigator.clipboard.writeText(text); } catch {
      const ta = document.createElement("textarea"); ta.value = text;
      document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove();
    }
    const prev = btn.textContent; btn.textContent = "copied";
    setTimeout(() => (btn.textContent = prev), 1100);
  });
});
