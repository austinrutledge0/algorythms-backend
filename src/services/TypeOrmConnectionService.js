var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getConnectionManager } from "typeorm";
// Takes config options from .env and opens a connection to the database.
// export default const mysqlConnectionOptions: MysqlConnectionOptions = {
//     type:"mysql",
//     host: process.env.TYPEORM_HOST ,
//     port: +process.env.TYPEORM_PORT,
//     username: process.env.TYPEORM_USERNAME,
//     password: process.env.TYPEORM_PASSWORD,
//     database: process.env.TYPEORM_DATASE,
// }
const createTypeOrmConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionManager = getConnectionManager();
    const connection = connectionManager.create({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
    });
    yield connection.connect();
    return connection;
});
module.exports = createTypeOrmConnection;
