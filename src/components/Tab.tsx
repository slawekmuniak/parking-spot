import { useContext } from "react";
import { TeamsFxContext } from "./TeamsFxContext";
import { VehicleList } from "./vehicles/VehicleList";
import { ReservationList } from "./reservations/ReservationList";
import { ParkingSpotDashboard } from "./parkingSpots/ParkingSpotDashboard";
import React from "react";

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <div className={themeString === "default" ? "light" : themeString === "dark" ? "dark" : "contrast"}>

      <div className="horizontal-panel">
        <div className="panel">
          <VehicleList />
        </div>
        <div className="panel">
          <ReservationList />
        </div>
      </div>
      <div className="panel">
        <ParkingSpotDashboard />
      </div>
    </div>
  );
}
