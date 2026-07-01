/* Shared site behavior: theme toggle, sticky header, mobile nav,
   fade-in observer, BibTeX toggle. */
(function () {
  "use strict";

  /* ===== Theme ===== */
  var html = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");

  function current() {
    return (
      html.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    );
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      html.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ===== Display mode persistence (serif/sans) =====
     Set via Tweaks; persists across pages via localStorage. */
  try {
    var d = localStorage.getItem("display");
    if (d) html.setAttribute("data-display", d);
  } catch (e) {}

  /* ===== Sticky header — hide over hero, show otherwise ===== */
  var header = document.getElementById("site-header");
  var hero = document.querySelector(".hero");

  if (header) {
    if (!hero) {
      header.classList.add("always-pinned");
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) header.classList.remove("is-visible");
          else header.classList.add("is-visible");
        });
      }, { threshold: 0 });
      obs.observe(hero);
    }
  }

  /* ===== Mobile nav ===== */
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("nav-open")) {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ===== Fade-in ===== */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".fade-in");
  if (reduce) {
    els.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ===== BibTeX toggles ===== */
  document.querySelectorAll(".pub-bibtex-toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("aria-controls");
      var t = document.getElementById(id);
      if (!t) return;
      var hidden = t.hidden;
      t.hidden = !hidden;
      btn.setAttribute("aria-expanded", hidden ? "true" : "false");
      btn.textContent = hidden ? "Hide BibTeX" : "BibTeX";
    });
  });

  /* ===== Copy buttons ===== */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-copy");
      var src = document.querySelector(sel) || { textContent: sel };
      var text = src.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
          var label = btn.dataset.label || btn.textContent;
          btn.dataset.label = label;
          btn.textContent = "Copied";
          setTimeout(function () { btn.textContent = label; }, 1400);
        });
      }
    });
  });
})();
