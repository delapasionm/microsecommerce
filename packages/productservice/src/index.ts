import {AppDataSource, DataBaseInizialitize} from "./data-source"
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {authenticateJWT} from "./middleware/authMiddleware";
import productRoutes from "./routes/ProductRoutes";
import { consumeProductUpdates } from './consumers/productConsumer';

const swaggerFile = require('./swagger-output.json');
const PORT = process.env.PORT || 3000;
const app = express();

app.locals.dataSource = AppDataSource;
DataBaseInizialitize()
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.json({message: 'Hello, world! ProductService'});
});

app.use('/products', productRoutes);
async function startApp(): Promise<void> {
    try {
        await consumeProductUpdates();
        console.log('Product update consumer started...');
    } catch (error) {
        console.error('Error starting product update consumer:', error);
        process.exit(1);
    }
}

startApp().then(() => console.log("Ok startApp then"));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
