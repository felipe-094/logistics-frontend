import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  getShipmentStatus,
  getShipmentHistory,
} from "../services/shipmentService";

import type { ShipmentStatusHistory } from "../types/ShipmentStatusHistory";

export default function ShipmentTrackingPage() {
  const { id } = useParams();

  const [status, setStatus] = useState("");

  const [history, setHistory] = useState<
    ShipmentStatusHistory[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadTracking() {
      try {
        const currentStatus =
          await getShipmentStatus(Number(id));

        const shipmentHistory =
          await getShipmentHistory(Number(id));

        setStatus(currentStatus);
        setHistory(shipmentHistory);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    // Primera carga
    loadTracking();

    // Polling cada 5 segundos
    const interval = setInterval(() => {
      loadTracking();
    }, 5000);

    // Limpiar intervalo al salir de la página
    return () => clearInterval(interval);

  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold">
        Cargando seguimiento...
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Seguimiento del envío #{id}
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <h2 className="text-xl font-semibold mb-3">
          Estado actual
        </h2>

        <span
          className={`text-lg font-bold ${
            status === "PENDING"
              ? "text-yellow-600"
              : status === "IN_TRANSIT"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {status}
        </span>

      </div>

      <div className="bg-white shadow rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-6">
          Historial
        </h2>

        <div className="space-y-5">

          {history.map((item) => (

            <div
              key={item.id}
              className="border-l-4 border-blue-600 pl-5"
            >
              <p className="font-bold">
                {item.status}
              </p>

              <p className="text-gray-500 text-sm">
                {new Date(
                  item.changed_at
                ).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}