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

  /* =========================
     포스터 확대 보기
  ========================== */
  const posterPreview = document.querySelector(".poster-preview");
  const posterLightbox = document.querySelector("#posterLightbox");
  const posterClose = document.querySelector(".poster-lightbox-close");

  if (posterPreview && posterLightbox && posterClose) {
    const openPoster = () => {
      posterLightbox.classList.add("open");
      posterLightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("lightbox-open");
      posterClose.focus();
    };

    const closePoster = () => {
      posterLightbox.classList.remove("open");
      posterLightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("lightbox-open");
      posterPreview.focus();
    };

    posterPreview.addEventListener("click", openPoster);

    posterPreview.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openPoster();
      }
    });

    posterClose.addEventListener("click", closePoster);

    posterLightbox.addEventListener("click", (event) => {
      if (event.target === posterLightbox) {
        closePoster();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && posterLightbox.classList.contains("open")) {
        closePoster();
      }
    });
  }

});