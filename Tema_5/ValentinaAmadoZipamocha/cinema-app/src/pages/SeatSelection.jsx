import React, { useState } from "react";
import "../styles/sala.css";

const rows = ["A","B","C","D","E","F","G"];
const cols = [1,2,3,4,5,6,7];

const initiallyOccupied = new Set([
  "A3","A6",
  "B5",
  "C2",
  "E3",
  "F1","F6",
  "G2","G5"
]);

export default function SeatSelection() {
  const [selected, setSelected] = useState([]);
  const [seatCount, setSeatCount] = useState("");

  function findContiguousSeats(n) {
    for (let r = rows.length - 1; r >= 0; r--) {
      const row = rows[r];

      for (let startIndex = cols.length - 1; startIndex >= 0; startIndex--) {
        const possibleBlock = [];

        for (let offset = 0; offset < n; offset++) {
          const colIndex = startIndex - offset;

          if (colIndex < 0) {
            possibleBlock.length = 0;
            break;
          }

          const code = `${row}${cols[colIndex]}`;

          if (initiallyOccupied.has(code)) {
            possibleBlock.length = 0;
            break;
          }

          possibleBlock.push(code);
        }

        if (possibleBlock.length === n) {
          return possibleBlock;
        }
      }
    }

    return null;
  }


  function autoSelectSeats(n) {
    const block = findContiguousSeats(n);

    if (block) {
      setSelected(block);
    } else {
      setSelected([]);
      alert(`No se encontraron ${n} asientos juntos disponibles.`);
    }
  }


  function toggleSeat(code) {
    if (initiallyOccupied.has(code)) return; 

    if (selected.includes(code)) {
      setSelected(selected.filter(s => s !== code));
    } else {
      setSelected([...selected, code]);
    }
  }

  function isOccupied(code) {
    return initiallyOccupied.has(code);
  }

  function isSelected(code) {
    return selected.includes(code);
  }

  return (
    <main className="sala-page">
      <section className="sala-header">
        <h2>Selección de Sillas</h2>

        <div className="sala-controls">
          <label>Cantidad de sillas: </label>

          <input
            type="number"
            min="1"
            max="7"
            value={seatCount}
            onChange={(e) => {
              const value = e.target.value;
              setSeatCount(value);

              const n = parseInt(value, 10);

              if (!isNaN(n) && n > 0) {
                autoSelectSeats(n);
              } else {
                setSelected([]); 
              }
            }}
          />

          <button
            className="btn"
            onClick={() => alert("Reservación simulada")}
          >
            Reservar
          </button>
        </div>

        <p className="nota">
          Nota: Puede seleccionar manualmente o usar selección automática.
        </p>
      </section>

      <section className="pantalla-center">
        <div className="pantalla">PANTALLA</div>

        <div className="grid-wrap">
          <div className="grid-header">
            <div></div>
            {cols.map(c => (
              <div key={c} className="col-number">{c}</div>
            ))}
          </div>

          {rows.map(row => (
            <div className="grid-row" key={row}>
              <div className="row-letter">{row}</div>

              {cols.map(col => {
                const code = `${row}${col}`;
                const cls = isOccupied(code)
                  ? "seat occupied"
                  : isSelected(code)
                  ? "seat selected"
                  : "seat available";

                return (
                  <button
                    key={code}
                    className={cls}
                    onClick={() => toggleSeat(code)}
                    aria-label={`Asiento ${code}`}
                  ></button>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="legend">
        <div className="legend-box">
          <div className="legend-item">
            <span className="legend-swatch available-sq" /> Disponible
          </div>
          <div className="legend-item">
            <span className="legend-swatch selected-sq" /> Seleccionado
          </div>
          <div className="legend-item">
            <span className="legend-swatch occupied-sq" /> Ocupado
          </div>
          <div className="legend-item">
            Asientos seleccionados:{" "}
            <strong>{selected.length ? selected.join(", ") : "—"}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
