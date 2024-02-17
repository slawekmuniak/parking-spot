import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import { ErrorResponse, IResponse, OkResponse } from "../models/IResponse";
import { IVehicle } from "../models/IVehicle";
import { Connection } from "tedious";
import { getCurrentUserInfo } from "../common/user.service";
import { executeSqlQuery, getDbConnection } from "../common/db.service";

const getGetUserVehiclesQuery = (userId: string) => {
  return `SELECT VehicleId, RegistrationNumber, Description 
          FROM dbo.Vehicles WHERE UserId = '${userId}'`;
};

const getAddVehicleQuery = (userId: string, vehicle: IVehicle) => {
  return `INSERT INTO dbo.Vehicles (RegistrationNumber, [Description], UserId) 
          VALUES (N'${vehicle.RegistrationNumber}', N'${vehicle.Description}', N'${userId}')`;
};

const getUpdateVehicleQuery = (userId: string, vehicle: IVehicle) => {
  return `UPDATE dbo.Vehicles 
          SET RegistrationNumber = N'${vehicle.RegistrationNumber}', Description = N'${vehicle.Description}' 
          WHERE VehicleId = ${vehicle.VehicleId} AND UserId = '${userId}'`;
}

const getDeleteVewhicleQuery = (userId: string, vehicleId: number) => {
  return `DELETE FROM dbo.Vehicles 
          WHERE VehicleId = ${vehicleId} AND UserId = '${userId}'`;
}

const getQuery = (request: HttpRequest, userId: string) => {
  switch (request.method) {
    case "GET": {
      return getGetUserVehiclesQuery(userId);
    }
    case "POST": {
      const vehicle = request.body as IVehicle;
      if (vehicle.VehicleId > 0) {
        return getUpdateVehicleQuery(userId, vehicle);
      } else {
        return getAddVehicleQuery(userId, vehicle);
      }
    }
    case "DELETE": {
      const vehicleId = Number.parseInt(request.params.VehicleId);
      return getDeleteVewhicleQuery(userId, vehicleId);
    }
    default: {
      throw new Error("Unsupported HTTP method type");
    }
  }
}

const vehicle: AzureFunction = async (context: Context, request: HttpRequest, teamsfxContext: TeamsFxContext): Promise<IResponse> => {

  let connection: Connection;
  try {
    const currentUser = getCurrentUserInfo(teamsfxContext);
    const userId = currentUser.objectId;
    const query = getQuery(request, userId);
    connection = await getDbConnection();

    const response = {
      vehicles: await executeSqlQuery(query, connection)
    };

    return Promise.resolve(OkResponse(response));
  } catch (e) {
    context.log(e);
    return Promise.resolve(ErrorResponse("Unhandled error."));
  } finally {
    connection?.close();
  }
};

export default vehicle;