/* DALLAS DETAIL CO. — interactions */
(function () {
  "use strict";

  /* ---- Microsoft Clarity (OUR account — spec-site behavior insight, all pages) ----
     Paste our Clarity project ID below to activate site-wide. Dormant until then. */
  var CLARITY_ID = "CLARITY_PROJECT_ID";
  if (CLARITY_ID && CLARITY_ID.indexOf("CLARITY_") !== 0) {
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_ID);
  }

  /* ---- sticky header ---- */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- mobile nav ---- */
  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");
  burger.addEventListener("click", () => document.body.classList.toggle("nav-open"));
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") document.body.classList.remove("nav-open");
  });

  /* ---- before/after slider ---- */
  document.querySelectorAll(".ba").forEach((ba) => {
    const wrap = ba.querySelector(".ba-before-wrap");
    const handle = ba.querySelector(".ba-handle");
    let dragging = false;

    const setPos = (clientX) => {
      const rect = ba.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      wrap.style.width = pct + "%";
      handle.style.left = pct + "%";
    };
    const start = (e) => { dragging = true; setPos((e.touches ? e.touches[0] : e).clientX); };
    const move = (e) => { if (dragging) setPos((e.touches ? e.touches[0] : e).clientX); };
    const end = () => { dragging = false; };

    ba.addEventListener("mousedown", start);
    ba.addEventListener("touchstart", start, { passive: true });
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
    // gentle auto-hint on load
    let p = 50, dir = -1, steps = 0;
    const hint = setInterval(() => {
      p += dir * 1.2; steps++;
      if (p <= 38 || p >= 62) dir *= -1;
      wrap.style.width = p + "%"; handle.style.left = p + "%";
      if (steps > 26) { clearInterval(hint); wrap.style.width = "50%"; handle.style.left = "50%"; }
    }, 26);
  });

  /* ---- image fallbacks ---- */
  document.querySelectorAll("img[data-fallback]").forEach((img) => {
    img.addEventListener("error", () => {
      const fb = img.nextElementSibling;
      img.style.display = "none";
      if (fb && fb.classList.contains("ba-fallback")) fb.style.display = "block";
      else if (fb && fb.classList.contains("gfb")) fb.style.display = "block";
    });
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".q-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.closest(".q");
      const ans = q.querySelector(".q-ans");
      const open = q.classList.contains("open");
      document.querySelectorAll(".q.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".q-ans").style.maxHeight = null;
      });
      if (!open) { q.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; }
    });
  });

  /* ---- scroll reveal ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- count-up stats ---- */
  const fmt = (n) => n >= 1000 ? Math.round(n).toLocaleString() : Math.round(n);
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split(".")[1] || "").length;
      let cur = 0; const dur = 1400, t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        cur = target * (1 - Math.pow(1 - p, 3));
        el.firstChild.textContent = dec ? cur.toFixed(dec) : fmt(cur);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  /* ---- footer year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
