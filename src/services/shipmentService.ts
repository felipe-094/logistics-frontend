import api from "./api";
import type { Shipment } from "../types/Shipment";
import type { ShipmentStatusHistory } from "../types/ShipmentStatusHistory";

export async function getShipments(): Promise<Shipment[]> {
  const response = await api.get("/shipments");
  return response.data.data;
}

export async function createShipment(
  shipment: Omit<Shipment, "id" | "status">
): Promise<Shipment> {
  const response = await api.post("/shipments", shipment);

  return response.data.data;
}

export async function updateShipmentStatus(
  id: number,
  status: Shipment["status"]
): Promise<void> {
  await api.patch(`/shipments/${id}/status`, {
    status,
  });
}

export async function deleteShipment(
  id: number
): Promise<void> {
  await api.delete(`/shipments/${id}`);
}

export async function assignShipmentRoute(
  shipmentId: number,
  routeId: number,
  driverId: number
): Promise<void> {
  await api.patch(`/shipments/${shipmentId}/assign`, {
    routeId,
    driverId,
  });
}

/**
 * Obtener el estado actual de un envío
 */
export async function getShipmentStatus(
  id: number
): Promise<string> {
  const response = await api.get(`/shipments/${id}/status`);
  return response.data.status;
}

/**
 * Obtener historial de estados
 */
export async function getShipmentHistory(
  id: number
): Promise<ShipmentStatusHistory[]> {
  const response = await api.get(`/shipments/${id}/history`);

  return response.data.data;
}