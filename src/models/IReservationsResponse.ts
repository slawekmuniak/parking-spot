import { IReservation } from "./IReservation";


export interface IReservationsResponse {
  reservations: IReservation[];
  error?: string;
}
