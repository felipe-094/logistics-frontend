import type { ShipmentReport } from "../services/reportService";

interface ReportTableProps {
  reports: ShipmentReport[];
}

export default function ReportTable({
  reports,
}: ReportTableProps) {
  return (
    <div className="bg-white shadow rounded-xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-blue-600 text-white">

          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Origen</th>
            <th className="p-3">Destino</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Ruta</th>
            <th className="p-3">Transportista</th>
            <th className="p-3">Creado</th>
            <th className="p-3">Actualizado</th>
          </tr>

        </thead>

        <tbody>

          {reports.map((report) => (

            <tr
              key={report.shipmentId}
              className="border-b text-center hover:bg-gray-50"
            >

              <td className="p-3">
                {report.shipmentId}
              </td>

              <td className="p-3">
                {report.origin}
              </td>

              <td className="p-3">
                {report.destination}
              </td>

              <td className="p-3">
                {report.status}
              </td>

              <td className="p-3">
                {report.routeName ?? "-"}
              </td>

              <td className="p-3">
                {report.driverName ?? "-"}
              </td>

              <td className="p-3">
                {new Date(
                  report.createdAt
                ).toLocaleString()}
              </td>

              <td className="p-3">
                {new Date(
                  report.updatedAt
                ).toLocaleString()}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}