export interface Shipment {
  id: number;

  origin: string;

  destination: string;

  weight: number;

  dimensions: string;

  productType: string;

  status: "PENDING" | "IN_TRANSIT" | "DELIVERED";

  userId: number;

  created_at?: string;

  updated_at?: string;
}