document.addEventListener('DOMContentLoaded', function () {

    const formulario = document.getElementById('formularioRegistro');
    const entradaNombresApellidos = document.getElementById('nombresApellidos');
    const entradaNombreUsuario = document.getElementById('nombreUsuario');
    const entradaTelefono = document.getElementById('telefono');
    const entradaContrasena = document.getElementById('contrasena');
    const entradaConfirmarContrasena = document.getElementById('confirmarContrasena');
    const botonEnviar = document.getElementById('botonEnviar');

    const botonAlternarContrasena = document.getElementById('alternarContrasena');
    const botonAlternarConfirmarContrasena = document.getElementById('alternarConfirmarContrasena');

    const selectorTamanoTexto = document.getElementById('tamanoTexto');
    const interruptorTema = document.getElementById('interruptorTema');

    const crearMensajeError = (id, mensaje) => {
        let mensajeExistente = document.getElementById(id + 'Error');
        if (!mensajeExistente) {
            let mensajeError = document.createElement('p');
            mensajeError.id = id + 'Error';
            mensajeError.textContent = mensaje;
            mensajeError.classList.add('formulario-registro__error', 'mostrar');
            document.getElementById(id).insertAdjacentElement('afterend', mensajeError);
        } else {
            mensajeExistente.textContent = mensaje;
            mensajeExistente.classList.add('mostrar');
        }

        document.getElementById(id).classList.add('invalido');
        document.getElementById(id).classList.remove('valido');
    };

    const eliminarMensajeError = (id) => {
        let mensajeExistente = document.getElementById(id + 'Error');
        if (mensajeExistente) {
            mensajeExistente.classList.remove('mostrar');
            setTimeout(() => {
                if (mensajeExistente.parentNode) {
                    mensajeExistente.remove();
                }
            }, 300);
        }

        document.getElementById(id).classList.remove('invalido');
        document.getElementById(id).classList.add('valido');
    };

    const validarNombresApellidos = () => {
        let nombres = entradaNombresApellidos.value;
        let expresionNombres = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,100}$/;

        if (nombres.trim() === '') {
            crearMensajeError('nombresApellidos', 'Los nombres y apellidos son obligatorios.');
            return false;
        } else if (!expresionNombres.test(nombres.trim())) {
            crearMensajeError('nombresApellidos', 'Solo puede contener letras y espacios.');
            return false;
        } else {
            eliminarMensajeError('nombresApellidos');
            return true;
        }
    };

    const validarNombreUsuario = () => {
        let usuario = entradaNombreUsuario.value;
        let expresionUsuario = /^[a-zA-Z0-9_]{4,20}$/;

        if (usuario.trim() === '') {
            crearMensajeError('nombreUsuario', 'El nombre de usuario es obligatorio.');
            return false;
        } else if (usuario.trim().length < 4) {
            crearMensajeError('nombreUsuario', 'Debe tener al menos 4 caracteres.');
            return false;
        } else if (!expresionUsuario.test(usuario.trim())) {
            crearMensajeError('nombreUsuario', 'Solo puede contener letras, números y guiones bajos.');
            return false;
        } else {
            eliminarMensajeError('nombreUsuario');
            return true;
        }
    };

    const validarTelefono = () => {
        let telefono = entradaTelefono.value;
        let expresionTelefono = /^[0-9]{10}$/;

        if (telefono.trim() === '') {
            crearMensajeError('telefono', 'El teléfono es obligatorio.');
            return false;
        } else if (!expresionTelefono.test(telefono.trim())) {
            crearMensajeError('telefono', 'El teléfono debe tener exactamente 10 dígitos.');
            return false;
        } else {
            eliminarMensajeError('telefono');
            return true;
        }
    };

    const validarContrasena = () => {
        let contrasena = entradaContrasena.value;
        let expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (contrasena.trim() === '') {
            crearMensajeError('contrasena', 'La contraseña es obligatoria.');
            return false;
        } else if (contrasena.length < 8) {
            crearMensajeError('contrasena', 'La contraseña debe tener al menos 8 caracteres.');
            return false;
        } else if (!expresionContrasena.test(contrasena)) {
            crearMensajeError('contrasena', 'Debe incluir mayúsculas, minúsculas y números.');
            return false;
        } else {
            eliminarMensajeError('contrasena');
            return true;
        }
    };

    const validarConfirmarContrasena = () => {
        let contrasena = entradaContrasena.value;
        let confirmarContrasena = entradaConfirmarContrasena.value;

        if (confirmarContrasena.trim() === '') {
            crearMensajeError('confirmarContrasena', 'Debes confirmar tu contraseña.');
            return false;
        } else if (contrasena !== confirmarContrasena) {
            crearMensajeError('confirmarContrasena', 'Las contraseñas no coinciden.');
            return false;
        } else {
            eliminarMensajeError('confirmarContrasena');
            return true;
        }
    };

    entradaNombresApellidos.addEventListener('change', validarNombresApellidos);
    entradaNombreUsuario.addEventListener('change', validarNombreUsuario);
    entradaTelefono.addEventListener('change', validarTelefono);
    entradaContrasena.addEventListener('change', validarContrasena);
    entradaConfirmarContrasena.addEventListener('change', validarConfirmarContrasena);

    entradaNombresApellidos.addEventListener('input', function () {
        if (this.classList.contains('invalido')) {
            validarNombresApellidos();
        }
    });

    entradaNombreUsuario.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z0-9_]/g, '');
        if (this.classList.contains('invalido')) {
            validarNombreUsuario();
        }
    });

    entradaTelefono.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.classList.contains('invalido')) {
            validarTelefono();
        }
    });

    entradaContrasena.addEventListener('input', function () {
        if (this.classList.contains('invalido')) {
            validarContrasena();
        }
        if (entradaConfirmarContrasena.value && entradaConfirmarContrasena.classList.contains('invalido')) {
            validarConfirmarContrasena();
        }
    });

    entradaConfirmarContrasena.addEventListener('input', function () {
        if (this.classList.contains('invalido')) {
            validarConfirmarContrasena();
        }
    });

    botonAlternarContrasena.addEventListener('click', function () {
        const tipo = entradaContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
        entradaContrasena.setAttribute('type', tipo);

        const icono = this.querySelector('i');
        icono.classList.toggle('fa-eye');
        icono.classList.toggle('fa-eye-slash');
    });

    botonAlternarConfirmarContrasena.addEventListener('click', function () {
        const tipo = entradaConfirmarContrasena.getAttribute('type') === 'password' ? 'text' : 'password';
        entradaConfirmarContrasena.setAttribute('type', tipo);

        const icono = this.querySelector('i');
        icono.classList.toggle('fa-eye');
        icono.classList.toggle('fa-eye-slash');
    });

    const modificarTamanoTexto = (tamano) => {
        document.body.classList.remove('texto-pequeno', 'texto-mediano', 'texto-grande');
        document.body.classList.add(tamano);
    };

    selectorTamanoTexto.addEventListener('change', function () {
        modificarTamanoTexto(this.value);
    });

    const alternarModoOscuro = () => {
        document.body.classList.toggle('modo-oscuro');
    };

    interruptorTema.addEventListener('change', alternarModoOscuro);

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();

        const nombresValidos = validarNombresApellidos();
        const usuarioValido = validarNombreUsuario();
        const telefonoValido = validarTelefono();
        const contrasenaValida = validarContrasena();
        const confirmarContrasenaValida = validarConfirmarContrasena();

        const mensajesError = document.querySelectorAll('.formulario-registro__error.mostrar');

        if (mensajesError.length === 0 && nombresValidos && usuarioValido &&
            telefonoValido && contrasenaValida && confirmarContrasenaValida) {
            procesarRegistro();
        } else {
            const primerError = document.querySelector('.invalido');
            if (primerError) {
                primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                primerError.focus();
            }
        }
    });
    // se usa window.location.replace() por:
    // No añade entrada al historial - El usuario no puede volver al formulario con el botón "atrás"
    // Más apropiado para registro - Después de registrarse, no tiene sentido volver al formulario
    // Mejor UX - Evita que el usuario accidentalmente vuelva y envíe el formulario dos veces
    function procesarRegistro() {
        console.log('Procesando registro...');
        botonEnviar.classList.add('cargando');
        botonEnviar.disabled = true;

        setTimeout(() => {
            window.location.replace('Cinema/index.html');
        }, 1500);
    }

    const entradas = formulario.querySelectorAll('input:not([type="checkbox"])');
    entradas.forEach(entrada => {
        entrada.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();

                const arregloEntradas = Array.from(entradas);
                const indiceActual = arregloEntradas.indexOf(this);

                if (indiceActual < arregloEntradas.length - 1) {
                    arregloEntradas[indiceActual + 1].focus();
                } else {
                    formulario.dispatchEvent(new Event('submit'));
                }
            }
        });
    });

});
