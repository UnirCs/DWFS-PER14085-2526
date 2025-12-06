document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("name")
        .addEventListener("blur", validateName);
    document
        .getElementById("userName")
        .addEventListener("blur", validateUserName);
    document
        .getElementById("email")
        .addEventListener("blur", validateEmail);
    document
        .getElementById("password")
        .addEventListener("blur", validatePassword);
    document
        .getElementById("confirmPassword")
        .addEventListener("blur", checkPasswordMatch);
    document
        .getElementById("password")
        .addEventListener("blur", checkPasswordMatch);
    document
        .getElementById("registerForm")
        .addEventListener("submit", submitForm);
});
const errorTag = "_error";
const successTag = "_success";

/**
 * Create error message for invalid input.
 * @param id id of the input field
 * @param message message to display
 */
const createErrorMessage = (id, message) => {
    const idError = id + errorTag;
    let existingMessage = document.getElementById(idError);
    if (!existingMessage) {
        let paragraph = document.createElement('p');
        paragraph.id = idError;
        paragraph.textContent = message;
        paragraph.className = 'mt-1 text-sm text-red-600 dark:text-red-400';
        document.getElementById(id).insertAdjacentElement('afterend', paragraph);
        let existingMessage = document.getElementById(id + successTag);
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

/**
 * Create success message for valid input.
 * @param id id of the input field
 * @param message message to display
 */
const createSuccessMessage = (id, message) => {
    const idSuccess = id + successTag;
    let existingMessage = document.getElementById(idSuccess);
    if (!existingMessage) {
        let paragraph = document.createElement('p');
        paragraph.id = idSuccess;
        paragraph.textContent = message;
        paragraph.className = 'mt-1 text-sm text-green-600 dark:text-green-400';
        document.getElementById(id).insertAdjacentElement('afterend', paragraph);
        let existingMessage = document.getElementById(id + errorTag);
        if (existingMessage) {
            existingMessage.remove();
        }
    }
}

/**
 * Validate name input field.
 */
const validateName = () => {
    const id = "name";
    let input = document.getElementById(id);
    if (input.value.length < 10) {
        createErrorMessage(id, "El nombre debe tener al menos 10 caracteres.");
    } else {
        createSuccessMessage(id, "Valor Valido!");
    }
}

/**
 * Validate userName input field.
 */
const validateUserName = () => {
    const id = "userName";
    let input = document.getElementById(id);
    if (input.value.length < 10) {
        createErrorMessage(id, "El nombre de usuario debe tener al menos 10 caracteres.");
    } else {
        createSuccessMessage(id, "Valor Valido!");
    }
}

/**
 * Validate email input field.
 */
const validateEmail = () => {
    const id = "email";
    let input = document.getElementById(id);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(input.value)) {
        createErrorMessage(id, "Ingrese un email válido.");
    } else {
        createSuccessMessage(id, "Valor Valido!");
    }
}

/**
 * Validate password input field.
 */
const validatePassword = () => {
    const id = "password";
    let input = document.getElementById(id);
    if (input.value.length < 8) {
        createErrorMessage(id, "La contraseña debe tener al menos 8 caracteres.");
    } else {
        createSuccessMessage(id, "Valor Valido!");
    }
}

/**
 * Check if password and confirm password match.
 */
const checkPasswordMatch = () => {
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const id = "confirmPassword";
    if (confirmPasswordInput.value.length > 0 && passwordInput.value.length > 0 && !confirmPasswordInput.value.input < 8 && passwordInput.value === confirmPasswordInput.value) {
        createSuccessMessage(id, "Las contraseñas coinciden.");
    } else {
        createErrorMessage(id, "Las contraseñas no coinciden o invalidas.");
    }
}

/**
 * Handle form submission.
 * @param event
 */
const submitForm = (event) => {
    event.preventDefault();
    validateName();
    validateUserName();
    validateEmail();
    validatePassword();
    checkPasswordMatch();

    let errorMessages = document.querySelectorAll("p[id$='" + errorTag + "']");
    if (errorMessages.length === 0) {
        window.location.href = "cinema.html";
    } else {
        alert("Por favor, corrija los errores en el formulario antes de enviar.");
    }
}

