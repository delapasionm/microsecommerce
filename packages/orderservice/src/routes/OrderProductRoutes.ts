import express from 'express';
import * as orderProductController from '../controllers/OrderProductController'

const router = express.Router();

router.get('/', orderProductController.findAll);

router.get('/:id', orderProductController.findById);

router.post('/', orderProductController.createOrderProduct);

router.delete('/:id', orderProductController.deleteOrderProduct);

export default router;
