document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nombre').addEventListener('change', validateNombre);
    document.getElementById('usuario').addEventListener('change', validateUsuario);
    document.getElementById('contraseña').addEventListener('change', validateContraseña);
    document.getElementById('email').addEventListener('change', validateEmail);
});

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

const removeErrorMessage = (id) => {
    let existingMessage = document.getElementById(id + 'Error');
    if (existingMessage) {
        existingMessage.remove();
    }
};

const validateNombre = () => {
    let nombre = document.getElementById('nombre').value;
    if (nombre.trim() === '') {
        createErrorMessage('nombre', 'El nombre y apellidos son obligatorios.');
    } else {
        removeErrorMessage('nombre');
    }
};

const validateUsuario = () => {
    let usuario = document.getElementById('usuario').value;
    if (usuario.trim() === '') {
        createErrorMessage('usuario', 'El nombre de usuario es obligatorio.');
    } else {
        removeErrorMessage('usuario');
    }
};

const validateContraseña = () => {
    let contraseña = document.getElementById('contraseña').value;
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (!passwordRegex.test(contraseña)) {
        createErrorMessage('contraseña', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    } else {
        removeErrorMessage('contraseña');
    }
};

const validateEmail = () => {
    let email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage('email', 'Por favor, introduce un email válido.');
    } else {
        removeErrorMessage('email');
    }
};

document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    validateNombre();
    validateUsuario();
    validateContraseña();
    validateEmail();

    let errorMessages = document.querySelectorAll('form p');
    if (errorMessages.length === 0) {
        alert('Formulario enviado con éxito!');
        window.location.replace('index.html');
    } else {
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});