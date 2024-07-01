import kafka from '../config/kafka';
import * as productService from '../services/ProductService';
const consumer = kafka.consumer({ groupId: 'product-update-consumer-group' });

export const consumeProductUpdates = async (): Promise<void> => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'order-topic' }); // Subscribe to the topic where orders are published

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // const newProduct = {
            //     name: "Product C",
            //     price: 12.00,
            //     description: "example product c",
            //     stock: 100
            // }
            // const product = await productService.createProduct(newProduct)

            console.log({
                value: message.value!.toString(),
                partition,
                topic,
            });
        },
    });
};
