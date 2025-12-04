// Constantes de configuración
const API_ENDPOINT = 'https://api.chucknorris.io/jokes/random';
const MESSAGES = {
    initial: 'Presiona el botón para obtener un chiste de Chuck Norris...',
    error: 'Oops! No se pudo obtener el chiste. Intenta de nuevo.'
};

/**
 * Función para obtener un chiste aleatorio de Chuck Norris
 * Utiliza Fetch API y promesas para realizar la petición asíncrona
 */
function getJoke() {
    const jokeText = document.getElementById('jokeText');
    const jokeContainer = document.getElementById('jokeContainer');
    const loader = document.getElementById('loader');
    const button = document.getElementById('jokeButton');

    // Mostrar loader y deshabilitar botón
    loader.classList.remove('hidden');
    jokeContainer.classList.add('loading');
    button.disabled = true;

    // Realizar petición a la API
    fetch(API_ENDPOINT)
        .then(response => {
            // Verificar que la respuesta sea exitosa
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            // Convertir la respuesta a JSON
            return response.json();
        })
        .then(data => {
            // Actualizar el contenido del párrafo con el chiste
            jokeText.innerHTML = `"${data.value}"`;
            
            // Ocultar loader y aplicar animación
            loader.classList.add('hidden');
            jokeContainer.classList.remove('loading');
            jokeContainer.classList.add('fade-in');
            
            // Remover clase de animación después de completarse
            setTimeout(() => {
                jokeContainer.classList.remove('fade-in');
            }, 600);
        })
        .catch(error => {
            // Manejar errores
            console.error('Error al obtener el chiste:', error);
            jokeText.innerHTML = MESSAGES.error;
            loader.classList.add('hidden');
            jokeContainer.classList.remove('loading');
        })
        .finally(() => {
            // Rehabilitar el botón
            button.disabled = false;
        });
}

// Evento alternativo usando addEventListener (buena práctica)
document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('jokeButton');
    
    // Agregar efecto de ripple al botón
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});
