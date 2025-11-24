const dataSource = "https://api.chucknorris.io/jokes/random";

document.getElementById("GenerateJoke").addEventListener("click", async () => {
    const output = document.getElementById("jokeOutput");

    output.textContent = "Loading joke... 😄";

    const joke = await GetJoke();

    output.textContent = joke;
});

async function GetJoke() {
    try {
        const res = await fetch(dataSource);

        if (!res.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await res.json();
        return data.value;

    } catch (error) {
        console.error("Error retrieving the joke:", error);
        return "Oops! Something went wrong trying to load a joke 🤕";
    }
}
