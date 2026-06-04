/* DALLAS DETAIL CO. — 10x enhancement interactions (loaded after script.js) */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---- aurora atmosphere ---- */
  const aurora = document.createElement("div");
  aurora.className = "aurora";
  aurora.innerHTML = '<span class="a1"></span><span class="a2"></span><span class="a3"></span>';
  document.body.prepend(aurora);

  /* ---- scroll progress ---- */
  const prog = document.createElement("div");
  prog.className = "scroll-prog";
  document.body.appendChild(prog);
  const onScrollProg = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  onScrollProg();
  window.addEventListener("scroll", onScrollProg, { passive: true });

  /* ---- cursor glow + aurora parallax ---- */
  if (fine) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    document.body.appendChild(glow);
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY;
      const dx = (e.clientX / window.innerWidth - 0.5);
      const dy = (e.clientY / window.innerHeight - 0.5);
      aurora.style.transform = `translate(${dx * -26}px, ${dy * -26}px)`;
    });
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---- infinite marquee ---- */
  const strip = $(".strip");
  const stripInner = $(".strip-inner");
  if (strip && stripInner) {
    stripInner.innerHTML += stripInner.innerHTML; // duplicate for seamless loop
    strip.classList.add("enhanced");
  }

  /* ---- 3D tilt + glare on cards ---- */
  if (fine && !reduce) {
    $$(".svc, .plan, .gallery a, .rev").forEach((card) => {
      card.classList.add("tilt");
      const glare = document.createElement("span");
      glare.className = "glare";
      card.appendChild(glare);
      let raf = null;
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rx = (0.5 - py) * 8;
        const ry = (px - 0.5) * 8;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
          glare.style.setProperty("--gx", px * 100 + "%");
          glare.style.setProperty("--gy", py * 100 + "%");
        });
      };
      const reset = () => { if (raf) cancelAnimationFrame(raf); card.style.transform = ""; };
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", reset);
    });
  }

  /* ---- magnetic large buttons ---- */
  if (fine && !reduce) {
    $$(".hero-actions .btn, .cta-card .btn").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${mx * 0.18}px, ${my * 0.28}px)`;
      });
      btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
    });
  }

  /* ---- floating rating badge on hero image ---- */
  const ba = $(".ba");
  if (ba && ba.parentElement) {
    ba.parentElement.style.position = "relative";
    const badge = document.createElement("div");
    badge.className = "float-badge";
    badge.innerHTML = '<div class="stars" style="color:var(--star)">★★★★★</div><b>4.9</b> <small>327 Google reviews</small>';
    ba.parentElement.appendChild(badge);
  }

  /* ---- section index numbers ---- */
  $$(".sec .sec-head").forEach((head, i) => {
    const n = document.createElement("span");
    n.className = "sec-no";
    n.textContent = "0" + (i + 1) + " — DALLAS DETAIL CO.";
    head.insertBefore(n, head.firstChild);
  });

  /* ---- ghost wordmark in footer ---- */
  const footer = $(".footer");
  if (footer) {
    const g = document.createElement("div");
    g.className = "ghost-word";
    g.textContent = "DETAIL CO.";
    footer.prepend(g);
  }
})();
