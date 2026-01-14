const chiste = document.getElementById('chiste')
let txtChiste = document.querySelector('.chisteTxt')

chiste.addEventListener('click', ()=>{
    fetchSincrono()
})

async function fetchSincrono() {

    let url = "https://api.chucknorris.io/jokes/random";
    let fetchResponse = await fetch(url);
    let json = await fetchResponse.json();
    let chiste = json.value;
    txtChiste.innerHTML= chiste
}