import { TeamsUserCredential, TeamsUserCredentialAuthConfig } from "@microsoft/teamsfx";
import { Button } from "@fluentui/react-components";
import { ParkingSpotDashboard } from "../parkingSpots/ParkingSpotDashboard";
import React from "react";
import { ReservationList } from "../reservations/ReservationList";
import { VehicleList } from "../vehicles/VehicleList";
import axios from "axios";
import config from "../../common/config";

export default function Dashboard() {

  const click = async () => {

    const authConfig: TeamsUserCredentialAuthConfig = {
      clientId: process.env.REACT_APP_CLIENT_ID!,
      initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL!,
    };
    const teamsUserCredential = new TeamsUserCredential(authConfig);
    const accessToken = await teamsUserCredential.getToken(""); // Get SSO token
    const endpoint = config.apiEndpoint;
    const response = await axios.get(endpoint + "/api/" + "vehicle", {
      headers: {
        Authorization: `Bearer ${accessToken?.token}`,
      },
    });
    alert(response.data);
  }

  return (
    <>

      <Button onClick={() => { click() }}>Send</Button>
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
    </>
  );
}
