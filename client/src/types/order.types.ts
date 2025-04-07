export interface IOrder {
    _id : string,
    email: string;
    book: string; 
    quantity: number;
    totalPrice: number;
    status: "Pending" | "Paid" | "Completed" | "Cancelled";
    address?: string;
    contact?: number | string;
    transaction: {
      id: string;
      transactionStatus: string;
      bank_status: string;
      sp_code: string;
      sp_message: string;
      method: string;
      date_time: string; 
    };
    createdAt?: string | Date;
    updatedAt?: string | Date;
  }
  