import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-blue-600 text-white shadow">

        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

          <div>
            <h1 className="text-2xl font-bold">
              Gestión Logística
            </h1>
          </div>

          <nav className="flex gap-6">

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline"
                  : "hover:underline"
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/shipments"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline"
                  : "hover:underline"
              }
            >
              Envíos
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? "font-bold underline"
                  : "hover:underline"
              }
            >
              Reportes
            </NavLink>

          </nav>

          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="font-semibold">
                {user?.name}
              </p>

              <p className="text-sm">
                {user?.role}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Cerrar sesión
            </button>

          </div>

        </div>

      </header>

      <main className="max-w-7xl mx-auto p-6">
        <Outlet />
      </main>

    </div>
  );
}