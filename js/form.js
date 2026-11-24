document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("enquiryForm"); // assuming ID is enquiryForm
  const phoneInput = document.getElementById("phone"); // assuming ID is phone
  const phoneError = document.getElementById("phoneError");
  const submitBtn = document.getElementById("submitBtn"); // assuming ID is submitBtn

  if (form && phoneInput) {
    // Validate on input to clear errors
    phoneInput.addEventListener("input", function() {
      this.value = this.value.replace(/[^0-9]/g, ''); // Allow only numbers
      if (this.value.length > 10) {
        this.value = this.value.slice(0, 10); // Limit to 10 chars
      }
      
      if (phoneError) phoneError.style.display = "none";
      phoneInput.style.borderColor = "#e5e7eb";
    });

    form.addEventListener("submit", function(e) {
      const phoneValue = phoneInput.value.trim();
      // Indian mobile numbers are 10 digits, starting with 6, 7, 8, or 9
      const indianMobileRegex = /^[6-9]\d{9}$/;

      if (!indianMobileRegex.test(phoneValue)) {
        e.preventDefault(); // Stop submission
        if (phoneError) phoneError.style.display = "block";
        phoneInput.style.borderColor = "red";
        phoneInput.focus();
        return false;
      }

      // If valid, let it submit (Web3Forms will handle it)
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
    });
  }
});