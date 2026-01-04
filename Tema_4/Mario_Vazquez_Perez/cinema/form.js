// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asignar manejadores de eventos a los campos del formulario
    document.getElementById('name').addEventListener('change', validateName);
    document.getElementById('surname').addEventListener('change', validateSurname);
    document.getElementById('username').addEventListener('change', validateUsername);
    document.getElementById('password').addEventListener('change', validatePassword);
    document.getElementById('confirmPassword').addEventListener('change', validateConfirmPassword);
    document.getElementById('email').addEventListener('change', validateEmail);
});

// Crear un mensaje de error y mostrarlo bajo el campo correspondiente
const createErrorMessage = (id, message) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (!existingMessage) {
        let errorMessage = document.createElement('p');
        errorMessage.id = id + 'Error';
        errorMessage.textContent = message;
        errorMessage.classList.add('error');
        document.getElementById(id).insertAdjacentElement('afterend', errorMessage);
    }
};

// Eliminar el mensaje de error si ya no es necesario
const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

// Validar el campo de nombre
const validateName = () => {
    const regex = /^\p{Script=Latin}+(?:\s+\p{Script=Latin}+)*$/u;
    const name = document.getElementById('name').value.trim();
    if (name === '') {
        createErrorMessage('name', 'El nombre es obligatorio.');
    } else if (regex.test(name)) {
        removeErrorMessage('name');
    } else {
        createErrorMessage('name', 'El nombre solo puede contener caracteres alfabéticos.');
    }
};

// Validar el campo de apellidos
const validateSurname = () => {
    const regex = /^\p{Script=Latin}+(?:[ -]\p{Script=Latin}+)*$/u;
    let surname = document.getElementById('surname').value.trim();
    if (surname === '') {
        createErrorMessage('surname', 'Los apellidos son obligatorios.');
    } else if (regex.test(surname)) {
        removeErrorMessage('surname');
    } else {
        createErrorMessage('surname', 'Los apellidos solo pueden contener caracteres alfabéticos.');
    }
};

// Validar el campo de nombre de usuario
const validateUsername = () => {
    const regex = /^[A-Za-z0-9.@\-_#]+$/u;
    let username = document.getElementById('username').value.trim();
    if (username === '') {
        createErrorMessage('username', 'El nombre de usuario es obligatorio.');
    } else if (regex.test(username)) {
        removeErrorMessage('username');
    }
    else {
        createErrorMessage('username', 'El nombre de usuario solo admite caracteres alfanuméricos y los caracteres especiales -, _, . y @.');
    }
};

// Validar el campo de contraseña
const validatePassword = () => {
    let password = document.getElementById('password').value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/u;
    if (passwordRegex.test(password)) {
        removeErrorMessage('password');
    } else {
        createErrorMessage('password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    }
};

// Validar el campo de confirmación de contraseña
const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password === confirmPassword) {
        removeErrorMessage('confirmPassword');
    } else {
        createErrorMessage('confirmPassword', 'Las contraseñas no coinciden.');
    }
};

// Validar el campo de email
const validateEmail = () => {
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/u;
    let email = document.getElementById('email').value.trim();
    if (regex.test(email)) {
        removeErrorMessage('email');
    } else {
        createErrorMessage('email', 'Por favor, introduce un email válido.');
    }
};

// Manejar el evento de envío del formulario
document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Ejecutar todas las validaciones antes de enviar el formulario
    validateName();
    validateSurname();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();

    // Comprobar si hay mensajes de error
    let errorMessages = document.querySelectorAll('form p');
    if (errorMessages.length === 0) {
        // No hay errores, se puede procesar el formulario
        alert('Formulario enviado con éxito!');
        globalThis.location.replace("index.html");
    } else {
        // Hay errores, se informa al usuario
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});