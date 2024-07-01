import {NextFunction, Request, Response} from 'express';
import * as orderProductService from '../services/OrderProductService';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['OrderProduct']
    try {
        const result = await orderProductService.findAll();
        res.json(result);
        //logger.info('findAll andata a buon fine');
    } catch (error) {
        //logger.warn('Errore in findAll');
        //logger.error(error);
        //next(error);
        console.log(error)
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['OrderProduct']
    try {
        console.log(req.body)
        const {id} = req.params
        const orderProduct = await orderProductService.orderProductfindById(parseInt(id))
        if (orderProduct) {
            res.json(orderProduct)
        } else {
            res.status(404).json({
                message: "OrderProduct" +
                    " not found"
            })
        }
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const createOrderProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    /*
    // #swagger.tags = ['OrderProduct']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                productId: 1,
                quantity: 10
            }
        }
    */

    try {
        if (!req.user || !req.body.quantity) {
            res.status(401).json({error: 'Utente non autenticato'});
        } else {
            const {productId, quantity} = req.body
            const orderProduct = await orderProductService.createOrderProduct(productId, quantity, req.user)
            if (orderProduct) {
                res.json(orderProduct)
            } else {
                res.status(404).json({
                    message: "OrderProduct not created"
                })
            }
        }


    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const deleteOrderProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // #swagger.tags = ['OrderProduct']
    try {
        console.log(req.body)
        const {id} = req.params
        const orderProduct = await orderProductService.deleteOrderProduct
        (id)
        res.status(201).json({
            message: "OrderProduct" +
                " deleted"
        })
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}
