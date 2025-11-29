const controlNombre = "nombre";
const controlUsuario = "usuario";
const controlEmail = "email";
const controlPassword = "password";
const controlRepPassword = "rep_password";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById(controlNombre).addEventListener("change", () => {
        validarNombre(controlNombre);
    });

    document.getElementById(controlUsuario).addEventListener("change", () => {
        validarNombre(controlUsuario);
    });

    document.getElementById(controlPassword).addEventListener("change", () => {
        validarPassword(controlPassword);
    });

    document.getElementById(controlRepPassword).addEventListener("change", () => {
        confirmarPassword(controlPassword, controlRepPassword);
    });

    document.getElementById(controlEmail).addEventListener("change", () => {
        validarEmail(controlEmail);
    });
});

const crearMensajeError = (id, mensaje, control) => {
    let existeMensaje = document.getElementById(id + "Error");
    if (!existeMensaje) {
        let mensajeError = document.createElement("p");
        mensajeError.innerText = mensaje;
        mensajeError.id = id + "Error";
        mensajeError.classList.add("text-danger");
        document.getElementById(id).parentNode.appendChild(mensajeError);
    }
    control.classList.add("border-danger");
};

const removerMensajeError = (id, control) => {
    let existeMensaje = document.getElementById(id + "Error");
    if (existeMensaje) {
        existeMensaje.remove();
    }
    control.classList.remove("border-danger");
};

const validarNombre = (id) => {
    let control = document.getElementById(id);
    if (control.value.length < 3) {
        crearMensajeError(id, 'El ' + id + ' debe tener al menos 3 caracteres.', control);
    } else {
        removerMensajeError(id, control);
    }
}

const validarPassword = (id) => {
    let password = document.getElementById(id);
    let passwordRegex = /^[A-Za-z0-9]{8,}$/;
    if (passwordRegex.test(password.value)) {
        removerMensajeError(id, password);
    } else {
        crearMensajeError(id, "El password debe tener m\u00EDnimo 8 caracteres y contener n\u00FAmeros y letras.", password);
    }
}

const validarEmail = (id) => {
    let email = document.getElementById(id);
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(email.value)) {
        removerMensajeError(id, email);
    } else {
        crearMensajeError(id, 'Ingrese un email correcto.', email);
    }
}

const confirmarPassword = (idPassword, idRepPassword) => {
    let password = document.getElementById(idPassword);
    let rep_password = document.getElementById(idRepPassword);
    if (password.value === rep_password.value) {
        removerMensajeError(idRepPassword, rep_password)
    } else {
        crearMensajeError(idRepPassword, "Los password no coinciden.", rep_password);
    }
}

function GenerarToast (toast) {
    return new bootstrap.Toast(toast)
};

document.getElementById('registro').addEventListener('submit', (event) => {
    event.preventDefault();
    validarNombre(controlNombre);
    validarNombre(controlUsuario);
    validarPassword(controlPassword);
    confirmarPassword(controlPassword, controlRepPassword);
    validarEmail(controlEmail);

    let errorMessages = document.querySelectorAll('form p');
    if (errorMessages.length === 0) {
        let form = document.getElementById('registro');
        form.submit();
    } else {
        let toastCompleto = document.getElementById('liveToast');
        toastCompleto.querySelector("strong").innerText = 'Error en el registro';
        toastCompleto.getElementsByClassName("toast-body")[0].innerHTML = '<i class="bi bi-exclamation-octagon-fill"></i> Revise el formulario y vuelva a intentarlo.';
        let toast = GenerarToast(toastCompleto)
        toast.show();
    }
});
