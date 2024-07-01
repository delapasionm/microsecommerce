import {AppDataSource} from "../data-source"
import 'dotenv/config';
import {Product} from "../entity/Product";

const productRepository = AppDataSource.getRepository(Product);

export const findAll = async () => {
    const products = await productRepository.find();
    return products;
};


export const productfindById = async (productId: number): Promise<Product | null> => {

    const product = await productRepository.findOneBy({id: productId});
    return product;
};


export const createProduct = async (newProduct: Partial<Product>): Promise<Product | null> => {
    const product = await productRepository.save(newProduct)
    return product
}

export const deleteProduct = async (productId: string): Promise<void> => {
    const product = await productRepository.findOneBy({id: parseInt(productId)});
    if (product) {
        await productRepository.delete({id: parseInt(productId)})
    }
}
