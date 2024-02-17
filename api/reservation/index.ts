import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import { ErrorResponse, IResponse, OkResponse } from "../models/IResponse";
import { IReservation } from "../models/IReservation";
import { Connection } from "tedious";
import { getUser } from "../common/user.service";
import { execQuery, getConnection } from "../common/db.service";

const getGetUserreservationsQuery = (userId: string) => {
  return `SELECT ReservationId, VehicleId, From, To
          FROM dbo.Reservations WHERE UserId = '${userId}'`;
};

const getAddreservationQuery = (userId: string, reservation: IReservation) => {
  return `INSERT INTO dbo.Reservations (VehicleId, From, To, UserId) 
          VALUES (N'${reservation.VehicleId}', N'${reservation.From}', N'${reservation.To}', N'${userId}')`;
};

const getDeleteVewhicleQuery = (userId: string, reservationId: number) => {
  return `DELETE FROM dbo.Reservations 
          WHERE ReservationId = ${reservationId} AND UserId = '${userId}'`;
}

const getQuery = (request: HttpRequest, userId: string) => {
  switch (request.method) {
    case "GET": {
      return getGetUserreservationsQuery(userId);
    }
    case "POST": {
      const reservation = request.body as IReservation;
      return getAddreservationQuery(userId, reservation);
    }
    case "DELETE": {
      const ReservationId = Number.parseInt(request.params.ReservationId);
      return getDeleteVewhicleQuery(userId, ReservationId);
    }
    default: {
      throw new Error("Unsupported HTTP method type");
    }
  }
}

const reservation: AzureFunction = async (context: Context, request: HttpRequest, teamsfxContext: TeamsFxContext): Promise<IResponse> => {

  let connection: Connection;
  try {
    const currentUser = getUser(teamsfxContext);
    const userId = currentUser.objectId;
    const query = getQuery(request, userId);
    connection = await getConnection();

    const response = {
      reservations: await execQuery(query, connection)
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