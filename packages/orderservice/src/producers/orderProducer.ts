import kafka from '../config/kafka';
import {Partitioners} from "kafkajs";
const orderProducer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});

export const produceOrderMessage = async (message: object): Promise<void> => {
    await orderProducer.connect();
    await orderProducer.send({
        topic: 'order-topic',
        messages: [
            { value: JSON.stringify(message) },
        ],
    });
    await orderProducer.disconnect();
};
