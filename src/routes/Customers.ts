import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';
const router = Router();

const { OK, INTERNAL_SERVER_ERROR } = StatusCodes;

import {Customers  as CustomersEntity }from '@typeorm/entities/Customers';


import {getConnection} from "typeorm";
import {apiRecordsNotDeletedMessage, apiRecordsNotInsertedMessage} from "@shared/stringGenerators";
import {Products as ProductsEntity} from "@typeorm/entities/Products";






router.get('/', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const allCustomers = await connection.manager.find(CustomersEntity);
        return res.status(OK).json({allCustomers});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});
router.get('/getCustomers', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const customer = await
            connection.manager.find(CustomersEntity, {customernumber:req.body.customernumber });
        return res.status(OK).json({customer});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});

router.post('/getCustomers', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const idsToGet: string[] = req.body.ids
        const customers =  await
            connection.manager.findByIds(CustomersEntity, idsToGet);
        return res.status(OK).json({customers});
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});

router.post('/createCustomer', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const customerToCreate = new CustomersEntity();
        customerToCreate.customernumber = req.body.customernumber;
        customerToCreate.cardnumber = req.body.cardnumber;
        customerToCreate.customerfirstname = req.body.customerfirstname;
        customerToCreate.customerlastname = req.body.customerlastname;
        customerToCreate.customershippingstreetaddress = req.body.customershippingstreetaddress;
        customerToCreate.customershippingzipcode = req.body.customershippingzipcode;
        customerToCreate.customershippingstate = req.body.customershippingstate;


        await connection.manager.save(customerToCreate);
        return res.status(OK);
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});
router.post('/createCustomers', async (req: Request, res: Response) => {
    try {
        const notInsertedArray: string[] = [];
        const connection = getConnection();
        const data: CustomersEntity[] = req.body;

        for (const customer of data) {
            const test = await connection.manager
                .find(CustomersEntity, {where:[{customernumber: customer.customernumber }]})
            if(test.length > 0)
            {
                notInsertedArray.push(customer.customernumber)
                continue;
            }
            else {
                const customerToCreate: CustomersEntity = new CustomersEntity();
                customerToCreate.customernumber = req.body.customernumber;
                customerToCreate.cardnumber = req.body.cardnumber;
                customerToCreate.customerfirstname = req.body.customerfirstname;
                customerToCreate.customerlastname = req.body.customerlastname;
                customerToCreate.customershippingstreetaddress =
                    req.body.customershippingstreetaddress;
                customerToCreate.customershippingzipcode = req.body.customershippingzipcode;
                customerToCreate.customershippingstate = req.body.customershippingstate;

                await connection.manager.insert(CustomersEntity, customerToCreate);

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

router.post('/deleteCustomer', async (req: Request, res: Response) => {
    try {
        const connection = getConnection();
        const customerToDelete = new CustomersEntity();
        customerToDelete.customernumber = req.body.customernumber;
        customerToDelete.cardnumber = req.body.cardnumber;
        customerToDelete.customerfirstname = req.body.customerfirstname;
        customerToDelete.customerlastname = req.body.customerlastname;
        customerToDelete.customershippingstreetaddress =
            req.body.customershippingstreetaddress;
        customerToDelete.customershippingzipcode = req.body.customershippingzipcode;
        customerToDelete.customershippingstate = req.body.customershippingstate;
        await connection.manager.remove(customerToDelete);
        return res.status(OK);
    }
    catch
    {
        return res.status(INTERNAL_SERVER_ERROR);
    }
});


router.post('/deleteCustomers', async (req: Request, res: Response) => {
    try {
        const notDeletedArray: string[] = [];
        const connection = getConnection();
        const idsToDelete: string[] = req.body.ids

        let i;
        for (i = 0; i < idsToDelete.length; i++)
        {
            const doesCustomerAlreadyExist = await connection.manager
                .find(ProductsEntity, {where:[{productnumber: idsToDelete[i] }]})
            if(doesCustomerAlreadyExist.length === 0)
            {
                notDeletedArray.push(idsToDelete[i])
                continue;
            }
            else {
                // You have to use delete instead of remove when deleting by id. Because Typeorm
                await
                    connection.manager.delete(CustomersEntity, {customernumber: idsToDelete[i]});
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
