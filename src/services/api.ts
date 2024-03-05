import { TeamsUserCredential, TeamsUserCredentialAuthConfig } from "@microsoft/teamsfx";
import axios, { AxiosRequestConfig } from "axios";
import config from "../common/config";
import { IReservation } from "../models/IReservation";
import { IReservationsResponse } from "../models/IReservationsResponse";
import { IVehiclesResponse } from "../models/IVehiclesResponse";
import { IVehicle } from "../models/IVehicle";

async function getAxiosRequestConfig(): Promise<AxiosRequestConfig> {
  const authConfig: TeamsUserCredentialAuthConfig = {
    clientId: config.clientId!,
    initiateLoginEndpoint: config.initiateLoginEndpoint!,
  };
  const teamsUserCredential = new TeamsUserCredential(authConfig);
  const accessToken = await teamsUserCredential.getToken("");
  return {
    headers: {
      Authorization: `Bearer ${accessToken?.token}`,
    },
  }
}

const Vehicles = {
  async getVehicles() {
    const options = await getAxiosRequestConfig();
    const response = await axios.get<IVehiclesResponse>(`${config.apiEndpoint}/api/vehicle`, options);
    return response.data.vehicles;
  },

  async addVehicle(vehicle: IVehicle) {
    const options = await getAxiosRequestConfig();
    return await axios.post(`${config.apiEndpoint}/api/vehicle`, vehicle, options);
  },

  async removeVehicle(vehicleId: number) {
    const options = await getAxiosRequestConfig();
    return await axios.delete(`${config.apiEndpoint}/api/vehicle/${vehicleId}`, options);
  },
}

const Reservations = {
  async getReservations(): Promise<IReservation[]> {
    return new Promise<IReservation[]>(async (resolve, reject) => {
      const options = await getAxiosRequestConfig();
      const response = await axios.get<IReservationsResponse>(`${config.apiEndpoint}/api/reservation`, options);
      if (response.data.error) {
        reject("Error");
        return;
      }
      const data = response.data.reservations.map<IReservation>((r) => ({
        VehicleId: r.VehicleId,
        ParkingSpotId: r.ParkingSpotId,
        ReservationId: r.ReservationId,
        DateTimeFrom: new Date(r.DateTimeFrom),
        DateTimeTo: new Date(r.DateTimeTo)
      }));
      resolve(data);
    })
  },

  async addReservation(reservation: IReservation) {
    const options = await getAxiosRequestConfig();
    return await axios.post(`${config.apiEndpoint}/api/reservation`, reservation, options);
  },

  async removeReservation(reservationId: number) {
    const options = await getAxiosRequestConfig();
    return await axios.delete(`${config.apiEndpoint}/api/reservation/${reservationId}`, options);
  }
}

const API = {
  Vehicles,
  Reservations
}

export default API;