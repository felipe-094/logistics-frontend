import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import ShipmentForm from "../components/ShipmentForm";
import ShipmentFilters from "../components/ShipmentFilters";
import MessageAlert from "../components/MessageAlert";
import ShipmentTable from "../components/ShipmentTable";

import {
  getShipments,
  createShipment,
  updateShipmentStatus,
  deleteShipment,
} from "../services/shipmentService";

import type { Shipment } from "../types/Shipment";

export default function ShipmentsPage() {
  const { user } = useAuth();

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState("");
  const [productType, setProductType] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function loadShipments() {
    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data = await getShipments();

      setShipments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadShipments();
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  async function handleCreateShipment(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await createShipment({
        origin,
        destination,
        weight,
        dimensions,
        productType,
        userId: 0,
      });

      await loadShipments();

      setMessage("✅ Envío creado correctamente.");

      setOrigin("");
      setDestination("");
      setWeight(0);
      setDimensions("");
      setProductType("");
    } catch (error) {
      console.error(error);
      setMessage("❌ No fue posible crear el envío.");
    }
  }

  async function handleUpdateStatus(
    id: number,
    status: Shipment["status"]
  ) {
    try {
      await updateShipmentStatus(id, status);

      await loadShipments();

      setMessage("✅ Estado actualizado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("❌ No fue posible actualizar el estado.");
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "¿Deseas eliminar este envío?"
    );

    if (!confirmDelete) return;

    try {
      await deleteShipment(id);

      await loadShipments();

      setMessage("✅ Envío eliminado correctamente.");
    } catch (error) {
      console.error(error);
      setMessage("❌ No fue posible eliminar el envío.");
    }
  }

  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      shipment.origin
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      shipment.destination
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ||
      shipment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        Mis Envíos
      </h2>

      <MessageAlert message={message} />

      <ShipmentForm
        origin={origin}
        destination={destination}
        weight={weight}
        dimensions={dimensions}
        productType={productType}
        setOrigin={setOrigin}
        setDestination={setDestination}
        setWeight={setWeight}
        setDimensions={setDimensions}
        setProductType={setProductType}
        onSubmit={handleCreateShipment}
      />

      <ShipmentFilters
        search={search}
        statusFilter={statusFilter}
        setSearch={setSearch}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <p className="text-center text-lg font-semibold">
          Cargando envíos...
        </p>
      ) : filteredShipments.length === 0 ? (
        <p>No hay envíos registrados.</p>
      ) : (
       <ShipmentTable
         shipments={filteredShipments}
         user={user}
         onUpdateStatus={handleUpdateStatus}
         onDelete={handleDelete}
         onAssigned={loadShipments}
        />
      )}
    </div>
  );
}
