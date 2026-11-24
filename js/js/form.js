document.addEventListener("DOMContentLoaded", function () {
  const enquiryForm = document.getElementById("enquiryForm");
  if (!enquiryForm) return;

  const fullNameInput = document.getElementById("fullName");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const submitBtn = document.getElementById("submitBtn");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  function setError(inputEl, errorEl, message) {
    inputEl.classList.add("is-invalid");
    errorEl.textContent = message;
  }

  function clearError(inputEl, errorEl) {
    inputEl.classList.remove("is-invalid");
    errorEl.textContent = "";
  }

  function validateName() {
    const value = fullNameInput.value.trim();
    if (value === "") {
      setError(fullNameInput, nameError, "Please enter your full name.");
      return false;
    }
    clearError(fullNameInput, nameError);
    return true;
  }

  function validatePhone() {
    const digitsOnly = phoneInput.value.replace(/\D/g, "");
    if (!/^\d{10}$/.test(digitsOnly)) {
      setError(phoneInput, phoneError, "Please enter a valid 10-digit mobile number.");
      return false;
    }
    phoneInput.value = digitsOnly;
    clearError(phoneInput, phoneError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(value)) {
      setError(emailInput, emailError, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  // Real-time feedback while user types
  fullNameInput.addEventListener("input", validateName);
  phoneInput.addEventListener("input", function () {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    if (phoneError.textContent !== "") validatePhone();
  });
  emailInput.addEventListener("input", function () {
    if (emailError.textContent !== "") validateEmail();
  });

  // Form submission validation
  enquiryForm.addEventListener("submit", function (event) {
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const isEmailValid = validateEmail();

    if (!isNameValid || !isPhoneValid || !isEmailValid) {
      event.preventDefault();
      if (!isNameValid) {
        fullNameInput.focus();
      } else if (!isPhoneValid) {
        phoneInput.focus();
      } else {
        emailInput.focus();
      }
      return;
    }

    // Disable submit button and change text to "Sending..."
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
  });
});