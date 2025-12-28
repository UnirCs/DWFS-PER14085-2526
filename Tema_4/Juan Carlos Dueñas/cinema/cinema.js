// Tamaño de la sala
const N = 10;

// Inicializar la matriz con datos aleatorios
let butacas = setup();

// Esperar la carga del DOM y ejecutar las acciones solicitadas
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM cargado :: Iniciando cinema.js");

    // Pintar la sala en la pantalla
    pintarSala();

    // Listener para sugerencias al escribir
    document.getElementById("input_asientos").addEventListener("input", e => {
        let cantidad = Number(e.target.value);

        // Quitar sugerencias previas
        document.querySelectorAll(".silla_sugerida").forEach(silla => {
            silla.classList.remove("silla_sugerida");
        });

        // Verificar cantidad solicitada válida
        if (isNaN(cantidad) || cantidad <= 0){
            alert('Por favor, ingresa un número válido.');
            return;
        }

        // Generar sugerencias
        let sugeridas = suggest(cantidad);

        // Pintar sugeridas
        sugeridas.forEach(id => {
            const sillaDOM = document.getElementById("silla_" + id);
            if (sillaDOM) sillaDOM.classList.add("silla_sugerida");
        });
    });
});

// Inicializar la matriz de butacas (sala)
function setup() {
    let idContador = 1;
    let butacas = [];

    for (let i = 0; i < N; i++) {
        let fila = [];
        for (let j = 0; j < N; j++) {
            fila.push({
                id: idContador++,
                estado: Math.random() < 0.5 // 30% ocupada, 70% vacía
            });
        }
        butacas.push(fila);
    }
    return butacas;
}

// Sugiere "cantidad" de asientos contiguos
function suggest (cantidad_butacas_solicitadas) {
    let butacas_asignadas =[];
    let contador = 0;

    for (let i = 0; i < N && contador !== cantidad_butacas_solicitadas; i++) {
        for (let j = 0; j < N && contador !== cantidad_butacas_solicitadas; j++) {
            if (butacas[i][j].estado === false ) {
                contador++;
                butacas_asignadas.push(butacas[i][j].id);
            } else {
                contador = 0;
                butacas_asignadas.length = 0;
            }
        }

        if(contador !== cantidad_butacas_solicitadas){
            contador = 0;
            butacas_asignadas.length = 0;
        }
    }
    // console.log("Sugerencia generada:", butacas_asignadas);
    return butacas_asignadas;
}

// Pintar la sala
function pintarSala(){
    const contenedor = document.getElementById("contenedor_asientos");
    contenedor.innerHTML = ""; // limpiar antes de pintar

    for(let i = 0; i < N; i++){
        let fila = document.createElement("div");

        // Acá pongo el nombre de la fila
        let numero_fila = document.createElement("p");
        let numero = String(i + 1).padStart(2, "0");
        numero_fila.textContent = "Fila " + numero;
        fila.appendChild(numero_fila);

        // Generar asientos
        for(let j = 0; j < N; j++){
            // Crea el objeto
            let silla = document.createElement("div");

            // Se le asigna el tipo de CLase según estado actual
            silla.classList.add(
                butacas[i][j].estado ? "silla_ocupada" : "silla_vacia"
            );

            // ID único por butaca
            silla.id = "silla_" + butacas[i][j].id;

            // Se adiciona la Silla a la fila
            fila.appendChild(silla);
        }
        // Se adiciona TODas las Sillas a la fila
        contenedor.appendChild(fila);
    }
}