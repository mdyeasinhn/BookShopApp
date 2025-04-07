import { Request, Response } from "express";
import { orderService } from "./order.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createOrder = catchAsync(async (req, res) => {
  const user = req?.user;
  console.log(user)
  const order = await orderService.createOrder(user, req.body, req.ip!);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Order placed successfully",
    data: order,
  });
});


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

const myOrder = catchAsync(async (req, res) => {
  const {email} = req.params
  const result = await orderService.myOrder(email);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'My Order is getting successfully',
    data: result
  })
})



export const orderController = {
  createOrder,
  getAllOrders,
  verifyPayment,
  myOrder,
}