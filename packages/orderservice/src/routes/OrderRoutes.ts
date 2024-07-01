import express from 'express';
import * as orderController from '../controllers/OrderController'

const router = express.Router();

router.get('/', orderController.findAll);

router.get('/:id', orderController.findById);

router.post('/checkout', orderController.checkoutOrder);
router.post('/', orderController.createOrder);


router.delete('/:id', orderController.deleteOrder);

export default router;
