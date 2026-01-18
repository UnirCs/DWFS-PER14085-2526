export default function Header() {
  return (
    <header className="cinema__header">
      <div className="container">
        <div className="cinema__header-inner">
          <div>
            <h1 className="cinema__title">ECUA-CINE</h1>
            <p className="cinema__subtitle mb-0">Cartelera · Sala principal</p>
          </div>
          <div className="text-end">
            <span>Elige tu película</span>
          </div>
        </div>
      </div>
    </header>
  );
}