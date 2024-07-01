import {AppDataSource} from "../data-source"
import {User} from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
// import {Order} from "../entity/Order";

// async function findAll() {
//     const users = await userRepository.find();
//     return users;
// }
const userRepository = AppDataSource.getRepository(User);
// const orderRepository = AppDataSource.getRepository(Order);

export const findAll = async () => {
    const users = await userRepository.find();
    return users;
};

export const registerUser = async (userData: Partial<User>): Promise<User> => {
    const newUser = await userRepository.create(userData)
    return await userRepository.save(newUser)
}

export const loginUser = async (email: string, password: string): Promise<string | null> => {
    const user = await userRepository.findOneBy({email})
    if (user && await bcrypt.compare(password, user.password) && process.env.JWT_SECRET) {
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'})
        return token
    }
    return null
}

export const userFindById = async (userId: number): Promise<User | null> => {

    const result = await userRepository.findOne({
        where: {id: userId},
        relations: ['cart', 'cart.user', 'cart.product']
    });
    return result;
};

export const findOrdersByEmail = async (email: string) => {
    const orders = await AppDataSource.query(`SELECT c."username", c."email",o."id" as "orderId", p."name" as "productName" FROM "user" "c" 
            JOIN "order" "o" ON c."id" = o."userId"
            JOIN "order_product" "op" ON o."id" = op."orderId"
            JOIN "product" "p" ON op."productId" = p."id"
            WHERE c."email" = $1
        `, [email])

    return orders
}


export const getUserFromJWT = async (token: string) => {
    try {

        if (process.env.JWT_SECRET) {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
            return {userId: decodedToken.userId};
        }
        return null
    } catch (error) {
        // Se il token non è valido o c'è un errore nella decodifica, restituisce null
        console.error('Errore durante la decodifica del token JWT:', error);
        return null;
    }
}
