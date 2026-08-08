import type { Shipment } from "../types/Shipment";
import type { User } from "../types/User";
import AssignShipmentForm from "./AssignShipmentForm";
import { Link } from "react-router-dom";

interface ShipmentTableProps {
  shipments: Shipment[];
  user: User | null;

  onUpdateStatus: (
    id: number,
    status: Shipment["status"]
  ) => void;

  onDelete: (id: number) => void;

  onAssigned: () => void;
}

export default function ShipmentTable({
  shipments,
  user,
  onUpdateStatus,
  onDelete,
  onAssigned,
}: ShipmentTableProps) {
  return (
    <table className="w-full border border-gray-300">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="p-3">ID</th>
          <th className="p-3">Origen</th>
          <th className="p-3">Destino</th>
          <th className="p-3">Peso</th>
          <th className="p-3">Dimensiones</th>
          <th className="p-3">Producto</th>
          <th className="p-3">Estado</th>
          <th className="p-3">Seguimiento</th>

          {user?.role === "ADMIN" && (
            <>
              <th className="p-3">Asignar Ruta</th>
              <th className="p-3">Acciones</th>
            </>
          )}
        </tr>
      </thead>

      <tbody>
        {shipments.map((shipment) => (
          <tr
            key={shipment.id}
            className="border-b text-center"
          >
            <td className="p-3">{shipment.id}</td>

            <td className="p-3">
              {shipment.origin}
            </td>

            <td className="p-3">
              {shipment.destination}
            </td>

            <td className="p-3">
              {shipment.weight} kg
            </td>

            <td className="p-3">
              {shipment.dimensions}
            </td>

            <td className="p-3">
              {shipment.productType}
            </td>

            <td className="p-3">
              {user?.role === "ADMIN" ? (
                <select
                  value={shipment.status}
                  onChange={(e) =>
                    onUpdateStatus(
                      shipment.id,
                      e.target.value as Shipment["status"]
                    )
                  }
                  className="border rounded p-2"
                >
                  <option value="PENDING">
                    PENDING
                  </option>

                  <option value="IN_TRANSIT">
                    IN_TRANSIT
                  </option>

                  <option value="DELIVERED">
                    DELIVERED
                  </option>
                </select>
              ) : (
                <span
                  className={`font-semibold ${
                    shipment.status === "PENDING"
                      ? "text-yellow-600"
                      : shipment.status === "IN_TRANSIT"
                      ? "text-blue-600"
                      : "text-green-600"
                  }`}
                >
                  {shipment.status}
                </span>
              )}
            </td>

          <td className="p-3">
            <Link
              to={`/shipments/${shipment.id}/tracking`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
             >
             Seguimiento
            </Link>
          </td>

            {user?.role === "ADMIN" && (
              <>
                <td className="p-3">
                  <AssignShipmentForm
                    shipmentId={shipment.id}
                    onAssigned={onAssigned}
                  />
                </td>

                <td className="p-3">
                  <button
                    onClick={() => onDelete(shipment.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}