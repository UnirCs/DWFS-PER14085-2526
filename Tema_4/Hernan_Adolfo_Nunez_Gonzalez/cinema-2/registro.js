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
        
        const nombre = document.getElementById("nombre").value.trim();
        const usuario = document.getElementById("usuario").value.trim();
        const pass = document.getElementById("password").value.trim();
        const pass2 = document.getElementById("password2").value.trim();
        const email = document.getElementById("email").value.trim();
        
        if (pass !== pass2) {
           alert("Las contraseñas no coinciden.");
           return;
        }
        
        //Guardar usuario en localStorage (si lo requiere).
        localStorage.setItem("usuarioCine", usuario);
        
        //=================================================
        //NUEVO:
        //Indicar que al cargar la sala debe preseleccionar
        //la última butaca de la matriz (ID 100 en 10x10).
        //=================================================
        localStorage.setItem("preseleccionarButaca", "1");
        
        //Redirigir a la sala de cine:
        window.location.href = "index.html";
    });

});