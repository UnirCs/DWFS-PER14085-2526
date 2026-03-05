function getJoke() {
    const jokeDocument = document.getElementById('joke');

    fetch('https://api.chucknorris.io/jokes/random')
        .then(response => response.json())
        .then(data => jokeDocument.innerHTML = data.value)
        .catch(err => {
            jokeDocument.innerHTML = "Ha ocurrido un error";
            console.log(err)
        });
}