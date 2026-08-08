export interface ShipmentStatusHistory {
  id: number;
  shipment_id: number;
  status: "PENDING" | "IN_TRANSIT" | "DELIVERED";
  changed_at: string;
}