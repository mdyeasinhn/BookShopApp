import { Types } from 'mongoose'

export interface IOrder {
  email: string,
  book: Types.ObjectId,
  quantity: number,
  totalPrice: number,
}