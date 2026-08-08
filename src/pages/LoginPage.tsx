import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const { login: saveLogin } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      saveLogin(response.user, response.token);

      navigate("/dashboard");
    } catch (error) {
      alert("Correo o contraseña incorrectos");
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h1>

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

        <button
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          type="submit"
        >
          Ingresar
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?
          </p>

          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Crear una cuenta
          </Link>
        </div>
      </form>
    </div>
  );
}