document.addEventListener('DOMContentLoaded', function () {
    
    // Comprobación de los valores del cliente
    const nombre = sessionStorage.getItem("clt-names");
    const email  = sessionStorage.getItem("clt-email");

    // Redirección hacia la página de reserva de asientos
    if (nombre && email) {
        window.location.replace("index.html");
        return;
    }

    const form = document.getElementById('register-form');
    const alertBox = document.getElementById('register-alert');
    const fullNameInput = document.getElementById('full-name');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const emailInput = document.getElementById('email');
    const resetBtn = document.getElementById('btn-reset');

    // Limpia alert al presionar el botón Limpiar (Reset)
    resetBtn.addEventListener('click', function () {
        alertBox.innerHTML = "";
    });

    // Evento submit del botón Registrar
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        alertBox.innerHTML = "";

        const errors = [];

        const fullName = fullNameInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const email = emailInput.value.trim();

        // Validaciones de los campos del formulario
        const usernameRegex = /^[A-Za-z0-9_]{5,15}$/;
        const passwordRegex = /^.{8,15}$/;

        // Nombres y apellidos
        if (!fullName) {
            errors.push("El campo Nombres y apellidos es obligatorio.");
        } else if (fullName.length < 3) {
            errors.push("El nombre completo debe tener al menos 3 caracteres.");
        }

        // Nombre de usuario
        if (!username) {
            errors.push("El campo Nombre de usuario es obligatorio.");
        } else if (!usernameRegex.test(username)) {
            errors.push("El nombre de usuario debe tener entre 5 y 15 caracteres y solo puede contener letras, números y guiones bajos.");
        }

        // Contraseña
        if (!password) {
            errors.push("El campo Contraseña es obligatorio.");
        } else if (!passwordRegex.test(password)) {
            errors.push("La contraseña debe tener entre 8 y 15 caracteres.");
        }

        // Confirmar contraseña
        if (!confirmPassword) {
            errors.push("Debes confirmar la contraseña.");
        } else if (password !== confirmPassword) {
            errors.push("Las contraseñas no coinciden.");
        }

        // Correo electrónico
        if (!email) {
            errors.push("El campo Correo electrónico es obligatorio.");
        } else {
            // Validación adicional de email con Patterns (además de type="email")
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push("El correo electrónico no tiene un formato válido.");
            }
        }

        // Si hay errores, se muestran en el alert
        if (errors.length > 0) {
            const errorList = errors
                .map(msg => `<li>${msg}</li>`)
                .join("");

            alertBox.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            <strong>Se han encontrado errores:</strong>
                            <ul class="mb-0">
                                ${errorList}
                            </ul>
                        </div>
                    `;
            return;
        }

        // Verificación de la validación HTML5
        if (!form.checkValidity()) {
            alertBox.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Por favor revisa los campos marcados en rojo.
                        </div>
                    `;
            return;
        }

        const reservasRaw = sessionStorage.getItem('reservas');
        if (reservasRaw) {
            try {
                const reservas = JSON.parse(reservasRaw);
                if (Array.isArray(reservas)) {
                    const comprobarCorreo = reservas.some(reserva => reserva.email === email);
                    if (comprobarCorreo) {
                        alertBox.innerHTML = `<div class="alert alert-danger" role="alert">
                            El correo electrónico ya tiene una reserva registrada. Por favor utiliza otro correo.
                        </div>`;
                        return;
                    }
                }
            } catch (e) {
                console.error('Ocurrió un error al leer el listado de reservas:', e);
            }
        }

        // Mensaje de registro completado correctamente
        alertBox.innerHTML = `
                    <div class="alert alert-success" role="alert">
                        <i class="fa-solid fa-circle-check me-1"></i>
                        Registro completado correctamente.
                    </div>
                `;

        // Guardar nombre y correo del cliente
        sessionStorage.setItem("clt-names", fullName);
        sessionStorage.setItem("clt-email", email);

        // Redireccionar a la página de reserva de asientos
        window.location.replace("index.html");
    });
});