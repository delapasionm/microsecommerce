import express, {Request, Response, Router} from 'express';
import axios from 'axios';

const router: Router = express.Router();

const services = [
    {name: 'orderservice', port: 3006},
    {name: 'productservice', port: 3005},
    {name: 'userservice', port: 3004},
];


services.forEach(service => {
    const baseUrl = `http://localhost:${service.port}`;


    router.use(`/${service.name}`, async (req: Request, res: Response) => {
        try {
            const authToken = req.headers.authorization; // Ottieni il token dall'header della richiesta

            const headers = {
                Authorization: authToken ? authToken : '', // Aggiungi il token nell'header della richiesta
            };

            const url = `${baseUrl}${req.url}`;
            const response = await axios({
                method: req.method as any,
                url,
                data: req.body,
                params: req.query,
                headers
            });

            res.json(response.data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(`Errore durante la richiesta a ${service.name}:`, error.message);
            } else {
                console.error('Errore sconosciuto:', error);
            }
            res.status(500).json({error: `Errore durante la richiesta a ${service.name}`});
        }
    });
});

export default router;
