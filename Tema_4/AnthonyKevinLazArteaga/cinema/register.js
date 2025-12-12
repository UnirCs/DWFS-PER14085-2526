window.onload = () => {
    document.getElementById('fullName').addEventListener('change', validateFullName);
    document.getElementById('username').addEventListener('change', validateUsername);
    document.getElementById('password').addEventListener('change', validatePassword);
    document.getElementById('confirmPassword').addEventListener('change', validateConfirmPassword);
    document.getElementById('email').addEventListener('change', validateEmail);
}

//Agrego validaciones por expresiones regulares.
const isValid = (regex, input) => {
    return regex.test(input);
}

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

let validateFullName = () => {
    const fullnameRegex = /^[A-Za-z'’\- ]{2,40}$/;
    let fullName = document.getElementById('fullName').value;
    if (isValid(fullnameRegex, fullName.trim())) {
        removeErrorMessage('fullName');
    } else {
        createErrorMessage('fullName', 'Por favor debe ingresar al menos un nombre y un apellido.');
    }
};

const validateUsername = () => {
    const usernameRegex = /^[a-zA-Z0-9_-]{1,16}$/;
    let username = document.getElementById('username').value;
    if (isValid(usernameRegex, username.trim())) {
        removeErrorMessage('username');
    } else {
        createErrorMessage('username', 'Por favor debe ingresar un nombre de usuario válido.');
    }
};

const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let password = document.getElementById('password').value;
    if (isValid(passwordRegex, password)) {
        removeErrorMessage('password');
    } else {
        createErrorMessage('password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
    }
};

const validateConfirmPassword = () => {
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (password === confirmPassword) {
        removeErrorMessage('confirmPassword');
    } else {
        createErrorMessage('confirmPassword', 'Las contraseñas no coinciden.');
    }
};

const validateEmail = () => {
    let email = document.getElementById('email').value;
    if (!email.includes('@') || !email.includes('.')) {
        createErrorMessage('email', 'Por favor debe ingresar un email válido.');
    } else {
        removeErrorMessage('email');
    }
};

document.getElementById('userForm').addEventListener('submit', (event) => {
    event.preventDefault();

    validateFullName();
    validateUsername();
    validatePassword();
    validateConfirmPassword();
    validateEmail();

    // Comprobar si hay mensajes de error
    let errorMessages = document.querySelectorAll('form p.error');
    if (errorMessages.length === 0) {
        const originalContent = window.location.href;
        let url = originalContent.replace("register.html", "index.html");
        // Uso replace para que el usuario no vuelva hacia atras y reenvie datos por error.
        window.location.replace(url);
    } else {
        // Hay errores, se informa al usuario
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});
