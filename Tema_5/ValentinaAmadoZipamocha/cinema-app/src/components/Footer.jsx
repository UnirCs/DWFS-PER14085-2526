import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="app-footer">
      <div className="container">
        <p>© {year} UNIR-Cinema. Todos los derechos reservados.</p>
        <p>Desarrollado por Valentina Amado</p>
      </div>
    </footer>
  );
}
