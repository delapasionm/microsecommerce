import {AppDataSource, DataBaseInizialitize} from "./data-source"
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {authenticateJWT} from "./middleware/authMiddleware";
import orderProductRoutes from "./routes/OrderProductRoutes";
import orderRoutes from "./routes/OrderRoutes";

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

app.use('/orders', authenticateJWT, orderRoutes);
app.use('/order-products', authenticateJWT, orderProductRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
