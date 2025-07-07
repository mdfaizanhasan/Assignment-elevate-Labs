document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  const successMessage = document.getElementById('successMessage');

  // Add event listeners for real-time validation
  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  messageInput.addEventListener('blur', validateMessage);

  // Form submission event
  contactForm.addEventListener('submit', function (event) {
    // Prevent the form from submitting by default
    event.preventDefault();

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    // If all validations pass, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
      // In a real application, you would send the form data to a server here
      // For this example, we'll just show the success message
      successMessage.classList.remove('hidden');

      // Reset the form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(function () {
        successMessage.classList.add('hidden');
      }, 5000);
    }
  });

  // Validation functions
  function validateName() {
    const nameValue = nameInput.value.trim();

    if (nameValue === '') {
      setError(nameInput, nameError, 'Name is required');
      return false;
    } else if (nameValue.length < 2) {
      setError(nameInput, nameError, 'Name must be at least 2 characters');
      return false;
    } else {
      setSuccess(nameInput, nameError);
      return true;
    }
  }

  function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === '') {
      setError(emailInput, emailError, 'Email is required');
      return false;
    } else if (!emailRegex.test(emailValue)) {
      setError(emailInput, emailError, 'Please enter a valid email address');
      return false;
    } else {
      setSuccess(emailInput, emailError);
      return true;
    }
  }

  function validateMessage() {
    const messageValue = messageInput.value.trim();

    if (messageValue === '') {
      setError(messageInput, messageError, 'Message is required');
      return false;
    } else if (messageValue.length < 10) {
      setError(
        messageInput,
        messageError,
        'Message must be at least 10 characters'
      );
      return false;
    } else {
      setSuccess(messageInput, messageError);
      return true;
    }
  }

  // Helper functions
  function setError(input, errorElement, message) {
    input.classList.add('invalid');
    errorElement.innerText = message;
  }

  function setSuccess(input, errorElement) {
    input.classList.remove('invalid');
    errorElement.innerText = '';
  }
});
