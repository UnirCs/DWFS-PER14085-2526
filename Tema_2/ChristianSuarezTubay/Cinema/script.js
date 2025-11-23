// Configuración inicial
const filas = 4;
const columnas = 7;

function setup(){
    let idContador = 1;
    // Crear matriz de butacas
    let butacas = [];
    for (let i = 0; i < filas; i++) {
        let fila = [];
        for (let j = 0; j < columnas; j++) {
            fila.push({ id: idContador++, estado: false });
        }
        butacas.push(fila);
    }
    return butacas;
}
let butacas = setup();

// Renderizar butacas en el DOM
function renderButacas() {
    const contenedor = document.getElementById("butacas-container");
    contenedor.innerHTML = "";
    for (let i = 0; i < filas; i++) {
        const row = document.createElement("div");
        row.className = "row justify-content-center mb-2 align-items-center";

        const label = document.createElement("div");
        label.className = "col-auto letra-fila";
        label.textContent = "Fila " + (i + 1);
        row.appendChild(label);

        for (let j = 0; j < columnas; j++) {
            const col = document.createElement("div");
            col.className = "col-auto";
            const div = document.createElement("div");
            div.className = "butaca " + (butacas[i][j].estado ? "ocupada" : "libre");
            div.title = "F" + (i+1) + "C" + (j+1);
            col.appendChild(div);
            row.appendChild(col);
        }
        contenedor.appendChild(row);
    }
}
renderButacas();

// Algoritmo suggest
function suggest(num) {
    let seleccion = new Set();

    // Caso: si el número solicitado excede columnas
    if (num > columnas) {
        return seleccion;
    }

    let encontrado = false; // bandera para saber si ya hallamos un bloque

    for (let i = filas - 1; i >= 0 && !encontrado; i--) {
        let fila = butacas[i];
        let consecutivos = 0;
        let idsSeleccionados = [];

        for (let j = 0; j < columnas; j++) {
            if (!fila[j].estado) {
                consecutivos++;
                idsSeleccionados.push(fila[j].id);

                if (consecutivos === num) {
                    // Guardamos resultado
                    idsSeleccionados.forEach(id => seleccion.add(id));
                    encontrado = true; // marcamos que ya encontramos
                }
            } else {
                consecutivos = 0;
                idsSeleccionados = [];
            }
        }
    }

    return seleccion;
}


// Manejar formulario
document.getElementById("reservaForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const numAsientos = parseInt(document.getElementById("numAsientos").value);
    const seleccion = suggest(numAsientos);

    if (seleccion.size === 0) {
        alert("No hay suficientes asientos juntos disponibles.");
    } else {
        alert("Asientos sugeridos: " + Array.from(seleccion).join(", "));
        // Marcar como ocupados
        seleccion.forEach(id => {
            for (let i = 0; i < filas; i++) {
                for (let j = 0; j < columnas; j++) {
                    if (butacas[i][j].id === id) {
                        butacas[i][j].estado = true;
                    }
                }
            }
        });
        renderButacas();
    }
});
