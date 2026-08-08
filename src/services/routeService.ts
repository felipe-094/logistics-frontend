import api from "./api";
import type { Route } from "../types/Route";

export async function getRoutes(): Promise<Route[]> {
  const response = await api.get("/routes");
  return response.data.data;
}