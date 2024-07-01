import express from 'express';
import * as userController from '../controllers/userController'
const router = express.Router();

router.get('/', userController.findAll);
router.get('/orders-by-email', userController.findOrdersByEmail)

export default router;
