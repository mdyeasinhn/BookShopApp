import mongoose from "mongoose";
import Book from "../Book/book.model";
import { IUser } from "../User/user.interface";
import User from "../User/user.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";
import { orderUtils } from "./order.utils";


const createOrder = async (user: IUser, payload: IOrder, client_ip: string): Promise<IOrder> => {
  //console.log("Payload:", payload);
  // console.log("User:", user);
  // console.log("Client IP:", client_ip);

  const session = await mongoose.startSession();
  session.startTransaction(); //  Start transaction explicitly

  try {
    const { book, quantity } = payload;

    //console.log("book->", payload)
    const bookData = await Book.findById(book).session(session);
    if (!bookData) {
      throw new Error("Book not found");
    }

    if (bookData.quantity < quantity) {
      throw new Error("Insufficient stock");
    }

    const totalPrice = Number(quantity * bookData.price);
    const currentUser = await User.findOne({ email: user.email }).session(session);

    const buyer = currentUser?._id?.toString();

    const updatedProduct = await Book.findOneAndUpdate(
      { _id: book, quantity: { $gte: quantity } },
      { $inc: { quantity: -quantity } },
      { new: true, session }
    );

    if (!updatedProduct) {
      throw new Error("Stock update failed, possibly due to insufficient stock");
    }

    const [order] = await Order.create([{ ...payload, totalPrice, buyer }], { session });

    // Payment Integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: user.name,
      customer_address: payload.address,
      customer_email: currentUser?.email,
      customer_phone: String(payload.contact),
      customer_city: payload.address,
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
      await Order.findByIdAndUpdate(
        order._id,
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        { session }
      );
    }

    await session.commitTransaction();
    session.endSession();

    return { order, payment };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};


const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id)

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      }
    )
  }

  // console.log(verifiedPayment);

  return verifiedPayment
}

const getAllOrders = async () => {
  const data = await Order.find();
  return data;
};


const myOrder = async (email: string) => {
  const result = await Order.find({ email })
  return result
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id)
  return result
};
export const orderService = {
  createOrder,
  getAllOrders,
  verifyPayment,
  myOrder,
  deleteOrder,
}
