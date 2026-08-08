interface ShipmentFiltersProps {
  search: string;
  statusFilter: string;

  setSearch: (value: string) => void;
  setStatusFilter: (value: string) => void;
}

export default function ShipmentFilters({
  search,
  statusFilter,
  setSearch,
  setStatusFilter,
}: ShipmentFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar por origen o destino..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded p-2 flex-1"
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="border rounded p-2"
      >
        <option value="ALL">Todos</option>
        <option value="PENDING">Pendientes</option>
        <option value="IN_TRANSIT">En tránsito</option>
        <option value="DELIVERED">Entregados</option>
      </select>
    </div>
  );
}