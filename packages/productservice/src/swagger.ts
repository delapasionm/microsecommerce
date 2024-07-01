import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'EcomZone API',
        description: 'API documentation for EcomZone',
    },
    host: 'localhost:3005',
    schemes: ['http'],
    email: 'tisaw@gmail.com',
    password: 'admin',
    tags: [
        {
            name: 'Product',
            description: 'Endpoints related to product operations',
        },

    ],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
    require('./index'); // Avvia il server solo dopo aver generato la documentazione
});
