document.addEventListener("DOMContentLoaded", function () {
  // Indian Number Formatting (e.g., ₹25,00,000)
  function formatINR(value) {
    const rounded = Math.round(value);
    return "₹" + rounded.toLocaleString("en-IN");
  }

  // Standard Reducing Balance EMI Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  function calculateEMI(principal, annualRate, totalMonths) {
    if (principal <= 0 || totalMonths <= 0) {
      return { emi: 0, totalPayable: 0, totalInterest: 0, principal: 0 };
    }

    if (annualRate === 0) {
      const emiZero = principal / totalMonths;
      return {
        emi: emiZero,
        totalPayable: principal,
        totalInterest: 0,
        principal: principal
      };
    }

    const monthlyRate = annualRate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    const emi = (principal * monthlyRate * factor) / (factor - 1);
    const totalPayable = emi * totalMonths;
    const totalInterest = totalPayable - principal;

    return {
      emi: emi,
      totalPayable: totalPayable,
      totalInterest: totalInterest,
      principal: principal
    };
  }

  // Clamp numeric inputs within slider min/max bounds
  function clamp(val, min, max) {
    if (isNaN(val)) return min;
    return Math.min(Math.max(val, min), max);
  }

  // Initialize a calculator instance with two-way slider <-> number binding
  function setupCalculator(config) {
    const amountRange = document.getElementById(config.prefix + "-amount-range");
    const amountNum = document.getElementById(config.prefix + "-amount-num");
    const tenureRange = document.getElementById(config.prefix + "-tenure-range");
    const tenureNum = document.getElementById(config.prefix + "-tenure-num");
    const rateRange = document.getElementById(config.prefix + "-rate-range");
    const rateNum = document.getElementById(config.prefix + "-rate-num");

    const emiOut = document.getElementById(config.prefix + "-emi");
    const principalOut = document.getElementById(config.prefix + "-principal");
    const interestOut = document.getElementById(config.prefix + "-interest");
    const totalOut = document.getElementById(config.prefix + "-total");

    function updateOutputs() {
      const P = parseFloat(amountRange.value);
      const tenureRaw = parseFloat(tenureRange.value);
      const n = config.tenureUnit === "years" ? tenureRaw * 12 : tenureRaw;
      const annualRate = parseFloat(rateRange.value);

      const result = calculateEMI(P, annualRate, n);

      emiOut.textContent = formatINR(result.emi);
      principalOut.textContent = formatINR(result.principal);
      interestOut.textContent = formatINR(result.totalInterest);
      totalOut.textContent = formatINR(result.totalPayable);
    }

    function bindPair(rangeEl, numEl) {
      // Slider -> Number input
      rangeEl.addEventListener("input", function () {
        numEl.value = rangeEl.value;
        updateOutputs();
      });

      // Number input -> Slider (real-time while typing)
      numEl.addEventListener("input", function () {
        const min = parseFloat(rangeEl.min);
        const max = parseFloat(rangeEl.max);
        const val = parseFloat(numEl.value);
        if (!isNaN(val)) {
          rangeEl.value = clamp(val, min, max);
          updateOutputs();
        }
      });

      // Enforce bounds when input loses focus
      numEl.addEventListener("change", function () {
        const min = parseFloat(rangeEl.min);
        const max = parseFloat(rangeEl.max);
        const clamped = clamp(parseFloat(numEl.value), min, max);
        numEl.value = clamped;
        rangeEl.value = clamped;
        updateOutputs();
      });
    }

    bindPair(amountRange, amountNum);
    bindPair(tenureRange, tenureNum);
    bindPair(rateRange, rateNum);

    // Initial calculation
    updateOutputs();

    return {
      setRate: function (newRate) {
        const min = parseFloat(rateRange.min);
        const max = parseFloat(rateRange.max);
        const clamped = clamp(newRate, min, max);
        rateRange.value = clamped;
        rateNum.value = clamped;
        updateOutputs();
      }
    };
  }

  // Initialize all 3 Calculators
  setupCalculator({
    prefix: "pl",
    tenureUnit: "years"
  });

  const carCalc = setupCalculator({
    prefix: "car",
    tenureUnit: "years"
  });

  const twoWheelerCalc = setupCalculator({
    prefix: "tw",
    tenureUnit: "months"
  });

  // Top Tab Switching: [ Personal Loan ] [ Car Loan ] [ Two-Wheeler Loan ]
  const tabButtons = document.querySelectorAll(".calc-tab-btn");
  const tabPanels = document.querySelectorAll(".calc-panel");

  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach(function (b) {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      tabPanels.forEach(function (p) {
        p.classList.remove("active");
      });

      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      const activePanel = document.getElementById("panel-" + target);
      if (activePanel) activePanel.classList.add("active");
    });
  });

  // Car Loan Sub-Toggle: [ New Car ] [ Pre-owned Car ]
  const carToggleBtns = document.querySelectorAll("[data-car-type]");
  carToggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      carToggleBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      const type = btn.getAttribute("data-car-type");
      carCalc.setRate(type === "new" ? 8.25 : 11.5);
    });
  });

  // Two-Wheeler Loan Sub-Toggle: [ Two Wheeler ] [ Super Bike ]
  const bikeToggleBtns = document.querySelectorAll("[data-bike-type]");
  bikeToggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      bikeToggleBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      const type = btn.getAttribute("data-bike-type");
      twoWheelerCalc.setRate(type === "standard" ? 20.9 : 11.5);
    });
  });
});