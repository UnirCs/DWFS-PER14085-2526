const validateName = (name) => {
    let errorMessage = "";
    if (name.length <= 0) {
        errorMessage = "Name is required";
    }
    return errorMessage;
};
const validateUsername = (username) => {
    let errorMessage = "";
    if (username.length <= 0) {
        errorMessage = "Username is required";
    }
    return errorMessage;
};
const validateEmail = (email) => {
    let errorMessage = "";
    if (email.length <= 0) {
        errorMessage = "Email is required";
    }
    return errorMessage;
};
const validatePassword = (password) => {
    let errorMessage = "";
    if (password.length <= 0) {
        errorMessage = "Password is required";
    } else if (password.length < 8) {
        errorMessage = "Password must be at least 8 characters long";
    } else if (!/\d/.test(password)) {
        errorMessage = "Password must contain at least one number";
    } else if (!/[@$!%*?&]/.test(password)) {
        errorMessage = "Password must contain at least one symbol";
    } else if (!/[A-Z]/.test(password)) {
        errorMessage = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
        errorMessage = "Password must contain at least one lowercase letter";
    }
    return errorMessage;
};
const validateConfirmPassword = (password, confirmPassword) => {
    let errorMessage = "";
    if (confirmPassword.length <= 0) {
        errorMessage = "Confirm password is required";
    } else if (confirmPassword !== password) {
        errorMessage = "Passwords do not match";
    }
    return errorMessage;
};

const resetInputError = (inputId) => {
    const input = document.getElementById(inputId);
    const errorMessage = document.getElementById(inputId + "-error-message");
    const label = document.querySelector(`label[for="${inputId}"]`);

    input.classList.remove("input-error");
    if (label) {
        label.classList.remove("label-error");
    }
    if (errorMessage) {
        errorMessage.textContent = "";
    }
}

const inputIds = [
    "fullname",
    "username",
    "email",
    "password",
    "confirm-password",
];

inputIds.forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener("input", () => {
            resetInputError(inputId);
        });
    }
});

document
    .getElementById("create-account-form")
    .addEventListener("submit", (event) => {
        event.preventDefault();

        document.getElementById("fullname-error-message").textContent = "";
        document.getElementById("username-error-message").textContent = "";
        document.getElementById("email-error-message").textContent = "";
        document.getElementById("password-error-message").textContent = "";
        document.getElementById("confirm-password-error-message").textContent = "";

        const fullname = document.getElementById("fullname").value.trim();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        let name_msg = validateName(fullname);
        let username_msg = validateUsername(username);
        let email_msg = validateEmail(email);
        let password_msg = validatePassword(password);
        let confirm_password_msg = validateConfirmPassword(
            password,
            confirmPassword
        );

        if (name_msg !== "") {
            document.getElementById("fullname-error-message").textContent = name_msg;
            document.getElementById("fullname").classList.add("input-error");
            document.querySelector('label[for="fullname"]').classList.add("label-error");
        }
        if (username_msg !== "") {
            document.getElementById("username-error-message").textContent =
                username_msg;
            document.getElementById("username").classList.add("input-error");
            document.querySelector('label[for="username"]').classList.add("label-error");
        }
        if (email_msg !== "") {
            document.getElementById("email-error-message").textContent = email_msg;
            document.getElementById("email").classList.add("input-error");
            document.querySelector('label[for="email"]').classList.add("label-error");
        }
        if (password_msg !== "") {
            document.getElementById("password-error-message").textContent =
                password_msg;
            document.getElementById("password").classList.add("input-error");
            document.querySelector('label[for="password"]').classList.add("label-error");
        }
        if (confirm_password_msg !== "") {
            document.getElementById("confirm-password-error-message").textContent =
                confirm_password_msg;
            document.getElementById("confirm-password").classList.add("input-error");
            document.querySelector('label[for="confirm-password"]').classList.add("label-error");
        }

        if (name_msg === "" && username_msg === "" && email_msg === "" && password_msg === "" && confirm_password_msg === "") {
            window.location.href = "../dashboard/index.html";
        }
    });
