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
// MOBILE ONLY SLIDER LOGIC (HDFC STYLE)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide-item");
  const dots = document.querySelectorAll(".dot");
  const sliderContainer = document.querySelector(".slider-container");
  
  if (slides.length === 0) return; // Exit if no slider on page

  let slideIndex = 0;
  let slideInterval;
  let startX = 0;
  let endX = 0;

  // Function to show specific slide
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Loop around if index is out of bounds
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    else slideIndex = n;

    slides[slideIndex].classList.add("active");
    dots[slideIndex].classList.add("active");
  }

  // Auto Slider (3 seconds)
  function startSlideShow() {
    slideInterval = setInterval(() => {
      slideIndex++;
      showSlide(slideIndex);
    }, 3000);
  }

  // Stop auto slide on touch
  function stopSlideShow() {
    clearInterval(slideInterval);
  }

  // Make currentSlide function global so dots onclick can access it
  window.currentSlide = function(n) {
    stopSlideShow();
    showSlide(n);
    startSlideShow();
  };

  // Initialize Auto Slide
  startSlideShow();

  // --- SWIPE LOGIC FOR TOUCH SCREENS ---
  if (sliderContainer) {
    sliderContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      stopSlideShow(); // Pause auto-slide when user touches
    }, { passive: true });

    sliderContainer.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
      startSlideShow(); // Resume auto-slide
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 50; // Swipe distance required
    if (startX - endX > threshold) {
      // Swipe Left (Next)
      slideIndex++;
      showSlide(slideIndex);
    } else if (endX - startX > threshold) {
      // Swipe Right (Previous)
      slideIndex--;
      showSlide(slideIndex);
    }
  }
});
});