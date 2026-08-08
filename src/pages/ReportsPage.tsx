import { useEffect, useState } from "react";

import ReportTable from "../components/ReportTable";
import DriverPerformanceChart from "../components/DriverPerformanceChart";
import ReportFilters from "../components/ReportFilters";

import {
  getShipmentReports,
  getDriverPerformance,
} from "../services/reportService";

import type {
  ShipmentReport,
  DriverPerformance,
} from "../services/reportService";

export default function ReportsPage() {
  const [reports, setReports] = useState<ShipmentReport[]>([]);
  const [performance, setPerformance] = useState<
    DriverPerformance[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [driverId, setDriverId] = useState("");



async function loadReports() {
  try {
    setLoading(true);

    const filters = {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      status: status || undefined,
      driverId: driverId
        ? Number(driverId)
        : undefined,
    };

    const shipmentReports =
      await getShipmentReports(filters);

    const driverPerformance =
      await getDriverPerformance(filters);

    setReports(shipmentReports);
    setPerformance(driverPerformance);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  loadReports();
}, []);

  if (loading) {
    return (
      <p className="text-center text-lg font-semibold">
        Cargando reportes...
      </p>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Reportes Logísticos
      </h1>

    <ReportFilters
     startDate={startDate}
     endDate={endDate}
     status={status}
     driverId={driverId}
     setStartDate={setStartDate}
     setEndDate={setEndDate}
     setStatus={setStatus}
     setDriverId={setDriverId}
     onSearch={loadReports}
    />

      <ReportTable reports={reports} />

      <div className="mt-10">
        <DriverPerformanceChart
        performance={performance}
        />
     </div>

    </div>
  );
}