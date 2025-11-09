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

function render(){
  rowsEl.innerHTML = '';

  for(let r=1; r<=ROWS; r++){
    const row = document.createElement('div');
    row.className = 'd-grid gap-2';

    const label = document.createElement('div');
    label.className = 'text-secondary small';
    label.textContent = `Row ${r}`;
    row.appendChild(label);

    const seats = document.createElement('div');
    seats.className = 'seats';
    seats.style.setProperty('--cols', COLS);

    for(let c=1; c<=COLS; c++){
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
        btn.addEventListener('click', () => toggleSeat(key, btn));
      }

      seats.appendChild(btn);
    }

    row.appendChild(seats);
    rowsEl.appendChild(row);
  }
  updateStatus();
}

function clampDesired(){
  let v = parseInt(qtyEl.value, 10);
  if(Number.isNaN(v) || v < 1) v = 1;
  if(v > 12) v = 12;
  qtyEl.value = v;
  return v;
}

function toggleSeat(key, el){
  if (occupied.has(key) || el.disabled) return;

  const max = clampDesired();

  if(selected.has(key)){
    selected.delete(key);
    el.classList.remove('btn-primary');
    el.classList.add('btn-outline-secondary');
    el.setAttribute('aria-pressed','false');
  } else {
    if(selected.size >= max){
      el.blur();
      confirmEl.animate(
        [{transform:'translateX(0)'},{transform:'translateX(-3px)'},
         {transform:'translateX(3px)'},{transform:'translateX(0)'}],
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

function updateStatus(){
  const max = clampDesired();
  const remaining = Math.max(0, max - selected.size);
  statusEl.textContent = `Seleccionados: ${selected.size} / ${max} · Te faltan ${remaining}`;
  confirmEl.disabled = selected.size !== max;
  confirmEl.classList.toggle('disabled', confirmEl.disabled);
}

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

confirmEl.addEventListener('click', ()=>{
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

  if(!ordered.length) return;

  alert(`Has reservado:\n\n${ordered.join(', ')}`);

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
});

render();
