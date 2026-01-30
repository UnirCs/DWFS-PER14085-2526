export default function SeatsPage({ movie, onBack }) {
  return (
    <section className="seats">
      <h2 className="seats-title">Selección de asientos</h2>
      <p className="seats-subtitle">
        Película: <strong>{movie.title}</strong>
      </p>

      <div className="seats-box">
        <p>(Vista placeholder por el momento)</p>
        <p>Aquí luego pondrás la lógica de butacas.</p>
      </div>

      <button className="btn btn-secondary" onClick={onBack}>
        Volver a películas
      </button>
    </section>
  );
}
