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
            const url = `${baseUrl}${req.url}`;
            const response = await axios({
                method: req.method as any,  // Cast esplicito a 'any' per bypassare il controllo di TypeScript
                url,
                data: req.body,
                params: req.query,
            });
            res.json(response.data);
        } catch (error) {
            const errorMessage = error as string
            console.error(`Errore durante la richiesta a ${service.name}:`, errorMessage);
            res.status(500).json({error: `Errore durante la richiesta a ${service.name}`});
        }
    });
});

export default router;
