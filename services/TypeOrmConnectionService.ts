import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
import {Products as ProductsEntity} from "../src/typeorm/entities/Products";
import {createConnection} from "typeorm";

const createTypeOrmConnection = async () => {

    const options: MysqlConnectionOptions = {
        "name": "default",
        "type": "mysql",
        "host": "localhost",
        "port": 3306,
        "username": "root",
        "password": "password",
        "database": "algorhythms",
        "synchronize": false,
        entities:[ProductsEntity]
    }
    console.log("creating typeorm connection with " + options)

    const connection =  await createConnection(options);
    console.log("typeorm connection established")
    return connection;
}



export default createTypeOrmConnection;