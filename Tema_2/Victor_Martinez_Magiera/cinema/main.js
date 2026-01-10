// Definir el tamaño de la matriz de butacas
const N = 8; // Número de filas 
let seleccion = null;
let respaldoColores= [];

// Función para inicializar la matriz de butacas
function setup() {
    let idContador = 1; // Iniciar el contador de IDs en 1 (los humanos no empezamos a contar desde 0)
    let butacas = [];

    for (let i = 0; i < N; i++) {
        // Nueva fila
        let fila = [];
        for (let j = 0; j < N; j++) {
            // Nuevo asiento
            let estado = (Math.random()*3 > 1);
            fila.push({
                id: idContador++,
                estado: estado               
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Inicializar la matriz
let butacas = setup();
const matriz = document.getElementById("butacas")

//flat convierte la matriz de matrices en una lista bidimensional
butacas.flat().forEach(x => {
    const div  = document.createElement("div");
    //sillas con accesibilidad
    if (x.id > (N/4) && x.id <= (N * 0.75) ){
        div.classList.add("puestoA");
    }
    else{
        div.classList.add("puesto");
    }
    div.id = x.id;
    if (x.estado) { div.style.backgroundColor = "red";}
        
    //agrega la lista al contenedo html
    matriz.appendChild(div); 
});

//seleccionar asientos 
const suggest = (cantidad) => {
    if (null != respaldoColores){
        respaldoColores.forEach(([b,color]) => {
            b.estado = !b.estado;
            const div2 = document.getElementById(b.id);
            div2.style.backgroundColor= color;
        });
        respaldoColores=[];
    }

    for (let i = 0; i<=butacas.length-1 ; i++){
        let fila = butacas [i];
        for (let j = 0; j<= N-cantidad; j++){
            const grupo = fila.slice(j,j+cantidad);
            if (grupo.every(b => !b.estado)){
                seleccion = grupo;
            }
        }
    }

    if(seleccion.length>0) {
        seleccion.forEach (b => {
            b.estado=!b.estado;
            const div = document.getElementById(b.id);
            respaldoColores.push([b,div.style.backgroundColor]);
            div.style.backgroundColor= "white";
        });
    }
}


//botones
const bninoneg = document.getElementById("bninoneg");
const ninos = document.getElementById("ninos");
const bninopos = document.getElementById("bninopos");
const lTotal = document.getElementById("total");
const confirmar = document.getElementById("confirmar");

const nNinos = (cantidad) => {
    let valoractual = parseInt(ninos.textContent);
    valoractual += cantidad;
    if (valoractual < 0) valoractual = 0;
    ninos.textContent = valoractual;
    lTotal.textContent=valoractual;
}

bninoneg.addEventListener("click", () => nNinos (-1));
bninopos.addEventListener("click", () => nNinos (1));
confirmar.addEventListener("click", () => suggest(parseInt(lTotal.textContent)));





