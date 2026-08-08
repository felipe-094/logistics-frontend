import api from "./api";
import type { Driver } from "../types/Driver";

export async function getDrivers(): Promise<Driver[]> {
  const response = await api.get("/drivers");
  return response.data.data;
}