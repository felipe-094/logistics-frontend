import { useEffect, useState } from "react";
import { getShipments } from "../services/shipmentService";
import type { Shipment } from "../types/Shipment";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();

  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getShipments();
        setShipments(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  const total = shipments.length;

  const pending = shipments.filter(
    (shipment) => shipment.status === "PENDING"
  ).length;

  const inTransit = shipments.filter(
    (shipment) => shipment.status === "IN_TRANSIT"
  ).length;

  const delivered = shipments.filter(
    (shipment) => shipment.status === "DELIVERED"
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Bienvenido, {user?.name}
        </h1>

        <p className="text-gray-600 mt-2">
          Panel principal del sistema de gestión logística.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">
            Total de envíos
          </p>

          <h2 className="text-5xl font-bold text-blue-600 mt-3">
            {total}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">
            Pendientes
          </p>

          <h2 className="text-5xl font-bold text-yellow-500 mt-3">
            {pending}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">
            En tránsito
          </p>

          <h2 className="text-5xl font-bold text-indigo-600 mt-3">
            {inTransit}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <p className="text-gray-500">
            Entregados
          </p>

          <h2 className="text-5xl font-bold text-green-600 mt-3">
            {delivered}
          </h2>
        </div>

      </div>
    </div>
  );
}