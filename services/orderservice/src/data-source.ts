import "reflect-metadata"
import {DataSource} from "typeorm"
import {OrderProduct} from "./entity/OrderProduct";
import {Order} from "./entity/Order";
import {User} from "userservice/src/entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "postgres2",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: [Order, OrderProduct],
    migrations: [],
    subscribers: [],
})


// AppDataSource.initialize()
//     .then(() => {
//         console.log('Data Source has been initialized!');
//     })
//     .catch((err) => {
//         console.error('Error during Data Source initialization:', err);
//     });

export const DataBaseInizialitize = () => {
    AppDataSource.initialize().then(async () => {
        // console.log("Inserting a new user into the database...")
        // const user = new User()
        // user.firstName = "Timber"
        // user.lastName = "Saw"
        // user.age = 25
        // user.username = "tisaw"
        // user.email = "tisaw@gmail.com"
        // user.password = "admin"
        // await AppDataSource.manager.save(user)
        //
        // const users = await AppDataSource.manager.find(User)
        //
        // const product = new Product()
        // product.name = 'Product A'
        // product.price = 10.99
        // product.stock = 100
        // await AppDataSource.manager.save(product)
        // const product2 = new Product()
        // product2.name = 'Product B'
        // product2.price = 21.99
        // product2.stock = 200
        // await AppDataSource.manager.save(product2)
        //
        // const cart = new Cart()
        // cart.user = user
        // cart.product = product
        // cart.quantity = 1
        // await AppDataSource.manager.save(cart)

        const order = new Order();
        order.userId = 1;
        await AppDataSource.manager.save(order)
        // const order2 = new Order();
        // order2.userId = 1;
        // await AppDataSource.manager.save(order2)

        // Creazione dettaglio ordine
        // const orderDetail = new OrderProduct();
        // orderDetail.order = order;
        // orderDetail.product = product;
        // orderDetail.quantity = 1;
        // orderDetail.unitPrice = product.price;
        // orderDetail.totalPrice = product.price * orderDetail.quantity;
        // await AppDataSource.manager.save(orderDetail)

        // const orderDetail2 = new OrderProduct();
        // orderDetail2.order = order2;
        // orderDetail2.product = product;
        // orderDetail2.quantity = 1;
        // orderDetail2.unitPrice = product.price;
        // await AppDataSource.manager.save(orderDetail2)

        // const review = new Review();
        // review.user = user;
        // review.product = product;
        // review.rating = 5;
        // review.comment = 'Great laptop!';
        // await AppDataSource.manager.save(review)

        console.log("Here you can setup and run express / fastify / any other framework.")

    }).catch(error => console.log(error))
}


