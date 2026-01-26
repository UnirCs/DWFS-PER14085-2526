document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password === confirmPassword) {

        window.location.href = 'cinema.html';
    } else {
        alert('Las contraseñas no coinciden.');
    }
});
