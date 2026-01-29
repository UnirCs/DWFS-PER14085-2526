document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fullName').addEventListener('change', validarNombre);
    document.getElementById('username').addEventListener('change', validarUsuario);
    document.getElementById('password').addEventListener('change', validarContrasena);
    document.getElementById('confirmPassword').addEventListener('change', confirmarContrasena);
    document.getElementById('email').addEventListener('change', validarCorreo);
});

function validarNombre () {
    let fullName = document.getElementById('fullName');

    if (fullName.value.trim() === '') {
        fullName.classList.add('error');
    } else {
        fullName.classList.remove('error');
    }
}

function validarUsuario () {
    let username = document.getElementById('username');

    if (username.value.trim() === '' || username.value.includes(' ')) {
        username.classList.add('error');
    } else {
        username.classList.remove('error');
    }
}

function validarContrasena () {
    let contrasena = document.getElementById('password');

    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]{6,}$/;

    if (passwordRegex.test(contrasena.value)) {
        contrasena.setCustomValidity('');
        contrasena.classList.remove('error');
    } else {
        contrasena.classList.add('error');
        contrasena.setCustomValidity('La contraseña debe tener mínimo 6 caracteres, incluir letras, números y caracteres especiales (@, #, $, %, &, *).');
    }
}

function confirmarContrasena () {
    let confCont = document.getElementById('confirmPassword');
    let cont = document.getElementById('password');

    if (confCont.value === cont.value  && cont.value.trim() !== '') {
        cont.classList.remove('error');
        confCont.classList.remove('error');
        confCont.setCustomValidity('');
    } else {
        cont.classList.add('error');
        confCont.classList.add('error');
        confCont.setCustomValidity('Las contraseñas tienen que ser iguales.');
    }
}

function validarCorreo () {
    let email = document.getElementById('email');

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email.value)) {
        email.setCustomValidity('');
        email.classList.remove('error');
    } else {
        email.classList.add('error');
        email.setCustomValidity('Por favor, introduce un correo válido (ej: usuario@dominio.com)');
    }
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault();

    validarNombre();
    validarUsuario();
    validarContrasena();
    confirmarContrasena();
    validarCorreo();

    let error = document.querySelectorAll('.error');

    if (error.length === 0) {
        alert('Formulario enviado correctamente');
        location.replace('cinema.html');
    } else {
        document.getElementById('form').reportValidity();
        alert('Por favor, corrija los errores antes de enviar el formulario.');
    }
});