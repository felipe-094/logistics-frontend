import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { register } from "../services/authService";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState<"ADMIN" | "OPERATOR">(
    "OPERATOR"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await register({
        name,
        email,
        password,
        role,
      });

      alert("Usuario registrado correctamente");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("No fue posible registrar el usuario");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Crear Cuenta
        </h1>

        <input
          className="w-full border rounded p-2 mb-4"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full border rounded p-2 mb-4"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border rounded p-2 mb-4"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full border rounded p-2 mb-4"
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "ADMIN" | "OPERATOR")
          }
        >
          <option value="OPERATOR">
            Operador
          </option>

          <option value="ADMIN">
            Administrador
          </option>
        </select>

        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          type="submit"
        >
          Registrarse
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?
          </p>

          <Link
            to="/"
            className="text-blue-600 font-semibold hover:underline"
          >
            Iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  );
}