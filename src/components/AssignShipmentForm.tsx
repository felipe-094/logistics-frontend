import { useEffect, useState } from "react";
import type { Driver } from "../types/Driver";
import type { Route } from "../types/Route";

import { getDrivers } from "../services/driverService";
import { getRoutes } from "../services/routeService";
import { assignShipmentRoute } from "../services/shipmentService";

interface Props {
  shipmentId: number;
  onAssigned: () => void;
}

export default function AssignShipmentForm({
  shipmentId,
  onAssigned,
}: Props) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [routeId, setRouteId] = useState("");
  const [driverId, setDriverId] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const routesData = await getRoutes();
    const driversData = await getDrivers();

    setRoutes(routesData);
    setDrivers(
      driversData.filter((driver) => driver.available)
    );
  }

  async function handleAssign() {
    if (!routeId || !driverId) {
      alert("Seleccione una ruta y un transportista.");
      return;
    }

    await assignShipmentRoute(
      shipmentId,
      Number(routeId),
      Number(driverId)
    );

    alert("Ruta asignada correctamente.");

    onAssigned();
  }

  return (
    <div className="flex gap-2">

      <select
        value={routeId}
        onChange={(e) => setRouteId(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">
          Ruta
        </option>

        {routes.map((route) => (
          <option
            key={route.id}
            value={route.id}
          >
            {route.name}
          </option>
        ))}
      </select>

      <select
        value={driverId}
        onChange={(e) => setDriverId(e.target.value)}
        className="border rounded p-2"
      >
        <option value="">
          Transportista
        </option>

        {drivers.map((driver) => (
          <option
            key={driver.id}
            value={driver.id}
          >
            {driver.name}
          </option>
        ))}
      </select>

      <button
        onClick={handleAssign}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
      >
        Asignar
      </button>

    </div>
  );
} 