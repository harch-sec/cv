(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  const intro = document.getElementById("signature-intro");
  function closeIntro() {
    intro.classList.add("leaving");
    setTimeout(() => { intro.style.display = "none"; }, 1400);
  }
  document.getElementById("sig-enter").addEventListener("click", closeIntro);
  document.getElementById("sig-skip").addEventListener("click", closeIntro);

  (function stars() {
    const canvas = document.getElementById("sig-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, pts = [];
    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * Math.PI * 2,
        s: Math.random() * 0.02 + 0.005
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.a += p.s;
        const alpha = 0.35 + Math.sin(p.a) * 0.35;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(160,210,245," + alpha + ")";
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener("resize", resize);
    draw();
  })();

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalStack = document.getElementById("modal-stack");
  const modalKicker = document.getElementById("modal-kicker");

  document.querySelectorAll(".project").forEach(card => {
    card.addEventListener("click", () => {
      modalKicker.textContent = card.dataset.project.toUpperCase() + " — Case Study";
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modalStack.textContent = card.dataset.stack;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.getElementById("modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();
