import {AppDataSource} from "../data-source"
import 'dotenv/config';
import {OrderProduct} from "../entity/OrderProduct";
import {orderFindByUser} from "./OrderService";
import {Order} from "../entity/Order";

// async function findAll() {
//     const users = await userRepository.find();
//     return users;
// }
const orderProductRepository = AppDataSource.getRepository(OrderProduct);

export const findAll = async () => {
    const orderProducts = await orderProductRepository.find({relations: ['order', 'product']});
    return orderProducts;
};


export const orderProductfindById = async (orderProductId: number): Promise<OrderProduct | null> => {

    const orderProducts = await orderProductRepository.findOne({
        where: {id: orderProductId},
        relations: ['order', 'product']
    });
    return orderProducts;
};


export const orderFindByOrderAndProduct = async (order: Order, productId: number): Promise<OrderProduct | null> => {
    try {
        const orderId = order.id
        const orderProduct = await orderProductRepository.createQueryBuilder('op')
            .where('op.orderId = :orderId', {orderId})
            .andWhere('op.productId = :productId', {productId})
            .getOne();

        return orderProduct;
    } catch (error) {
        // Handle error
        console.error('Error retrieving order-product:', error);
        return null;
    }

}

export const createOrderProduct = async (productId: number, quantity: number, userId: number): Promise<OrderProduct | null> => {
    try {
        const order = await orderFindByUser(userId)
        if (!order) {
            return null
        }
        // const product = await productfindById(productId)
        // console.log("product")
        // console.log(product)
        // if (!product) {
        //     return null
        // }
        const orderProductDb = await orderFindByOrderAndProduct(order, productId)
        if (!orderProductDb) {
            console.log('if')
            const newOrderProductDb = orderProductRepository.create({quantity, order, productId})
            newOrderProductDb.order = order;
            newOrderProductDb.productId = productId;
            newOrderProductDb.quantity = quantity
            newOrderProductDb.unitPrice = 10.99;
            newOrderProductDb.totalPrice = 10.99 * quantity;
            console.log("newOrderProductDb")
            console.log(newOrderProductDb)
            await orderProductRepository.save(newOrderProductDb);
            return newOrderProductDb
        } else {
            console.log('else')
            orderProductDb.quantity = quantity
            orderProductDb.unitPrice = 10.99;
            orderProductDb.totalPrice = 10.99 * quantity;
            console.log("orderProductDb")
            console.log(orderProductDb)
            await orderProductRepository.save(orderProductDb);
            return orderProductDb
        }
    } catch (e) {
        console.log(e)
        return null
    }


}

export const deleteOrderProduct = async (orderProductId: string): Promise<void> => {
    const orderProduct = await orderProductRepository.findOneBy({id: parseInt(orderProductId)});
    if (orderProduct) {
        await orderProductRepository.delete({id: parseInt(orderProductId)})
    }
}
