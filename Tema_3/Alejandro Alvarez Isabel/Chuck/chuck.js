let setOfFacts = new Set();
let url = "https://api.chucknorris.io/jokes/random";

async function getChiste()
{
    try
    {
        const response = await fetch(url);
        const data = await response.json();

        return data.value;
    }
    catch(err)
    {
        console.log("Error al obtener chiste: ", err);
        return "No hay chiste";
    }
}

function chiste()
{
    const text = document.getElementById("chiste--chuck");
    text.style.display = "block";

    getChiste()
        .then(chisteObtenido => {
            text.textContent = chisteObtenido;
        })
        .catch(error => {
            text.textContent = "Error al obtener chiste";
        });
}


