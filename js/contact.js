/*
  =========================================================
  contact.js  -  contact form validation (only used on contact.html)
  PDF Requirement 5 + PDF: Form validation

  The form is checked when you press "Send Message":
    1. No field is empty
    2. Email format is valid
    3. Phone number contains only digits

  PDF requirements shown in this file:
    - Form validation         -> the whole "submit" handler below
    - No field is empty       -> every "=== """ check
    - Email format is valid   -> emailPattern
    - Phone only digits       -> phonePattern
    - Event handling          -> contactForm "submit" event
    - DOM manipulation        -> showError() / clearError() change text and classes
    - Functions               -> showError(), clearError()
    - Dynamic content updates -> the "Thank you, <name>!" message
  =========================================================
*/


// ===================== GET THE HTML ELEMENTS =====================
// DOM manipulation - grab the form and each input box
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");


// ===================== SHOW / CLEAR AN ERROR =====================

// Shows an error under a field and gives the field a red border
// input   = the input box (e.g. nameInput)
// errorId = the id of the <small> under it (e.g. "nameError")
// message = the text to show
function showError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.classList.add("invalid");   // CSS makes "invalid" fields red
}

// Removes the error from a field
function clearError(input, errorId) {
  document.getElementById(errorId).textContent = "";
  input.classList.remove("invalid");
}


// ===================== WHEN THE FORM IS SUBMITTED =====================
// PDF: Event handling
contactForm.addEventListener("submit", function (event) {
  // Stop the page from refreshing
  event.preventDefault();

  // Get what the user typed in each box (trim() removes extra spaces)
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const message = messageInput.value.trim();

  // This starts as true. If ANY check fails we change it to false.
  let formIsValid = true;

  // Hide the old success message (if any)
  successMessage.textContent = "";


  // ---------- CHECK NAME ----------
  // No field is empty
  if (name === "") {
    showError(nameInput, "nameError", "Please enter your name.");
    formIsValid = false;
  } else {
    clearError(nameInput, "nameError");
  }


  // ---------- CHECK EMAIL ----------
  // This pattern means: some text, then @, then some text, then a dot, then some text
  // e.g.  john@gmail.com  passes,  john@gmail  fails
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    showError(emailInput, "emailError", "Please enter your email address.");
    formIsValid = false;
  } else if (!emailPattern.test(email)) {
    showError(emailInput, "emailError", "Please enter a valid email, e.g. name@example.com");
    formIsValid = false;
  } else {
    clearError(emailInput, "emailError");
  }


  // ---------- CHECK PHONE ----------
  // This pattern means: ONLY the numbers 0-9, at least one of them, nothing else
  const phonePattern = /^[0-9]+$/;

  if (phone === "") {
    showError(phoneInput, "phoneError", "Please enter your phone number.");
    formIsValid = false;
  } else if (!phonePattern.test(phone)) {
    // Phone number contains only digits
    showError(phoneInput, "phoneError", "Phone number must contain only digits (0-9).");
    formIsValid = false;
  } else {
    clearError(phoneInput, "phoneError");
  }


  // ---------- CHECK MESSAGE ----------
  if (message === "") {
    showError(messageInput, "messageError", "Please type a message.");
    formIsValid = false;
  } else {
    clearError(messageInput, "messageError");
  }


  // ---------- ALL GOOD? ----------
  // If nothing failed, send the form to Formspree, then show a thank-you message
  //
  // HOW THE FORMSPREE PART WORKS:
  //   - event.preventDefault() at the top stops the browser from sending the form
  //     on its own, so WE have to send it here with fetch(). Without this fetch,
  //     nothing ever reaches Formspree.
  //   - contactForm.action = the Formspree URL written in contact.html
  //   - new FormData(contactForm) collects every input that has a "name" attribute
  //     (name, email, phone, message). Inputs without "name" are NOT sent.
  //   - The "Accept: application/json" header makes Formspree reply with data
  //     instead of redirecting to its own thank-you page.
  //   - The success message only shows if Formspree says the send worked (response.ok).
  //   - First time only: Formspree emails you a link to confirm the form.
  //     Messages are not delivered until you click it.
  if (formIsValid) {
    fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { "Accept": "application/json" }   // tells Formspree not to redirect
    })
      .then(function (response) {
        if (response.ok) {
          // Dynamic content updates - show a message that uses the person's name
          successMessage.textContent = "Thank you, " + name + "! Your message has been sent.";
          contactForm.reset();   // clears all the boxes
        } else {
          successMessage.textContent = "Sorry, something went wrong. Please try again.";
        }
      })
      .catch(function () {
        successMessage.textContent = "Network error. Please check your connection and try again.";
      });
  }
});
