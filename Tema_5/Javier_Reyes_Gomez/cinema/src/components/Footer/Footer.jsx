import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
        <p><strong>© 2025 UNIR Cinema</strong></p>
        <p>Dirección: Calle del Conocimiento 42, Logroño, España</p>
        <p>Teléfono: <a href="tel:+34941123456" aria-label="Llamar al número 941 123 456">+34 999 99 99 66</a></p>
        <p>Correo: <a href="mailto:info@unircinema.com" aria-label="Enviar correo a info arroba unir cinema punto com">info@unircinema.com</a></p>
    </footer>
  );
};

export default Footer;
