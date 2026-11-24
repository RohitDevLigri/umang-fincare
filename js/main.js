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

  // 2. Hamburger Menu Toggle (Adds/Removes "open" class on nav menu)
  if (hamburgerBtn && primaryNav) {
    hamburgerBtn.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("open");
      hamburgerBtn.classList.toggle("active", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");

      // Collapse all accordions when closing the mobile drawer
      if (!isOpen) {
        dropdownItems.forEach(function (item) {
          item.classList.remove("accordion-open");
          const trigger = item.querySelector(".dropdown-trigger");
          if (trigger) trigger.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // 3. Mobile Accordion Dropdowns (Insurance, Loan, Company)
  dropdownItems.forEach(function (item) {
    const trigger = item.querySelector(".dropdown-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        const currentlyOpen = item.classList.contains("accordion-open");

        // Close other open accordions
        dropdownItems.forEach(function (otherItem) {
          otherItem.classList.remove("accordion-open");
          const otherTrigger = otherItem.querySelector(".dropdown-trigger");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });

        // Toggle clicked accordion
        if (!currentlyOpen) {
          item.classList.add("accordion-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      }
    });
  });

  // 4. Clean Up Mobile State When Resizing to Desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      if (primaryNav) primaryNav.classList.remove("open");
      if (hamburgerBtn) {
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
      dropdownItems.forEach(function (item) {
        item.classList.remove("accordion-open");
        const trigger = item.querySelector(".dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
      });
    }
  });
});