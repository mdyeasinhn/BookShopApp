import { Router } from "express";
import { orderController } from "./order.controller";
import auth from "../auth/auth";


const orderRoutes = Router();

orderRoutes.get("/verify", orderController.verifyPayment);
orderRoutes.post('/', auth("user"), orderController.createOrder);
orderRoutes.get('/', orderController.getAllOrders);
// orderRoutes.get('/revenue', orderController.revenueCalculate);



export default orderRoutes ;


