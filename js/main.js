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
 document.addEventListener("DOMContentLoaded", function () {
  const sliderWrapper = document.getElementById("hdfcSliderWrapper");
  const sliderTrack = document.getElementById("hdfcSliderTrack");
  const paginationContainer = document.getElementById("hdfcPagination");

  if (!sliderWrapper || !sliderTrack || !paginationContainer) return;

  const slides = Array.from(sliderTrack.children);
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlideTimer = null;
  const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds

  // Touch swipe tracking variables
  let touchStartX = 0;
  let touchCurrentX = 0;
  let isSwiping = false;

  // 1. Build Pill-Shaped Pagination Dots
  const dots = slides.map(function (_, index) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === 0 ? "hdfc-dot active" : "hdfc-dot";
    dot.setAttribute("aria-label", "Go to slide " + (index + 1));
    dot.setAttribute("aria-selected", index === 0 ? "true" : "false");

    dot.addEventListener("click", function () {
      goToSlide(index);
      restartAutoSlide();
    });

    paginationContainer.appendChild(dot);
    return dot;
  });

  // 2. Move Track & Update Active Pill Dot
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0; // Smoothly loops from 12th back to 1st
    } else {
      currentIndex = index;
    }

    sliderTrack.style.transition = "transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)";
    sliderTrack.style.transform = "translateX(-" + currentIndex * 100 + "%)";

    dots.forEach(function (dot, i) {
      const isActive = i === currentIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-selected", isActive ? "true" : "false");
    });
  }

  // 3. Auto-Slide Controls (Every 3 Seconds)
  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(function () {
      goToSlide(currentIndex + 1);
    }, AUTO_SLIDE_INTERVAL);
  }

  function stopAutoSlide() {
    if (autoSlideTimer !== null) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // 4. Mobile Touch Swipe Support (Pause on touch, resume on release)
  sliderWrapper.addEventListener(
    "touchstart",
    function (event) {
      if (event.touches.length !== 1) return;
      stopAutoSlide();
      isSwiping = true;
      touchStartX = event.touches[0].clientX;
      touchCurrentX = touchStartX;
      sliderTrack.style.transition = "none";
    },
    { passive: true }
  );

  sliderWrapper.addEventListener(
    "touchmove",
    function (event) {
      if (!isSwiping) return;
      touchCurrentX = event.touches[0].clientX;
      const diffX = touchCurrentX - touchStartX;
      const containerWidth = sliderWrapper.offsetWidth || 1;
      const percentOffset = (diffX / containerWidth) * 100;
      sliderTrack.style.transform =
        "translateX(" + (-currentIndex * 100 + percentOffset) + "%)";
    },
    { passive: true }
  );

  sliderWrapper.addEventListener("touchend", function () {
    if (!isSwiping) return;
    isSwiping = false;

    const diffX = touchCurrentX - touchStartX;
    const swipeThreshold = 45; // Minimum px drag to trigger slide change

    if (diffX < -swipeThreshold) {
      goToSlide(currentIndex + 1);
    } else if (diffX > swipeThreshold) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex); // Snap back if swipe was too short
    }

    startAutoSlide();
  });

  sliderWrapper.addEventListener("touchcancel", function () {
    if (!isSwiping) return;
    isSwiping = false;
    goToSlide(currentIndex);
    startAutoSlide();
  });

  // Pause auto-slide when browser tab is hidden to prevent jump on return
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  // Start auto-slide on load
  startAutoSlide();
});
});