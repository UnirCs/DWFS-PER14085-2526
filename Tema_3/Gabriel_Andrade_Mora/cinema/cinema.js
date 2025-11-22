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
  numAsientos = Number(numAsientos); //convierte a numero
  //validacion de numero de asientos
  if (numAsientos > N) {
    console.log("Resultado vacio: numero de asientos excede el maximo");
    return new Set(); //retorna set vacio
  }
  //recorre filas desde mas lejana hasta la primera
  for (let i = N - 1; i >= 0; i--) {
    let consecutivos = 0; //contador de asientos consecutivos
    let inicio = -1; //indice de inicio
    //recorre columnas butacas
    for (let j = 0; j < N; j++) {
      if (!butacas[i][j].estado) {
        //si la butaca esta libre
        if (consecutivos === 0) {
          inicio = j; //marca el inicio
        }
        consecutivos++; //incrementa contador
        //si tenemos todos los consecutivos
        if (consecutivos === numAsientos) {
          let resultado = new Set(); //crea set resultado
          for (let k = inicio; k < inicio + numAsientos; k++) {
            resultado.add(butacas[i][k].id); //agrega ids al set
          }
          console.log("Resultado:", resultado);
          return resultado; //devuelve el set con los ids
        }
      } else {
        //si la butaca esta ocupada
        consecutivos = 0; //resetea contador
        inicio = -1; //resetea indice inicio
      }
    }
  }
  console.log("Resultado vacio: no se encontraron asientos consecutivos");
  return new Set(); //si no se encuentran asientos retorna set vacio
}

let butacas = setup(); //inicializa la matriz de butacas
