import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'EcomZone API',
        description: 'API documentation for EcomZone',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    email: 'tisaw@gmail.com',
    password: 'admin',
    tags: [
        {
            name: 'Auth',
            description: 'Endpoints related to order operations',
        },
        {
            name: 'Cart',
            description: 'Endpoints related to order operations',
        },

        {
            name: 'Order',
            description: 'Endpoints related to order operations',
        },
        {
            name: 'OrderProduct',
            description: 'Endpoints related to orderProduct operations',
        },

        {
            name: 'Product',
            description: 'Endpoints related to product operations',
        },

        {
            name: 'User',
            description: 'Endpoints related to user operations',
        },
    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../services/orderservice/src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); // Avvia il server solo dopo aver generato la documentazione
});
