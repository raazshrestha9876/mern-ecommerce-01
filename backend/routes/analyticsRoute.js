import express from 'express';
import { getAnalyticsForAdmin, getCategoryAnalytics, getMontlyRevenue, getTopFoods } from '../controllers/analyticsController.js';

const analyticsRouter = express.Router();

analyticsRouter.get('/get-category-analytics', getCategoryAnalytics);
analyticsRouter.get('/get-monthly-revenue', getMontlyRevenue);
analyticsRouter.get('/get-top-foods', getTopFoods); 
analyticsRouter.get('/get-admin-analytics',  getAnalyticsForAdmin);


export default analyticsRouter;