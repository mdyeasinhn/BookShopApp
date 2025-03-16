import { Request, Response } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createOrder = async (req: Request, res: Response) => {
        const order = req.body;
        const result = await orderService.createOrder(order, req.user, req.ip!);

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Order created successfully",
            data: result,
        });
}
const verifyPayment = catchAsync(async (req, res) => {
    const order = await orderService.verifyPayment(req.query.order_id as string);
    res.status(200).json({
        success: true,
        message: 'Order verified successfully',
        data: order
    })
  });

const getAllOrders = catchAsync(async (req, res) => {
    const order = await orderService.getAllOrders();
  
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Order retrieved successfully",
      data: order,
    });
  });

export const orderController = {
    createOrder,
    getAllOrders,
    verifyPayment,
}