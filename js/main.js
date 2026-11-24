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
  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector(".dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      if (window.innerWidth <= 768) {
        const isAlreadyOpen = item.classList.contains("accordion-open");
        closeAllDropdowns(item);

        if (isAlreadyOpen) {
          item.classList.remove("accordion-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("accordion-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      } else {
        const isAlreadyOpen = item.classList.contains("dropdown-open");
        closeAllDropdowns(item);

        if (isAlreadyOpen) {
          item.classList.remove("dropdown-open");
          trigger.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("dropdown-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      }
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
});