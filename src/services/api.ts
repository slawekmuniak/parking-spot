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

const API = {
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

  async getReservations() {
    const options = await getAxiosRequestConfig();
    const response = await axios.get<IReservationsResponse>(`${config.apiEndpoint}/api/reservation`, options);
    return response.data.reservations;
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

export default API;