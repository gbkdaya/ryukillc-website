/* RyukiLLC — site interactions
   1) mobile nav  2) header state  3) scroll reveal  4) live neural network graph */
(function () {
  "use strict";

  /* ---------- 1. year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 2. mobile navigation ---------- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("active", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 3. header state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 5. neural network graph (AI "central nervous system") ---------- */
  var canvas = document.getElementById("netGraph");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = 0, H = 0, DPR = 1;
    var NODE_COUNT = 44;
    var LINK_DIST = 112;
    var nodes = [];
    var mouse = { x: -9999, y: -9999 };
    var raf = null;
    var statTimer = null;

    var statNodes = document.getElementById("statNodes");
    var statLinks = document.getElementById("statLinks");
    var statTput = document.getElementById("statTput");
    var lastLinks = 0;

    var CYAN = [6, 182, 212];
    var PURPLE = [124, 58, 237];

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      var r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      canvas.width = Math.max(1, Math.floor(W * DPR));
      canvas.height = Math.max(1, Math.floor(H * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function seed() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.38,
          vy: (Math.random() - 0.5) * 0.38,
          r: 1.2 + Math.random() * 1.9,
          c: Math.random() < 0.7 ? CYAN : PURPLE
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      var i, j, n;

      /* edges */
      var linkCount = 0;
      for (i = 0; i < nodes.length; i++) {
        for (j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            var t = 1 - Math.sqrt(d2) / LINK_DIST;
            ctx.strokeStyle = "rgba(6,182,212," + (0.04 + t * 0.22).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            linkCount++;
          }
        }
      }
      lastLinks = linkCount;

      /* edges to cursor */
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        var mdx = n.x - mouse.x, mdy = n.y - mouse.y;
        var md2 = mdx * mdx + mdy * mdy;
        if (md2 < 130 * 130) {
          var mt = 1 - Math.sqrt(md2) / 130;
          ctx.strokeStyle = "rgba(124,58,237," + (mt * 0.4).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      /* nodes: drift, cursor repulsion, wrap, draw */
      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        var rdx = n.x - mouse.x, rdy = n.y - mouse.y;
        var rd2 = rdx * rdx + rdy * rdy;
        if (rd2 < 90 * 90 && rd2 > 0.01) {
          var rd = Math.sqrt(rd2);
          var f = (1 - rd / 90) * 0.7;
          n.x += (rdx / rd) * f;
          n.y += (rdy / rd) * f;
        }

        if (n.x < -12) n.x = W + 12; else if (n.x > W + 12) n.x = -12;
        if (n.y < -12) n.y = H + 12; else if (n.y > H + 12) n.y = -12;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + n.c[0] + "," + n.c[1] + "," + n.c[2] + ",0.07)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + n.c[0] + "," + n.c[1] + "," + n.c[2] + ",0.9)";
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    }

    function tickStats() {
      if (statNodes) statNodes.textContent = String(nodes.length);
      if (statLinks) statLinks.textContent = String(lastLinks);
      if (statTput) {
        var v = 1.4 + Math.random() * 3.4;
        statTput.textContent = v.toFixed(2) + " Tb/s";
      }
    }

    function start() {
      stop();
      if (reduced) { frame(); tickStats(); return; } /* single static frame */
      raf = requestAnimationFrame(frame);
      statTimer = window.setInterval(tickStats, 600);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      if (statTimer) window.clearInterval(statTimer);
      raf = null;
      statTimer = null;
    }

    resize();
    seed();
    start();

    window.addEventListener("resize", function () {
      resize();
      if (reduced) frame();
    });

    canvas.addEventListener("mousemove", function (e) {
      var r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener("mouseleave", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    canvas.addEventListener("touchmove", function (e) {
      if (!e.touches.length) return;
      var r = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - r.left;
      mouse.y = e.touches[0].clientY - r.top;
    }, { passive: true });
    canvas.addEventListener("touchend", function () {
      mouse.x = -9999;
      mouse.y = -9999;
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop();
      else start();
    });
  }
})();
