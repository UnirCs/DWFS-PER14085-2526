document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener los elementos del DOM. ¡Esto debe ir dentro del DOMContentLoaded!
    const chisteDiv = document.getElementById('chiste-contenedor');
    const botonCargar = document.getElementById('cargarChiste');

    const API_URL = 'https://api.chucknorris.io/jokes/random';

    function obtenerChiste() {
        // Indica al usuario que la carga está en progreso
        chisteDiv.textContent = 'Contactando con la fuerza de Chuck Norris...';
        
        // Inicia la petición y maneja la Promesa
        fetch(API_URL)
            .then(respuesta => {
                // Chequeo de la respuesta HTTP
                if (!respuesta.ok) {
                    throw new Error(`¡Imposible contactar! Error HTTP: ${respuesta.status}`);
                }
                // Devuelve una nueva Promesa para convertir a JSON
                return respuesta.json(); 
            })
            .then(datos => {
                // Promesa resuelta: Coloca el valor del chiste en el div
                chisteDiv.textContent = datos.value;
            })
            .catch(error => {
                // Captura cualquier fallo en la cadena de Promesas
                chisteDiv.textContent = `❌ Falló la Promesa: ${error.message}`;
                console.error('Error durante la petición:', error);
            });
    }

    // Configurar el Event Listener para que al hacer clic se obtenga un nuevo chiste
    botonCargar.addEventListener('click', obtenerChiste);

    // Cargar un chiste apenas la página cargue
    obtenerChiste();
});