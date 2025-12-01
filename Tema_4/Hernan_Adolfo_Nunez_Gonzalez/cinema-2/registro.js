/* 
===========================================
UNIR - Desarrollo Web - TEMA 4: DOM y Backend
Este archivo es una versión avanzada distinta al Tema 2.
Posee cambios de preselección, mejoras de renderizado,
refactorización SonarQube y lógica extendida.
===========================================
*/
//=========================
//🎬 UNIR-CINEMA - registro.js:
//=========================

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("registrar");
    if (!btn) {
        console.error("❌ No se encontró el botón #registrar");
        return;
    }

    btn.addEventListener("click", () => {

        //📌 Leer valores del formulario
        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const pass = document.getElementById("password").value.trim();
        const pass2 = document.getElementById("password2").value.trim();
        const email = document.getElementById("email").value.trim();

        if (pass !== pass2) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        //📌 Guardar datos en localStorage (evita warnings Sonar)
        const datosUsuario = { nombre, usuario, email };
        localStorage.setItem("usuarioCine", JSON.stringify(datosUsuario));

        //📌 Activar preselección en la sala
        localStorage.setItem("preseleccionarButaca", "1");

        //📌 Redirigir usando globalThis (recomendación de Sonar)
        globalThis.location.href = "index.html";
    });

});