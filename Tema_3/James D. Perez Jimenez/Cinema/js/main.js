//------------------------------------------------------------------------------------------------------------------------
// Developer: James D. Perez Jimenez
//------------------------------------------------------------------------------------------------------------------------

// Configuración inicial

const ROWS = 5;
const COLS = 12;

const occupied = new Set([
  '1-6','1-7','2-3','2-4','3-2','3-5','3-8',
  '4-3','4-4','4-5','5-2','5-3','5-4','5-9'
]);

const rowsEl    = document.getElementById('rows');
const qtyEl     = document.getElementById('qty');
const statusEl  = document.getElementById('status');
const confirmEl = document.getElementById('confirm');
const selected  = new Set();

const formatSeat = (r,c) => `F${r}-${String(c).padStart(2,'0')}`;

// Renderizado de todas las filas y asientos

function render(){
  rowsEl.innerHTML = '';

  for(let r = 1; r <= ROWS; r++){
    const row = document.createElement('div');
    row.className = 'd-grid gap-2';

    const label = document.createElement('div');
    label.className = 'text-secondary small';
    label.textContent = `Row ${r}`;
    row.appendChild(label);

    const seats = document.createElement('div');
    seats.className = 'seats';
    seats.style.setProperty('--cols', COLS);

    for(let c = 1; c <= COLS; c++){
      const key = `${r}-${c}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'seat btn border-2';
      btn.textContent = c;
      btn.dataset.key = key;
      btn.setAttribute('aria-label', `Asiento ${formatSeat(r,c)}`);

      if (occupied.has(key)) {
        btn.classList.add('btn-secondary');
        btn.disabled = true;
      } else {
        btn.classList.add('btn-outline-secondary');
        btn.addEventListener('click', ()=> toggleSeat(key, btn));
      }

      seats.appendChild(btn);
    }

    row.appendChild(seats);
    rowsEl.appendChild(row);
  }
  
  updateStatus();
}

// Validación del input de cantidad deseada

function clampDesired(){
  let v = Number.parseInt(qtyEl.value, 10);

  if(Number.isNaN(v) || v < 1){
    v = 1;
  }

  if(v > COLS){
    v = COLS;
  }

  qtyEl.value = v;
  return v;
}


// Selección manual de asientos

function toggleSeat(key, el){
  if (occupied.has(key) || el.disabled) return;

  const max = clampDesired();
  const supera = selected.size >= max;

  if(selected.has(key)){
    selected.delete(key);
    el.classList.remove('btn-primary');
    el.classList.add('btn-outline-secondary');
    el.setAttribute('aria-pressed','false');
  } else {

    if(supera){
      el.blur();
      confirmEl.animate(
        [
          {transform:'translateX(0)'}, 
          {transform:'translateX(-3px)'}, 
          {transform:'translateX(3px)'}, 
          {transform:'translateX(0)'}
        ],
        {duration:200, iterations:1}
      );
      return;
    }

    selected.add(key);
    el.classList.remove('btn-outline-secondary');
    el.classList.add('btn-primary');
    el.setAttribute('aria-pressed','true');
  }
  
  updateStatus();
}

// Actualización del texto de estado

function updateStatus(){
  const max = clampDesired();
  const remaining = Math.max(0, max - selected.size);

  statusEl.textContent = 
    `Seleccionados: ${selected.size} / ${max} · Te faltan ${remaining}`;
  
  confirmEl.disabled = selected.size !== max;
  confirmEl.classList.toggle('disabled', confirmEl.disabled);
}

// Limpiar selección actual

function clearSelectedUI() {
  for (const key of Array.from(selected)) {
    const btn = document.querySelector(`.seat[data-key="${key}"]`);
    if(btn){
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-outline-secondary');
      btn.setAttribute('aria-pressed','false');
    }
  }
  selected.clear();
}

// SUGERENCIA AUTOMÁTICA DE ASIENTOS

function suggest(numset) {
  const resultado = new Set();
  if (numset <= 0 || numset > COLS) return resultado;

  let encontrado = false;

  for (let fila = ROWS; fila >= 1 && !encontrado; fila--) {
    const inicio = buscarBloqueDisponible(fila, numset);

    if (inicio !== -1) {
      let c = inicio;

      while (c < inicio + numset) {
        resultado.add(`${fila}-${c}`);
        c = c + 1;
      }

      encontrado = true; 
    }
  }

  return resultado;
}

// Busca un bloque consecutivo disponible en una fila

function buscarBloqueDisponible(fila, numset) {
  let libres = 0;
  let inicio = 1;

  for (let col = 1; col <= COLS; col++) {
    const key = `${fila}-${col}`;
    const estaOcupado = occupied.has(key);

    if (estaOcupado) {
      libres = 0;
    } else {
      if (libres === 0){
        inicio = col;
      }
      libres = libres + 1;
    }

    if (libres === numset) {
      return inicio;
    }
  }

  return -1;
}

// Cambio manual del input de cantidad

qtyEl.addEventListener('input', ()=>{
  const max = clampDesired();

  while(selected.size > max){
    const first = selected.values().next().value;
    selected.delete(first);
    const b = document.querySelector(`.seat[data-key="${first}"]`);
    if(b){
      b.classList.remove('btn-primary');
      b.classList.add('btn-outline-secondary');
      b.setAttribute('aria-pressed','false');
    }
  }
  
  updateStatus();
});

// Confirmación de selección o sugerencia automática

confirmEl.addEventListener('click', ()=>{
  const max = clampDesired();

  // Ya seleccionó manualmente los necesarios
  if (selected.size === max) {
    const ordered = Array.from(selected)
      .sort((a,b)=>{
        const [ra,ca] = a.split('-').map(Number);
        const [rb,cb] = b.split('-').map(Number);
        return ra===rb ? ca - cb : ra - rb;
      })
      .map(k=>{
        const [r,c] = k.split('-').map(Number);
        return formatSeat(r,c);
      });

    if (ordered.length > 0) {
      alert(`Has reservado:\n\n${ordered.join(', ')}`);
    }

    for (const key of Array.from(selected)) {
      occupied.add(key);
      const btn = document.querySelector(`.seat[data-key="${key}"]`);
      if (btn) {
        btn.classList.remove('btn-primary','btn-outline-secondary');
        btn.classList.add('btn-secondary');
        btn.disabled = true;
        btn.setAttribute('aria-pressed','false');
      }
    }

    selected.clear();
    updateStatus();
    statusEl.className = "text-secondary small";
    return;
  }

  // Solicitar sugerencia
  const sugeridos = suggest(max);

  if (sugeridos.size === 0) {
    statusEl.textContent = 
      `No hay un bloque disponible de ${max} asientos juntos.`;
    statusEl.className = "text-danger small";
    return;
  }

  clearSelectedUI();

  for (const key of sugeridos) {
    selected.add(key);
    const btn = document.querySelector(`.seat[data-key="${key}"]`);
    if(btn){
      btn.classList.remove('btn-outline-secondary');
      btn.classList.add('btn-primary');
      btn.setAttribute('aria-pressed','true');
    }
  }

  updateStatus();

  const lista = Array.from(sugeridos)
    .map(k=>{
      const [r,c] = k.split('-').map(Number);
      return formatSeat(r,c);
    })
    .join(', ');

  statusEl.textContent = `Te sugerimos los asientos: ${lista}`;
  statusEl.className = "text-success small";
});

render();
