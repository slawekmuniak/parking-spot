import { ParkingSpotDashboard } from "../parkingSpots/ParkingSpotDashboard";
import React from "react";
import { ReservationPanel } from "../reservations/ReservationPanel";
import { VehiclesPanel } from "../vehicles/VehiclesPanel";

export default function Dashboard() {

  return (
    <>
      <div className="horizontal-panel">
        <VehiclesPanel />
        <ReservationPanel />
      </div>
      <div className="panel">
        <ParkingSpotDashboard />
      </div>
    </>
  );
}
