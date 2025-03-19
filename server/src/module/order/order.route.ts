import { Router } from "express";
import { orderController } from "./order.controller";


const orderRoutes = Router();

orderRoutes.get("/verify", orderController.verifyPayment);
orderRoutes.post('/', orderController.createOrder);
orderRoutes.get('/', orderController.getAllOrders);
// orderRoutes.get('/revenue', orderController.revenueCalculate);



export default orderRoutes ;


