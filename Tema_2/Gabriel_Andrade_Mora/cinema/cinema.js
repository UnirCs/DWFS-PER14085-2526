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

let butacas = setup(); //inicializa la matriz de butacas
console.log(suggest(5)); //ejemplo sugiere 5 asientos consecutivos
