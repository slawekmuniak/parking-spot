import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import { ErrorResponse, IResponse, OkResponse } from "../models/IResponse";
import { IReservation } from "../models/IReservation";
import { Connection } from "tedious";
import { getCurrentUserInfo } from "../common/user.service";
import { executeSqlQuery, getDbConnection } from "../common/db.service";

const getGetUserReservationsQuery = (userId: string) => {
  return `SELECT ReservationId, ParkingSpotId, VehicleId, DateTimeFrom, DateTimeTo
          FROM dbo.Reservations WHERE UserId = '${userId}'`;
};

const getAddReservationQuery = (userId: string, reservation: IReservation) => {
  return `INSERT INTO dbo.Reservations (ParkingSpotId, VehicleId, DateTimeFrom, DateTimeTo, UserId) 
          VALUES (N'${reservation.ParkingSpotId}', N'${reservation.VehicleId}', N'${reservation.DateTimeFrom}', N'${reservation.DateTimeTo}', N'${userId}')`;
};

const getDeleteReservationQuery = (userId: string, reservationId: number) => {
  return `DELETE FROM dbo.Reservations 
          WHERE ReservationId = ${reservationId} AND UserId = '${userId}'`;
}

const getQuery = (request: HttpRequest, userId: string) => {
  switch (request.method) {
    case "GET": {
      return getGetUserReservationsQuery(userId);
    }
    case "POST": {
      const reservation = request.body as IReservation;
      return getAddReservationQuery(userId, reservation);
    }
    case "DELETE": {
      const ReservationId = Number.parseInt(request.params.ReservationId);
      return getDeleteReservationQuery(userId, ReservationId);
    }
    default: {
      throw new Error("Unsupported HTTP method type");
    }
  }
}

const reservation: AzureFunction = async (context: Context, request: HttpRequest, teamsfxContext: TeamsFxContext): Promise<IResponse> => {

  let connection: Connection;
  try {
    const currentUser = getCurrentUserInfo(teamsfxContext);
    const userId = currentUser.objectId;
    const query = getQuery(request, userId);
    connection = await getDbConnection();

    const response = {
      reservations: await executeSqlQuery(query, connection)
    };

    return Promise.resolve(OkResponse(response));
  } catch (e) {
    context.log(e);
    return Promise.resolve(ErrorResponse("Unhandled error."));
  } finally {
    connection?.close();
  }
};

export default reservation;