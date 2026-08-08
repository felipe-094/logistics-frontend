interface ShipmentFormProps {
  origin: string;
  destination: string;
  weight: number;
  dimensions: string;
  productType: string;

  setOrigin: (value: string) => void;
  setDestination: (value: string) => void;
  setWeight: (value: number) => void;
  setDimensions: (value: string) => void;
  setProductType: (value: string) => void;

  onSubmit: (e: React.FormEvent) => void;
}

export default function ShipmentForm({
  origin,
  destination,
  weight,
  dimensions,
  productType,
  setOrigin,
  setDestination,
  setWeight,
  setDimensions,
  setProductType,
  onSubmit,
}: ShipmentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-6 grid grid-cols-2 gap-4"
    >
      <input
        type="text"
        placeholder="Origen"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="border rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border rounded p-2"
        required
      />

      <input
        type="number"
        placeholder="Peso (kg)"
        value={weight}
        onChange={(e) => setWeight(Number(e.target.value))}
        className="border rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Dimensiones"
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        className="border rounded p-2"
        required
      />

      <input
        type="text"
        placeholder="Tipo de producto"
        value={productType}
        onChange={(e) => setProductType(e.target.value)}
        className="border rounded p-2"
        required
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white rounded p-2"
      >
        Crear envío
      </button>
    </form>
  );
}