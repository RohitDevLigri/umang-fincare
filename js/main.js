document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // 1. HEADER & NAVIGATION LOGIC
  // ==========================================
  const siteHeader = document.getElementById("siteHeader");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const primaryNav = document.getElementById("primaryNav");
  const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  function closeAllDropdowns(exceptItem) {
    dropdownItems.forEach(function (item) {
      if (item !== exceptItem) {
        item.classList.remove("accordion-open", "dropdown-open");
        const trigger = item.querySelector(".dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  function updateHeaderShadow() {
    if (!siteHeader) return;
    if (window.scrollY > 10) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", updateHeaderShadow, { passive: true });
  updateHeaderShadow();

  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      if (!isOpen) closeAllDropdowns(null);
    });
  }

  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector(".dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        const isAlreadyOpen = item.classList.contains("accordion-open");
        closeAllDropdowns(item);
        if (!isAlreadyOpen) item.classList.add("accordion-open");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (siteHeader && !siteHeader.contains(event.target)) {
      closeAllDropdowns(null);
      if (primaryNav && primaryNav.classList.contains("open")) {
        primaryNav.classList.remove("open");
        if (hamburgerBtn) {
          hamburgerBtn.classList.remove("active");
          hamburgerBtn.setAttribute("aria-expanded", "false");
        }
      }
    }
  });

  window.addEventListener("resize", function () {
    closeAllDropdowns(null);
    if (window.innerWidth > 768 && primaryNav) {
      primaryNav.classList.remove("open");
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  window.addEventListener("scroll", function () {
    document.body.classList.add("is-scrolling");
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(function () {
      document.body.classList.remove("is-scrolling");
    }, 200);
  });

  // ==========================================
  // 2. MOBILE SLIDER LOGIC (HDFC STYLE)
  // ==========================================
  const sliderWrapper = document.getElementById("hdfcSliderWrapper");
  const sliderTrack = document.getElementById("hdfcSliderTrack");
  const paginationContainer = document.getElementById("hdfcPagination");
  const prevBtn = document.getElementById("hdfcPrevBtn");
  const nextBtn = document.getElementById("hdfcNextBtn");

  if (sliderWrapper && sliderTrack && paginationContainer) {
    const slides = Array.from(sliderTrack.children);
    const totalSlides = slides.length;
    let currentIndex = 0;
    let autoSlideTimer = null;

    let touchStartX = 0;
    let touchCurrentX = 0;
    let isSwiping = false;

    // Create Dots
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = index === 0 ? "hdfc-dot active" : "hdfc-dot";
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetTimer();
      });
      paginationContainer.appendChild(dot);
    });

    const dots = Array.from(paginationContainer.children);

    // Move Slider
    function goToSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      sliderTrack.style.transition = "transform 0.4s ease-in-out";
      sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    // Timer Logic
    function startTimer() {
      stopTimer();
      autoSlideTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 3000); // 3 seconds
    }

    function stopTimer() {
      if (autoSlideTimer) clearInterval(autoSlideTimer);
    }

    function resetTimer() {
      stopTimer();
      startTimer();
    }

    // Arrow Clicks
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
        resetTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
        resetTimer();
      });
    }

    // Touch Swipe
    sliderWrapper.addEventListener("touchstart", (e) => {
      stopTimer();
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isSwiping = true;
      sliderTrack.style.transition = "none";
    }, { passive: true });

    sliderWrapper.addEventListener("touchmove", (e) => {
      if (!isSwiping) return;
      touchCurrentX = e.touches[0].clientX;
      const diffX = touchCurrentX - touchStartX;
      const percentOffset = (diffX / sliderWrapper.offsetWidth) * 100;
      sliderTrack.style.transform = `translateX(${(-currentIndex * 100) + percentOffset}%)`;
    }, { passive: true });

    sliderWrapper.addEventListener("touchend", () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = touchCurrentX - touchStartX;

      if (diffX < -40) {
        goToSlide(currentIndex + 1);
      } else if (diffX > 40) {
        goToSlide(currentIndex - 1);
      } else {
        goToSlide(currentIndex);
      }
      startTimer();
    });

    // Start Timer initially
    startTimer();
  }
});