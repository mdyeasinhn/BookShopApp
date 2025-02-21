import { Request, Response } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createOrder = async (req: Request, res: Response) => {
        const order = req.body;
        const result = await orderService.createOrder(order);

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.CREATED,
            message: "Order created successfully",
            data: result,
        });
}

const revenueCalculate = async (req: Request, res: Response): Promise<void> => {

        const revenue = await orderService.revenueCalculate()
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: 'Revenue calculated successfully',
            data: revenue,
        })
}

export const orderController = {
    createOrder,
    revenueCalculate,
}