async function fetchSincrono() {
    let url = "https://api.chucknorris.io/jokes/random";
    let fetchResponse = await fetch(url);
    let json = await fetchResponse.json();
    let chuck = json.value;
    //console.log("Fact sincrono: " + fact);
    return chuck;
}

generar = async () => {
    const chiste = await fetchSincrono();
     document.getElementById("resultado").textContent = chiste;
};
