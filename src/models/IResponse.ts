import { IVehicle } from "./IVehicle";

export interface IVehiclesResponse {
  vehicles: IVehicle[];
  error? : string;
}