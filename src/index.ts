import express from 'express';
import gatewayRoutes from './routes/gatewayRoutes';
import swaggerUi from "swagger-ui-express";

const swaggerFile = require('./swagger-output.json');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json()); // Per JSON
app.use(express.urlencoded({extended: true}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', gatewayRoutes);

app.listen(PORT, () => {
    console.log(`Server in ascolto sulla porta ${PORT}`);
});
