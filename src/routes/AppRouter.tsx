import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ShipmentsPage from "../pages/ShipmentsPage";
import ShipmentTrackingPage from "../pages/ShipmentTrackingPage";
import ReportsPage from "../pages/ReportsPage";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Rutas protegidas */}
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipments"
          element={
            <ProtectedRoute>
              <ShipmentsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipments/:id/tracking"
          element={
            <ProtectedRoute>
              <ShipmentTrackingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}