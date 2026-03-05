// js/main.js
(() => {
  "use strict";

  /* ============ 1) Active link تلقائي للهيدر ============ */
  const current = (location.pathname.split("/").pop() || "home.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === current) a.classList.add("active");
    else a.classList.remove("active");
  });

  /* ============ 2) ظل للهيدر عند السكروول ============ */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============ 3) سنة الفوتر تلقائي ============ */
  // حط في الفوتر: <span data-year></span>
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ============ 4) زر رجوع لفوق ============ */
  const toTop = document.createElement("button");
  toTop.type = "button";
  toTop.className = "to-top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.textContent = "↑";
  document.body.appendChild(toTop);

  const toggleTopBtn = () => {
    toTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", toggleTopBtn, { passive: true });
  toggleTopBtn();

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ============ 5) فلترة المنيو (تشتغل فقط إذا العناصر موجودة) ============ */
  const pills = document.querySelectorAll(".pill[data-filter]");
  const cards = document.querySelectorAll(".card[data-category]");

  if (pills.length && cards.length) {
    pills.forEach(btn => {
      btn.addEventListener("click", () => {
        pills.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        cards.forEach(card => {
          const cat = card.dataset.category;
          card.style.display = (filter === "all" || cat === filter) ? "" : "none";
        });
      });
    });
  }

  /* ============ 6) رسالة بسيطة للفورم (اختياري) ============ */
  // إذا بدك يمنع الإرسال ويعرض رسالة نجاح (لأنه موقع ستاتيك)
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message sent! We will contact you soon.");
      form.reset();
    });
  }
})();