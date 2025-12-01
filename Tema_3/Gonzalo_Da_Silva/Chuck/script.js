const joke = document.getElementById('joke');
const btn = document.getElementById('new-joke');
const API_URL = 'https://api.chucknorris.io/jokes/random';

const toggleButton = (disabled) => btn.disabled = disabled;

const getJoke = async () => {
    joke.textContent = 'Cargando...';
    toggleButton(true);

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        joke.textContent = data.value;
    } catch {
        joke.textContent = 'Error al cargar la frase :(';
    } finally {
        toggleButton(false);
    }
};

btn.addEventListener('click', getJoke);
getJoke();
