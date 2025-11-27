const N = 10; //tamaño de filas y columnas
function setup() {
  let idContador = 1; //contador de ids inicializado en 1
  let butacas = []; //array para guardar las butacas
  for (let i = 0; i < N; i++) {
    let fila = []; //fila
    for (let j = 0; j < N; j++) {
      fila.push({ id: idContador++, estado: false }); //columnas butaca con id y estado false
    }
    butacas.push(fila); //agrega fila al array de butacas
  }
  return butacas; //devuelve matriz butacas
}

function suggest(numAsientos) {
  numAsientos = parseInt(numAsientos); //convertir a numero
  const resultado = new Set(); //set para guardar ids sugeridos
  let encontrado = false; //bandera para indicar si se encontraron asientos
  //validacion de numero de asientos
  if (numAsientos > N) {
    return resultado; //retorna set vacio
  }
  //recorre filas desde mas lejana hasta la primera
  for (let i = N - 1; i >= 0 && !encontrado; i--) {
    let consecutivos = 0; //contador de asientos consecutivos
    let inicio = -1; //indice de inicio
    //recorre columnas butacas
    for (let j = 0; j < N && !encontrado; j++) {
      if (!butacas[i][j].estado) {
        //si la butaca esta libre
        if (consecutivos === 0) {
          inicio = j; //marca el inicio
        }
        consecutivos++; //incrementa contador
        //si tenemos todos los consecutivos
        if (consecutivos === numAsientos) {
          for (let k = inicio; k < inicio + numAsientos; k++) {
            resultado.add(butacas[i][k].id); //agrega ids al set
          }
          encontrado = true; //marca que se encontraron asientos
        }
      } else {
        //si la butaca esta ocupada
        consecutivos = 0; //resetea contador
        inicio = -1; //resetea indice inicio
      }
    }
  }
  return resultado; //devuelve el set con los ids
}

//inicializa la matriz de butacas
let butacas = setup();

// funcion renderiza butacas en el DOM
function renderizarButacas() {
  const thead = document.getElementById("encabezadoButacas");
  const tbody = document.getElementById("cuerpoButacas");

  //fila encabezado
  const filaEncabezado = document.createElement("tr");
  //columna vacia para esquina
  const columnaVacia = document.createElement("th");
  filaEncabezado.appendChild(columnaVacia);
  //columnas numeradas
  for (let j = 1; j <= N; j++) {
    const th = document.createElement("th");
    th.textContent = j;
    th.classList.add("text-yellow-400", "font-semibold", "text-center");
    filaEncabezado.appendChild(th);
  }
  thead.appendChild(filaEncabezado);
  //filas de butacas
  for (let i = 0; i < N; i++) {
    const fila = document.createElement("tr");
    //columna con nombre de fila
    const thFila = document.createElement("th");
    thFila.textContent = "Fila " + (i + 1);
    thFila.classList.add(
      "text-yellow-400",
      "font-semibold",
      "pr-4",
      "text-right"
    );
    fila.appendChild(thFila);
    //columnas de butacas
    for (let j = 0; j < N; j++) {
      const td = document.createElement("td");
      const boton = document.createElement("button");
      // id butaca
      boton.id = "butaca-" + butacas[i][j].id;
      boton.classList.add(
        "bg-green-500",
        "hover:bg-green-600",
        "text-white",
        "font-bold",
        "w-10",
        "h-10",
        "m-1",
        "rounded",
        "transition",
        "duration-200",
        "cursor-pointer",
        "border-2",
        "border-green-700"
      );
      td.appendChild(boton);
      fila.appendChild(td);
    }
    tbody.appendChild(fila);
  }
}

//ejecuta renderizarButacas al cargar el DOM
document.addEventListener("DOMContentLoaded", renderizarButacas);

//funcion actualiza preseleccion butacas
function actualizarPreseleccion(idsPreseleccionados) {
  // butacas en estado inicial
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const boton = document.getElementById("butaca-" + butacas[i][j].id);
      if (boton) {
        //quita amarillo
        boton.classList.remove(
          "bg-yellow-500",
          "hover:bg-yellow-600",
          "border-yellow-700"
        );
        //coloca verde
        boton.classList.add(
          "bg-green-500",
          "hover:bg-green-600",
          "border-green-700"
        );
      }
    }
  }

  //estilo butacas preseleccion
  idsPreseleccionados.forEach((id) => {
    const boton = document.getElementById("butaca-" + id);
    if (boton) {
      //quita verde
      boton.classList.remove(
        "bg-green-500",
        "hover:bg-green-600",
        "border-green-700"
      );
      //coloca amarillo
      boton.classList.add(
        "bg-yellow-500",
        "hover:bg-yellow-600",
        "border-yellow-700"
      );
    }
  });
}

//input asientos
document.addEventListener("DOMContentLoaded", function () {
  const inputNumSeats = document.getElementById("numSeats");

  inputNumSeats.addEventListener("input", function () {
    const cantidad = parseInt(this.value);

    if (cantidad > 0 && cantidad <= N) {
      const idsSeleccionados = suggest(cantidad);
      actualizarPreseleccion(idsSeleccionados);
    } else {
      actualizarPreseleccion(new Set()); //valor no valido resetea preseleccion
    }
  });
});
