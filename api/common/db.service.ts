
import { Connection, Request } from "tedious";
import config from "../config"

export const getConnection = (): Promise<Connection> => {
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

  return new Promise((resol ve, reject) => {
  connection.on('connect', err => {
    if (err) {
      reject(err);
    }
    resolve(connection);
  });
  connection.connect();
})
}

export const execQuery = <T>(query: string, connection: Connection) => {
  return new Promise<T[]>((resolve, reject) => {
    const res: T[] = [];
    const request = new Request(query, (err) => {
      if (err) {
        reject(err);
      }
    });

    request.on('row', columns => {
      console.log("row")
      const item = {} as T;
      columns.forEach(column => {
        console.log("column" + column)
        item[column.metadata.colName] = column.value;
      });
      res.push(item)
    });

    request.on('requestCompleted', () => {
      console.log("requestCompleted" + res)
      resolve(res)
    });

    request.on("error", err => {
      console.log(err)
      reject(err);
    });

    connection.execSql(request);
  })
}