import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
const router = Router();

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

import {Products  as ProductsEntity }from '@typeorm/entities/Products';


import {getConnection} from "typeorm";
import {apiRecordsNotDeletedMessage, apiRecordsNotInsertedMessage} from "@shared/stringGenerators";






router.get('/', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const allProducts = await connection.manager.find(ProductsEntity);
        return res.status(OK).json({allProducts});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});
router.post('/createProduct', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const productToCreate = new ProductsEntity();
        productToCreate.productnumber = req.body.productnumber;
        productToCreate.productname = req.body.productname;
        productToCreate.price = req.body.price;
        productToCreate.numberinstock = req.body.numberinstock;
        await connection.manager.save(productToCreate);
        return res.status(OK);
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});
router.post('/createProducts', async (req: Request, res: Response) => {
    try {
        const notInsertedArray: string[] = [];
        const connection = getConnection();
        const data: ProductsEntity[] = req.body;

        for (const product of data) {
            const test = await connection.manager
                .find(ProductsEntity, {where:[{productnumber: product.productnumber }]})
            if(test.length > 0)
            {
                notInsertedArray.push(product.productnumber)
                continue;
            }
            else {
                const productToCreate: ProductsEntity = new ProductsEntity();
                productToCreate.productnumber = product.productnumber;
                productToCreate.productname = product.productname;
                productToCreate.price = product.price;
                productToCreate.numberinstock = product.numberinstock;

                await connection.manager.insert(ProductsEntity, productToCreate);

            }


        }

        const apiResponseBody = notInsertedArray.length > 0 ?
            apiRecordsNotInsertedMessage(notInsertedArray): "";
        return res.status(OK).json({apiResponseBody});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});

router.post('/deleteProduct', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const productToDelete = new ProductsEntity();
        productToDelete.productnumber = req.body.productnumber;
        productToDelete.productname = req.body.productname;
        productToDelete.price = req.body.price;
        productToDelete.numberinstock = req.body.numberinstock;
        await connection.manager.remove(productToDelete);
        return res.status(OK);
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});


router.post('/deleteProducts', async (req: Request, res: Response) => {
    try {
        const notDeletedArray: string[] = [];
        const connection = getConnection();
        const idsToDelete: string[] = req.body.ids

        let i;
        for (i = 0; i < idsToDelete.length; i++)
        {
            const doesProductAlreadyExist = await connection.manager
                .find(ProductsEntity, {where:[{productnumber: idsToDelete[i] }]})
            if(doesProductAlreadyExist.length === 0)
            {
                notDeletedArray.push(idsToDelete[i])
                continue;
            }
            else {
                // You have to use delete instead of remove when deleting by id. Because Typeorm
             await
                    connection.manager.delete(ProductsEntity, {productnumber: idsToDelete[i]});
            }


        }

        const apiResponseBody = notDeletedArray.length > 0 ?
            apiRecordsNotDeletedMessage(notDeletedArray): "";
        return res.status(OK).json({apiResponseBody});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});





export default router;
