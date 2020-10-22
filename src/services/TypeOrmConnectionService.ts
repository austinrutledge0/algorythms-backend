import {Connection, ConnectionManager, getConnectionManager} from "typeorm";


  const typeOrmConnection: () => Promise<Connection> = async () => {
    let portToUse = 3306
    if(process.env.TYPEORM_PORT !== undefined)
    {
       portToUse = +process.env.TYPEORM_PORT;
    }

    const connectionManager: ConnectionManager = new ConnectionManager();
     const connection: Connection = connectionManager.create({
        type: "mysql",
        host: process.env.TYPEORM_HOST,
        port: portToUse,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
    });
    await connection.connect();
    return connection;

}
export default typeOrmConnection
