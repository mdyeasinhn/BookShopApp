import { Router } from "express";
import { orderController } from "./order.controller";


const orderRoutes = Router();


orderRoutes.post('/', orderController.createOrder);
orderRoutes.get('/revenue', orderController.revenueCalculate);



export default orderRoutes ;


