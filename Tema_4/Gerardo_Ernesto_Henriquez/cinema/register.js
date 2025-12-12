document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const emailInput = document.getElementById('email');
    const telefonoInput = document.getElementById('telefono');
    const edadInput = document.getElementById('edad');

    function validarNombre(nombre) {
        const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
        return nombreRegex.test(nombre.trim());
    }

    function validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    }

    function validarTelefono(telefono) {
        const telefonoRegex = /^[0-9]{9,15}$/;
        return telefonoRegex.test(telefono.trim());
    }

    function validarEdad(edad) {
        const edadNum = parseInt(edad, 10);
        return !isNaN(edadNum) && edadNum >= 1 && edadNum <= 120;
    }

    function mostrarError(elementoId, mensaje) {
        const errorElement = document.getElementById('error' + elementoId);
        if (errorElement) {
            errorElement.textContent = mensaje;
            errorElement.style.display = mensaje ? 'block' : 'none';
        }
    }

    function limpiarErrores() {
        mostrarError('Nombre', '');
        mostrarError('Apellidos', '');
        mostrarError('Email', '');
        mostrarError('Telefono', '');
        mostrarError('Edad', '');
    }

    nombreInput.addEventListener('blur', function() {
        if (!validarNombre(nombreInput.value)) {
            mostrarError('Nombre', 'El nombre debe tener entre 2 y 50 caracteres y solo letras.');
        } else {
            mostrarError('Nombre', '');
        }
    });

    apellidosInput.addEventListener('blur', function() {
        if (!validarNombre(apellidosInput.value)) {
            mostrarError('Apellidos', 'Los apellidos deben tener entre 2 y 50 caracteres y solo letras.');
        } else {
            mostrarError('Apellidos', '');
        }
    });

    emailInput.addEventListener('blur', function() {
        if (!validarEmail(emailInput.value)) {
            mostrarError('Email', 'Por favor, introduce un email válido.');
        } else {
            mostrarError('Email', '');
        }
    });

    telefonoInput.addEventListener('blur', function() {
        if (!validarTelefono(telefonoInput.value)) {
            mostrarError('Telefono', 'El teléfono debe tener entre 9 y 15 dígitos.');
        } else {
            mostrarError('Telefono', '');
        }
    });

    edadInput.addEventListener('blur', function() {
        if (!validarEdad(edadInput.value)) {
            mostrarError('Edad', 'La edad debe ser un número entre 1 y 120.');
        } else {
            mostrarError('Edad', '');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        limpiarErrores();

        let esValido = true;

        if (!validarNombre(nombreInput.value)) {
            mostrarError('Nombre', 'El nombre debe tener entre 2 y 50 caracteres y solo letras.');
            esValido = false;
        }

        if (!validarNombre(apellidosInput.value)) {
            mostrarError('Apellidos', 'Los apellidos deben tener entre 2 y 50 caracteres y solo letras.');
            esValido = false;
        }

        if (!validarEmail(emailInput.value)) {
            mostrarError('Email', 'Por favor, introduce un email válido.');
            esValido = false;
        }

        if (!validarTelefono(telefonoInput.value)) {
            mostrarError('Telefono', 'El teléfono debe tener entre 9 y 15 dígitos.');
            esValido = false;
        }

        if (!validarEdad(edadInput.value)) {
            mostrarError('Edad', 'La edad debe ser un número entre 1 y 120.');
            esValido = false;
        }

        if (esValido) {
            window.location.replace('cinema.html');
        }
    });
});

