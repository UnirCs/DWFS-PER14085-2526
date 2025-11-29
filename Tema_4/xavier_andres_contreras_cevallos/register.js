const addErrorMessage = (inputElement, message) => {
  removeErrorMessage(inputElement);
  const errorElement = document.createElement("span");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.color = "red";
  inputElement.style.borderColor = "red";
  inputElement.parentNode.appendChild(errorElement);
};

const removeErrorMessage = (inputElement) => {
  const errorMsg = inputElement.parentNode.querySelector(".error-message");
  if (errorMsg) errorMsg.remove();
  inputElement.style.borderColor = "";
};

const validateInputs = (inputElement, form) => {
  const value = inputElement.value.trim();
  const id = inputElement.id;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordValue = form.querySelector("#password").value.trim();
  const errorMessages = {
    username: "Username cannot be empty.",
    fullname: "Full name cannot be empty.",
    email: "Please enter a valid email address.",
    password: "Password must be more than 6 characters.",
    confirm_password: "Passwords do not match.",
  };

  let message = "";

  switch (id) {
    case "username":
      if (!value) message = errorMessages.username;
      break;
    case "fullname":
      if (!value) message = errorMessages.fullname;
      break;
    case "email":
      if (!emailPattern.test(value)) message = errorMessages.email;
      break;
    case "password":
      if (value.length <= 6) message = errorMessages.password;
      break;
    case "confirm_password":
      if (!value || value !== passwordValue) message = errorMessages.confirm_password;
      break;
    default:
      break;
  }

  if (message) {
    addErrorMessage(inputElement, message);
    return false;
  }

  removeErrorMessage(inputElement);
  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  const inputs = form.querySelectorAll("input:not([type='submit'])");

  inputs.forEach((input) =>
    input.addEventListener("input", () => validateInputs(input, form))
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let hasErrors = false;

    inputs.forEach((input) => {
      const isValid = validateInputs(input, form);
      if (!isValid) hasErrors = true;
    });

    if (!hasErrors) {
      alert("Registration successful!");
      window.location.href = "cinema.html";
      inputs.forEach(removeErrorMessage);
    } else {
      alert("Please fix the errors in the form before submitting.");
    }
  });
});
