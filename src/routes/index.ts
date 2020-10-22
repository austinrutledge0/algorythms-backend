import { Router } from 'express';
import ProductsRouter from './Products'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/products', ProductsRouter);

// Export the base-router
export default router;
