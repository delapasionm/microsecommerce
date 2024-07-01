import {AppDataSource, DataBaseInizialitize} from "./data-source"
import express from 'express';
import userRoutes from './routes/UserRoutes';
import authRoutes from "./routes/AuthRoutes";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import {authenticateJWT} from "./middleware/authMiddleware";

const swaggerFile = require('./swagger-output.json');

const PORT = process.env.PORT || 3000;
const app = express();

app.locals.dataSource = AppDataSource;
DataBaseInizialitize()
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.json({message: 'Hello, world! User Service'});
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
// app.use('/products', productRoutes);
//
// app.use('/orders', authenticateJWT, orderRoutes);
// app.use('/carts', authenticateJWT, cartRoutes);
// app.use('/order-products', authenticateJWT, orderProductRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
