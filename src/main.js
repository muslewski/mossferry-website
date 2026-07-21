import "./install-ui.css";
import { bootInstallUi } from "./install-ui.js";
bootInstallUi();

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
