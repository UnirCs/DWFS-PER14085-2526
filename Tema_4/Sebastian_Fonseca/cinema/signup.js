document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // avoid normal submit

        window.location.replace("index.html");
    });
});

document.querySelectorAll("input").forEach(input => {

    input.addEventListener("blur", () => {
        validateField(input);
        validateAllForm();
    });

    input.addEventListener("input", () => {
        validateField(input);
        validateAllForm();
    });

});

function validateField(input) {

    let value = input.value.trim();
    let valid = true;
    let msg = "";

    if (input.type === "text") {
        valid = value.length >= 3;
        msg = "Must have more than 2 characters";
    }

    if (input.type === "email") {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        msg = "Must be a valid email";
    }

    if (input.type === "password") {
        valid = value.length >= 6;
        msg = "Must have more than 5 characters";
    }

    if (input.id === "password2") {
        const pass1 = document.getElementById("password").value.trim();

        if (value.length < 6) {
            valid = false;
            msg = "Must have more than 5 characters";
        } else if (value !== pass1) {
            valid = false;
            msg = "The passwords do not match";
        } else {
            valid = true;
            msg = "";
        }
    }

    input.classList.remove("input-ok", "input-error");
    input.classList.add(valid ? "input-ok": "input-error");

    const errorElement = document.getElementById(`error-${input.id}`);
    if (errorElement) {
        errorElement.textContent = valid ? "" : msg;
    }
}

function validateAllForm() {
    const form = document.getElementById("registerForm");
    const submitBtn = document.getElementById("submitButton");
    const inputs = form.querySelectorAll("input");
    let allOk = true;

    inputs.forEach(input => {
        if (!input.classList.contains("input-ok")) {
            allOk = false;
        }
    });

    submitBtn.disabled = !allOk;
}

