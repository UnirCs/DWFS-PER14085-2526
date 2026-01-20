import "../styles/stylesForm.css";
import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    usuario: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro exitoso");
  };

  return (
    <>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre Completo</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Correo Electrónico</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Usuario</label>
        <input type="text" name="usuario" value={form.usuario} onChange={handleChange} required />

        <label>Contraseña</label>
        <input type="password" name="contraseña" value={form.contraseña} onChange={handleChange} required />

        <input type="submit" value="Registrar" />
      </form>
    </>
  );
}
