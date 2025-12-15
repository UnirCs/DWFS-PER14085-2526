let url = "https://api.chucknorris.io/jokes/random";

async function getApi() {
  let result = await fetch(url);
  let jsonResult = await result.json();
  let txtJoke = document.querySelector("#p-joke");
  txtJoke.innerHTML = jsonResult.value;
}
