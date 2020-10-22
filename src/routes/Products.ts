import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
const router = Router();

const { BAD_REQUEST, CREATED, OK } = StatusCodes;

import {Products  as ProductsEntity }from '@typeorm/entities/Products';


import {EntityTarget, getConnection} from "typeorm";






router.get('/', async (req: Request, res: Response) => {
    const connection = getConnection();
    const allProducts = await connection.manager.find(ProductsEntity);
    return res.status(OK).json({allProducts});
});
router.post('/createProduct', async (req: Request, res: Response) => {
    const connection = getConnection();
    const productToCreate = new ProductsEntity();
    productToCreate.productnumber = req.body.productnumber;
    productToCreate.productname = req.body.productname;
    productToCreate.price = req.body.price;
    productToCreate.numberinstock = req.body.numberinstock;

    console.log(productToCreate)
    await connection.manager.save(productToCreate);
    return res.status(OK).json({});
});
router.post('/createProducts', async (req: Request<ProductsEntity[]>, res: Response) => {
    const connection = getConnection();
    const productsToCreate: EntityTarget<ProductsEntity[]> = req.body;
    connection.manager.create(productsToCreate);
    return res.status(OK).json({});
});




export default router;
