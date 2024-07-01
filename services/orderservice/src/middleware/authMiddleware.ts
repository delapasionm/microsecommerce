import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {UserPayload} from "../types/express";
import {AppDataSource} from "../data-source";
// import {User} from "../entity/User";

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
        try {
            console.log("middleware")
            console.log(token)
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
            // const userRepository = AppDataSource.getRepository(User);
            //const user = await userRepository.findOneBy({id: decodedToken.id});
            // if (!user) {
            //     res.status(401).json({error: 'Utente non trovato'});
            // }
            req.user = decodedToken.id;
            console.log(decodedToken.id)
            next();
        } catch (error) {
            res.status(401).json({error: 'Token non valido'});
        }
    } else {
        res.status(401).json({error: 'Token non valido'});
    }
};
