import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import "./styles/styles.css";
import "./styles/stylesForm.css";
import SeatSelection from "./pages/SeatSelection";


export default function App() {
  return (
    <BrowserRouter>
      <div className="page-container">

        <Header />

        <nav className="menu">
          <Link to="/">Inicio</Link>
          <Link to="/registrarse">Registrarse</Link>
          <a href="/sala">Sala (HTML)</a>
        </nav>

        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/registrarse" element={<Register/>} />
          <Route path="/sala" element={<SeatSelection/>} />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}
