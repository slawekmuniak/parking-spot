
export interface IReservationsResponse {
  reservations: IReservationResponse[];
  error?: string;
}

export interface IReservationResponse {
  ReservationId: number;
  ParkingSpotId: number;
  VehicleId: number;
  DateTimeFrom: string;
  DateTimeTo: string;
}