import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import config from "../config"
import { OnBehalfOfCredentialAuthConfig, OnBehalfOfUserCredential } from "@microsoft/teamsfx";
import { TeamsFxContext } from "@microsoft/teamsfx-react";
import { Response } from "../models/Response";
import { IVehicle } from "../models/IVehicle";
import { Connection, ConnectionConfig, Request } from "tedious";

const getConnection = (config: ConnectionConfig): Promise<Connection> => {
  const connection = new Connection(config);
  return new Promise((resolve, reject) => {
    connection.on('connect', err => {
      if (err) {
        reject(err);
      }
      resolve(connection);
    });
    connection.connect();
  })
}

const execQuery = (query: string, connection: Connection) => {
  return new Promise((resolve, reject) => {
    const res = [];
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      }
    });

    request.on('row', columns => {
      const row = {};
      columns.forEach(column => {
        row[column.metadata.colName] = column.value;
      });
      res.push(row)
    });

    request.on('requestCompleted', () => {
      resolve(res)
    });

    request.on("error", err => {
      reject(err);
    });

    connection.execSql(request);
  })
}

const vehicle: AzureFunction = async (context: Context, req: HttpRequest, teamsfxContext: TeamsFxContext): Promise<Response> => {
  let connection: Connection;
  try {
    context.log(`[${req.method}] [vehicle] HTTP trigger function - start processing request.`);

    const oboAuthConfig: OnBehalfOfCredentialAuthConfig = {
      authorityHost: config.authorityHost,
      clientId: config.clientId,
      tenantId: config.tenantId,
      clientSecret: config.clientSecret,
    };

    const token = teamsfxContext["AccessToken"];
    const credentials = new OnBehalfOfUserCredential(token, oboAuthConfig);
    const currentUser = credentials.getUserInfo();
    const userId = currentUser.objectId;

    let query: string;
    switch (req.method) {
      case "GET": {
        query = `SELECT VehicleId, RegistrationNumber, Description 
                 FROM dbo.Vehicles WHERE UserId = '${userId}'`;
        break;
      }
      case "PUT": {
        const data = req.body as IVehicle;
        query = `UPDATE dbo.Vehicles 
                 SET RegistrationNumber = N'${data.RegistrationNumber}', Description = N'${data.Description}' 
                 WHERE VehicleId = ${data.VehicleId}`;
        break;
      }
      case "POST": {
        const data = req.body as IVehicle;
        query = `INSERT INTO dbo.Vehicles (RegistrationNumber, [Description], UserId) 
                 VALUES (N'${data.RegistrationNumber}', N'${data.Description}', '${userId}')`;
        break;
      }
      case "DELETE": {
        const vehicleId = req.body.VehicleId;
        query = `DELETE FROM dbo.Vehicles 
                 WHERE VehicleId = ${vehicleId} AND UserId = ${userId}`;
        break;
      }
    }

    connection = await getConnection({
      server: config.sqlEndpoint,
      options: {
        connectTimeout: 10000,
        database: "parkingspotsmu"
      },
      authentication: {
        type: "default",
        options: {
          userName: config.sqlUserName,
          password: config.sqlPassword
        }
      }
    });

    const result = await execQuery(query, connection);

    return Promise.resolve({
      status: 200,
      body: {
        data: result
      }
    })
  } catch (e) {
    context.log("Error: " + e);
    return Promise.resolve({
      status: 500,
      body: {
        error: "Cannot process your request"
      }
    })
  }
  finally {
    connection?.close();
  }
};

export default vehicle;