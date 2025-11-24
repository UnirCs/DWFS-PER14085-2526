document.getElementById("boton-generar-chiste").onclick = generarChiste;

parrafoChiste = document.getElementById("chiste");

async function generarChiste() {
  responseChiste = await fetch("https://api.chucknorris.io/jokes/random");
  chiste = await responseChiste.json().then((json) => json.value);
  console.log(chiste);
  parrafoChiste.textContent = chiste;
}
