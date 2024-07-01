import {NextFunction, Request, Response} from 'express';
import * as productService from '../services/ProductService';


export const findAll = async (req: Request, res: Response, next: NextFunction) => {
    // #swagger.tags = ['Product']

    try {
        console.log('findall')
        const users = await productService.findAll();
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
    // #swagger.tags = ['Product']
    try {
        console.log(req.body)
        const {id} = req.params
        const product = await productService.productfindById(parseInt(id))
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: "Product not found"})
        }
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    /*
        // #swagger.tags = ['Product']
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                name: "Product B",
                price: "12.00",
                description: "example product b"
            }
        }
    */
    try {
        const newProduct = req.body
        const product = await productService.createProduct(newProduct)
        if (product) {
            res.json(product)
        } else {
            res.status(404).json({message: "Product not created"})
        }
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // #swagger.tags = ['Product']
    try {
        console.log(req.body)
        const {id} = req.params
        const product = await productService.deleteProduct(id)
        res.status(201).json({message: "Product deleted"})
    } catch (e) {
        res.status(400).json({message: "Error Generic", e})
    }
}
