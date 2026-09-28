document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     스크롤 등장 애니메이션
  ========================== */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =========================
     모바일 메뉴
  ========================== */
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      });
    });
  }


  /* =========================
     FAQ 아코디언
  ========================== */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (!question) {
      return;
    }

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // 열려 있는 다른 FAQ 닫기
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("open");

        const otherQuestion =
          otherItem.querySelector(".faq-question");

        if (otherQuestion) {
          otherQuestion.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      });

      // 클릭한 FAQ가 닫혀 있었다면 열기
      if (!isOpen) {
        item.classList.add("open");

        question.setAttribute(
          "aria-expanded",
          "true"
        );
      }
    });
  });
});