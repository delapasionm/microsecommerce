import {NextFunction, Request, Response} from 'express';
import * as userService from '../services/UserService';


export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['User']
    try {
        const users = await userService.findAll();
        res.json(users);
        //logger.info('findAll andata a buon fine');
    } catch (error) {
        //logger.warn('Errore in findAll');
        //logger.error(error);
        //next(error);
        console.log(error)
    }
}


export const findOrdersByEmail = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['User']
    try {
        const {email} = req.query
        console.log(email)
        if (!email) {
            throw Error
        }
        const users = await userService.findOrdersByEmail(email.toString());
        res.json(users);
        //logger.info('findAll andata a buon fine');
    } catch (error) {
        //logger.warn('Errore in findAll');
        //logger.error(error);
        //next(error);
        console.log(error)
    }
}
