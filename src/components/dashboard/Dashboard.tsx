import { ParkingSpotDashboard } from "../parkingSpots/ParkingSpotDashboard";
import React from "react";
import { ReservationList } from "../reservations/ReservationList";
import { VehiclesPanel } from "../vehicles/VehiclesPanel";

export default function Dashboard() {

  return (
    <>
      <div className="horizontal-panel">
        <VehiclesPanel />
        <div className="panel">
          <ReservationList />
        </div>
      </div>
      <div className="panel">
        <ParkingSpotDashboard />
      </div>
    </>
  );
}
