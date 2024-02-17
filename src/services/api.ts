import { TeamsUserCredential, TeamsUserCredentialAuthConfig } from "@microsoft/teamsfx";
import axios, { AxiosRequestConfig } from "axios";
import config from "../common/config";
import { IVehiclesResponse } from "../models/IResponse";
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
  }
}

export default API;