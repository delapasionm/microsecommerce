import {NextFunction, Request, Response} from 'express';
import * as orderService from '../services/OrderService';
import { produceOrderMessage } from '../producers/orderProducer';

export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Order']
    try {
        const users = await orderService.findAll();
        res.json(users);
        //logger.info('findAll andata a buon fine');
    } catch (error) {
        //logger.warn('Errore in findAll');
        //logger.error(error);
        //next(error);
        console.log(error)
    }
}

export const findById = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Order']
    try {
        console.log(req.body)
        const {id} = req.params
        const order = await orderService.orderfindById(parseInt(id))
        if (order) {
            res.json(order)
        } else {
            res.status(404).json({
                message: "Order" +
                    " not found"
            })
        }
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // #swagger.tags = ['Order']
    try {
        console.log('create order')

        if (!req.user) {
            res.status(401).json({error: 'Utente non autenticato'});
        } else {
            console.log(req.user)
            const order = await orderService.createOrder(1)
            if (order) {
                try {
                    // Produce order message to Kafka
                    await produceOrderMessage({orderId: 1});
                    res.status(200).json({ message: 'Order created and sent to Kafka' });
                } catch (error: any) {
                    res.status(500).json({ message: 'Error creating order', error: error.message });
                }
                //res.json(order)
            } else {
                res.status(404).json({
                    message: "Order not created"
                })
            }
        }


    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // #swagger.tags = ['Order']
    try {
        console.log(req.body)
        const {id} = req.params
        const order = await orderService.deleteOrder(id)
        res.status(201).json({
            message: "Order" +
                " deleted"
        })
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const checkoutOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // #swagger.tags = ['Order']
    try {
        console.log("checkout")
        if (!req.user) {
            res.status(404).json({message: "Not Authenticated"})
        } else {
            console.log(req.user)
            const order = await orderService.checkoutOrder(req.user)
            res.status(201).json({
                message: "Order" +
                    " Completed"
                , order
            })
        }

    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}
