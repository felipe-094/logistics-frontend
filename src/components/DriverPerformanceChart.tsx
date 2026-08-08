import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import type { DriverPerformance } from "../services/reportService";

interface Props {
  performance: DriverPerformance[];
}

export default function DriverPerformanceChart({
  performance,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Envíos completados por transportista
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={performance}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="driverName" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="completedShipments"
            fill="#2563eb"
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}