export interface IVehiclesResponse {
  vehicles: IVehicleResponse[];
  error?: string;
}

export interface IVehicleResponse {
  VehicleId: number;
  RegistrationNumber: string;
  Description: string;
}