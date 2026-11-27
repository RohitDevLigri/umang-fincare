document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("siteHeader");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const primaryNav = document.getElementById("primaryNav");
  const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  // Helper: Close all dropdowns (both desktop click-open and mobile accordion-open)
  function closeAllDropdowns(exceptItem) {
    dropdownItems.forEach(function (item) {
      if (item !== exceptItem) {
        item.classList.remove("accordion-open", "dropdown-open");
        const trigger = item.querySelector(".dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 1. Sticky Header Shadow on Scroll
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

  // 2. Mobile Hamburger Menu Toggle
  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

      if (!isOpen) {
        closeAllDropdowns(null);
      }
    });
  }

  // 3. Dropdown Toggle:
  //    - Mobile (<= 768px): Accordion toggle when clicking Insurance, Loan, or Company
  //    - Desktop (> 768px): Opens on hover via CSS AND supports click toggle
 document.addEventListener("DOMContentLoaded", function () {
  const siteHeader = document.getElementById("siteHeader");
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const primaryNav = document.getElementById("primaryNav");
  const dropdownItems = document.querySelectorAll(".nav-item.has-dropdown");

  // 1. Sticky Header Shadow on Scroll
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

  // 2. Mobile Hamburger Menu Toggle
  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // 3. Mobile Accordion Dropdowns (Only for Mobile)
  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector(".dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        const isAlreadyOpen = item.classList.contains("accordion-open");
        
        // Close others
        dropdownItems.forEach(function (otherItem) {
          otherItem.classList.remove("accordion-open");
        });

        // Toggle current
        if (!isAlreadyOpen) {
          item.classList.add("accordion-open");
        }
      }
      // Desktop par click karne par kuch nahi hoga, direct link khulega (jaise loans.html)
    });
  });

  // 4. Close mobile menu on resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && primaryNav) {
      primaryNav.classList.remove("open");
      if (hamburgerBtn) hamburgerBtn.classList.remove("active");
    }
  window.addEventListener("scroll", function () {
      document.body.classList.add("is-scrolling");
      clearTimeout(window.scrollTimeout);
      window.scrollTimeout = setTimeout(function () {
          document.body.classList.remove("is-scrolling");
      }, 200);
  });
  });
});
  // 4. Close open menus when clicking outside the header
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

  // 5. Reset menu states on viewport resize across 768px breakpoint
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
 // ==========================================
// MOBILE ONLY HDFC STYLE SLIDER LOGIC
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.getElementById("hdfcSliderWrapper");
  const sliderTrack = document.getElementById("hdfcSliderTrack");
  const paginationContainer = document.getElementById("hdfcPagination");

  if (!sliderWrapper || !sliderTrack || !paginationContainer) return;

  const slides = Array.from(sliderTrack.children);
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlideTimer = null;

  let touchStartX = 0;
  let touchCurrentX = 0;
  let isSwiping = false;

  // 1. Create Dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = index === 0 ? "hdfc-dot active" : "hdfc-dot";
    dot.addEventListener("click", () => {
      goToSlide(index);
      restartAutoSlide();
    });
    paginationContainer.appendChild(dot);
  });

  const dots = Array.from(paginationContainer.children);

  // 2. Move Slider
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

  // 3. Auto Slide
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 3000); // 3 Seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // 4. Touch Swipe
  sliderWrapper.addEventListener("touchstart", (e) => {
    stopAutoSlide();
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
    startAutoSlide();
  });

  // Start on load
  startAutoSlide();
});
});