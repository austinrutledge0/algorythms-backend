import { Router } from 'express';
import ProductsRouter from './Products'
import cors from 'cors';

// Init router and path
const router = Router();
router.use(cors())
// Add sub-routes
router.use('/products', ProductsRouter);

// Export the base-router
export default router;
