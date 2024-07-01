import express from 'express';
import * as productController from '../controllers/productController'
const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', productController.createProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
