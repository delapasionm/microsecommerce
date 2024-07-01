import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'EcomZone API',
        description: 'API documentation for EcomZone',
    },
    host: 'localhost:3006',
    schemes: ['http'],
    email: 'tisaw@gmail.com',
    password: 'admin',
    tags: [
        {
            name: 'Order',
            description: 'Endpoints related to order operations',
        },
        {
            name: 'OrderProduct',
            description: 'Endpoints related to orderProduct operations',
        },

    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); // Avvia il server solo dopo aver generato la documentazione
});
