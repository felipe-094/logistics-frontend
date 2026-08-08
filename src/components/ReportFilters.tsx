interface ReportFiltersProps {
  startDate: string;
  endDate: string;
  status: string;
  driverId: string;

  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  setStatus: (value: string) => void;
  setDriverId: (value: string) => void;

  onSearch: () => void;
}

export default function ReportFilters({
  startDate,
  endDate,
  status,
  driverId,
  setStartDate,
  setEndDate,
  setStatus,
  setDriverId,
  onSearch,
}: ReportFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <h2 className="text-xl font-bold mb-5">
        Filtros
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          className="border rounded-lg p-2"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
          className="border rounded-lg p-2"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-lg p-2"
        >
          <option value="">
            Todos los estados
          </option>

          <option value="PENDING">
            Pendiente
          </option>

          <option value="IN_TRANSIT">
            En tránsito
          </option>

          <option value="DELIVERED">
            Entregado
          </option>

        </select>

        <input
          type="number"
          placeholder="ID Transportista"
          value={driverId}
          onChange={(e) =>
            setDriverId(e.target.value)
          }
          className="border rounded-lg p-2"
        />

        <button
          onClick={onSearch}
          className="bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>

      </div>

    </div>
  );
}