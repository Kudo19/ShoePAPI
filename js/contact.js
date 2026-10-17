
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("shoePAPICart")) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);

    document.querySelectorAll("[data-cart-count]").forEach(element => {
      element.textContent = count;
    });
  }

  updateCartCount();


document.addEventListener("DOMContentLoaded", function () {
  const faqToggles = document.querySelectorAll("[data-faq-toggle]");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const answer = document.getElementById(toggle.getAttribute("aria-controls"));
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      faqToggles.forEach((otherToggle) => {
        const otherAnswer = document.getElementById(
          otherToggle.getAttribute("aria-controls")
        );
        const isOtherToggle = otherToggle === toggle;
        const shouldExpand = isOtherToggle && !isExpanded;

        otherToggle.setAttribute("aria-expanded", String(shouldExpand));
        otherAnswer.classList.toggle("hidden", !shouldExpand);
        otherToggle.querySelector(".faq-icon").textContent = shouldExpand ? "−" : "+";
      });
    });
  });

  const contactForm = document.getElementById("contactForm");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const topicInput = document.getElementById("topic");
  const messageInput = document.getElementById("msg");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const topicError = document.getElementById("topicError");
  const messageError = document.getElementById("msgError");
  const formSuccess = document.getElementById("formSuccess");

  // Clear an error when the user edits the corresponding field.
  function clearError(input, errorElement) {
    input.addEventListener("input", function () {
      errorElement.textContent = "";
      formSuccess.textContent = "";
    });

    input.addEventListener("change", function () {
      errorElement.textContent = "";
      formSuccess.textContent = "";
    });
  }

  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearError(topicInput, topicError);
  clearError(messageInput, messageError);

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Read and clean the input values.
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const topic = topicInput.value;
    const message = messageInput.value.trim();

    // Clear previous validation messages.
    nameError.textContent = "";
    emailError.textContent = "";
    topicError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

    // NAME VALIDATION
    if (name === "") {
      nameError.textContent = "Name is required.";
      isValid = false;
    } else if (name.length < 2) {
      nameError.textContent = "Name must contain at least 2 characters.";
      isValid = false;
    } else if (name.length > 100) {
      nameError.textContent = "Name cannot exceed 100 characters.";
      isValid = false;
    }

    // EMAIL VALIDATION
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (email.length > 254 || !emailPattern.test(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // TOPIC VALIDATION
    const allowedTopics = [
      "Order status",
      "Sizing help",
      "Returns & exchanges",
      "Other"
    ];

    if (!allowedTopics.includes(topic)) {
      topicError.textContent = "Please select a valid topic.";
      isValid = false;
    }

    // MESSAGE VALIDATION
    if (message === "") {
      messageError.textContent = "Message is required.";
      isValid = false;
    } else if (message.length < 10) {
      messageError.textContent =
        "Message must contain at least 10 characters.";
      isValid = false;
    } else if (message.length > 2000) {
      messageError.textContent =
        "Message cannot exceed 2,000 characters.";
      isValid = false;
    }

    // Stop submission if validation fails.
    if (!isValid) {
      const firstInvalidField = [
        [nameInput, nameError],
        [emailInput, emailError],
        [topicInput, topicError],
        [messageInput, messageError]
      ].find(([input, error]) => error.textContent !== "");

      if (firstInvalidField) {
        firstInvalidField[0].focus();
      }

      return;
    }

    // All fields passed validation.
    formSuccess.textContent =
      `Thank you, ${name}! Your message passed validation.`;

    // Reset the form after successful validation.
    contactForm.reset();
  });
});
