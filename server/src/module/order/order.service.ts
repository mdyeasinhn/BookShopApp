import Book from "../Book/book.model";
import { IOrder } from "./order.interface";
import Order from "./order.model";


const createOrder = async (payload: IOrder): Promise<IOrder> => {
    const { product, quantity } = payload;

    const bookData = await Book.findById(product);

    if (!bookData) {
        throw new Error("Book not found")
    }

    if (bookData.quantity < quantity) {
        throw new Error('Insufficient stock')
    }

    bookData.quantity -= quantity
    bookData.inStock = bookData.quantity > 0
    await bookData.save()


    const order = await Order.create(payload)
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
