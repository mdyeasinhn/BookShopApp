import Book from "../Book/book.model";
import { IUser } from "../User/user.interface";
import User from "../User/user.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";


const createOrder = async (payload: IOrder, user: IUser): Promise<IOrder> => {
    const { book, quantity } = payload;

    const bookData = await Book.findById(book);

    if (!bookData) {
        throw new Error("Book not found")
    }

    if (bookData.quantity < quantity) {
        throw new Error('Insufficient stock')
    }

    const totalPrice = Number(quantity * bookData.price)
    const currentUser = await User.findOne({ email: user.email })

    const buyer = currentUser?._id?.toString();
    bookData.quantity -= quantity
    bookData.inStock = bookData.quantity > 0
    await bookData.save()


     // Create the order inside the transaction
     const [order] = await Order.create([{ ...payload, totalPrice, buyer }])

    // payment integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: user.name,
      customer_address: user.address,
      customer_email: user.email,
      customer_phone: user.phone,
      customer_city: user.city,
      client_ip,
    };
    return order             
}

const revenueCalculate = async (): Promise<{ totalRevenue: number }> => {
    const result = await Order.aggregate([
      {
        $lookup: {
          from: 'books', 
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: { $multiply: ['$quantity', '$productDetails.price'] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
        },
      },
    ])
  
    return result[0] || { totalRevenue: 0 } 
  }
  

export const orderService = {
    createOrder,
    revenueCalculate,
}
