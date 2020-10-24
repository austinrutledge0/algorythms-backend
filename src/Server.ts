import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import {Products as ProductsEntity} from '../src/typeorm/entities/Products';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import bodyParser from "body-parser";
import BaseRouter from './routes';
import logger from '@shared/Logger';
import {createConnection} from "typeorm";
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";

const app = express();
const { BAD_REQUEST } = StatusCodes;

app.use(bodyParser.urlencoded({
    extended: true
}));

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/
// eslint-disable-next-line @typescript-eslint/require-await
const connectionOptions: MysqlConnectionOptions = {
    "name": "default",
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "password",
    "database": "algorhythms",
    "synchronize": false,
    "entities": [ProductsEntity]
}
// I try not to disable the linter very often. But it was easier in this case then
// redoing the configuration of the entire app to handle a single top level await

// This initializes the connection to the database. Different database technologies can be easile
// swapped out by changing the typeOrm variables in .env

// eslint-disable-next-line @typescript-eslint/require-await
createConnection(connectionOptions).then(async connection => {
    logger.info("Typeorm connection established")
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
// Show routes called in console during development
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

// Security
    if (process.env.NODE_ENV === 'production') {
        app.use(helmet());
    }

// Add APIs
    app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        logger.err(err, true);
        return res.status(BAD_REQUEST).json({
            error: err.message,
        });
    });


    /************************************************************************************
     *                              Serve front-end content
     ***********************************************************************************/

    const viewsDir = path.join(__dirname, 'views');
    app.set('views', viewsDir);
    const staticDir = path.join(__dirname, 'public');
    app.use(express.static(staticDir));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile('index.html', {root: viewsDir});
    });
}).catch(error => logger.err("TypeORM connection error: ", error));
// Export express instance
export default app;
