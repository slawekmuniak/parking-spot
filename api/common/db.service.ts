
import { Connection, Request } from "tedious";
import config from "../config"

export const getDbConnection = (): Promise<Connection> => {
  const connection = new Connection({
    server: config.sqlEndpoint,
    options: {
      connectTimeout: 10000,
      database: config.sqlDatabaseName
    },
    authentication: {
      type: "default",
      options: {
        userName: config.sqlUserName,
        password: config.sqlPassword
      }
    }
  });

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

export const executeSqlQuery = <T>(query: string, connection: Connection) => {
  return new Promise<T[]>((resolve, reject) => {
    const res: T[] = [];
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      }
    });

    request.on('row', columns => {
      const item = {} as T;
      columns.forEach(column => {
        item[column.metadata.colName] = column.value;
      });
      res.push(item)
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