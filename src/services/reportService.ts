import api from "./api";

export interface ShipmentReport {
  shipmentId: number;
  origin: string;
  destination: string;
  status: string;
  driverName: string | null;
  routeName: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DriverPerformance {
  driverId: number;
  driverName: string;
  averageDeliveryHours: number;
  completedShipments: number;
}

export async function getShipmentReports(filters: {
  startDate?: string;
  endDate?: string;
  status?: string;
  driverId?: number;
  page?: number;
  limit?: number;
}): Promise<ShipmentReport[]> {
  const response = await api.get("/reports/shipments", {
    params: filters,
  });

  return response.data.data;
}

export async function getDriverPerformance(filters: {
  startDate?: string;
  endDate?: string;
}): Promise<DriverPerformance[]> {
  const response = await api.get("/reports/performance", {
    params: filters,
  });

  return response.data.data;
}