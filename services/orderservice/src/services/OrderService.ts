import {AppDataSource} from "../data-source"
import 'dotenv/config';
import {Order} from "../entity/Order";
// import {User} from "../entity/User";
// import {userFindById} from "./UserService";
import {OrderProduct} from "../entity/OrderProduct";
// import {Cart} from "../entity/Cart";

// async function findAll() {
//     const users = await userRepository.find();
//     return users;
// }
const orderRepository = AppDataSource.getRepository(Order);
const orderProductRepository = AppDataSource.getRepository(OrderProduct);

export const findAll = async () => {
    //{relations: ['user']}
    const orders = await orderRepository.find();
    return orders;
};


export const orderfindById = async (orderId: number): Promise<Order | null> => {

    const result = await orderRepository.findOne({
        where: {id: orderId},
        //relations: ['user']
    });
    return result;
};

export const orderFindByUser = async (user: number): Promise<Order | null> => {
    try {
        const order = await orderRepository.createQueryBuilder('o')
            .innerJoin('o.user', 'u')
            .where('u.id = :userId', {user})
            .getOne();

        return order;
    } catch (error) {
        // Handle error
        console.error('Error retrieving order:', error);
        return null;
    }

    // console.log("user.id")
    // console.log(user.id)
    // const result = await AppDataSource.query(`SELECT o.* FROM "user" "u" JOIN "order" "o" ON u."id" = o."userId" WHERE u."id" = $1`, [user.id]);
    // console.log(result)
    // return result[0];
}


export const createOrder = async (user: number): Promise<Order | null> => {
    const newOrderDb = orderRepository.create({userId: user})
    await orderRepository.save(newOrderDb);
    return newOrderDb
}

export const deleteOrder = async (orderId: string): Promise<void> => {
    const order = await orderRepository.findOneBy({id: parseInt(orderId)});
    if (order) {
        await orderRepository.delete({id: parseInt(orderId)})
    }
}

export const checkoutOrder = async (user: number): Promise<void> => {
    console.log('checkoutorder')
    // const userDb = await userFindById(user)
    //
    // if (!userDb) {
    //     throw new Error('User not found');
    // }
    // if (userDb.cart.length === 0) {
    //     throw new Error('Cart is empty');
    // }
    // console.log(userDb)
    // await AppDataSource.transaction(async transactionalEntityManager => {
    //     console.log("transaction")
    //     const newOrderDb = orderRepository.create({userId: user})
    //     const savedOrder = await transactionalEntityManager.save(newOrderDb)
    //
    //     for (const cart of userDb.cart) {
    //         const product = cart.product
    //         if (product.stock < cart.quantity) {
    //             throw new Error(`Not enough stock for product ${product.name}`);
    //         }
    //         product.stock -= cart.quantity
    //         await transactionalEntityManager.save(product)
    //
    //         const newOrderProductDb = orderProductRepository.create()
    //         newOrderProductDb.order = savedOrder;
    //         newOrderProductDb.product = product;
    //         newOrderProductDb.quantity = cart.quantity
    //         newOrderProductDb.unitPrice = product.price;
    //         newOrderProductDb.totalPrice = product.price * cart.quantity;
    //         console.log("newOrderProductDb")
    //         console.log(newOrderProductDb)
    //         await transactionalEntityManager.save(newOrderProductDb);
    //     }
    //     await transactionalEntityManager.remove(Cart, user.cart);
    // })
}
