document.addEventListener("DOMContentLoaded", () => {
  // Asignar manejadores de eventos a los campos del formulario
  // Usamos 'blur' para validar cuando el usuario deja el campo
  document
    .getElementById("fullName")
    .addEventListener("blur", validateFullName);
  document
    .getElementById("username")
    .addEventListener("blur", validateUsername);
  document
    .getElementById("password")
    .addEventListener("blur", validatePassword);
  document
    .getElementById("confirmPassword")
    .addEventListener("blur", validateConfirmPassword);
  document.getElementById("email").addEventListener("blur", validateEmail);

  document.getElementById("userForm").addEventListener("submit", submitForm);
});

function createErrorMessage(id, message) {
  let existingMessage = document.getElementById(id + "Error");
  if (!existingMessage) {
    let errorMessage = document.createElement("p");
    errorMessage.id = id + "Error";
    errorMessage.textContent = message;
    errorMessage.classList.add("mt-2.5", "text-sm", "text-red-600");
    document.getElementById(id).insertAdjacentElement("afterend", errorMessage);
  }
}

function removeErrorMessage(id) {
  let existingMessage = document.getElementById(id + "Error");
  if (existingMessage) {
    existingMessage.remove();
  }
}

function validateFullName() {
  let input = document.getElementById("fullName");
  if (input.value.trim() === "") {
    createErrorMessage("fullName", "El nombre y apellidos son obligatorios.");
    return false;
  }
  removeErrorMessage("fullName");
  return true;
}

function validateUsername() {
  let input = document.getElementById("username");
  if (input.value.trim() === "") {
    createErrorMessage("username", "El nombre de usuario es obligatorio.");
    return false;
  }
  removeErrorMessage("username");
  return true;
}

function validatePassword() {
  let input = document.getElementById("password");
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(input.value)) {
    createErrorMessage(
      "password",
      "La contraseña debe tener mínimo 8 caracteres y contener números y letras."
    );
    return false;
  }
  removeErrorMessage("password");
  return true;
}

function validateConfirmPassword() {
  let password = document.getElementById("password").value;
  let confirmInput = document.getElementById("confirmPassword");
  if (password !== confirmInput.value) {
    createErrorMessage("confirmPassword", "Las contraseñas no coinciden.");
    return false;
  }
  removeErrorMessage("confirmPassword");
  return true;
}

function validateEmail() {
  let input = document.getElementById("email");
  // Regex estándar para validación de email
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.value.trim())) {
    createErrorMessage("email", "Por favor, introduce un email válido.");
    return false;
  }
  removeErrorMessage("email");
  return true;
}

function submitForm(event) {
  event.preventDefault();
  
  const isFullNameValid = validateFullName();
  const isUsernameValid = validateUsername();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isEmailValid = validateEmail();

  if (isFullNameValid && isUsernameValid && isPasswordValid && isConfirmPasswordValid && isEmailValid) {
    alert("Formulario enviado con éxito!");
    window.location.replace("cinema.html");
  } else {
    alert("Por favor, corrija los errores antes de enviar el formulario.");
  }
}
