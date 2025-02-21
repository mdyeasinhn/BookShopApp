import { Schema, model } from "mongoose";


const orderSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            validate: {
                validator: function (value: string) {
                    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value)
                },
                message: '{VALUE} is not a valid email',
            },
            immutable: true,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be at least 1."],
        },
        totalPrice: {
            type: Number,
            required: true,
            min: [0, "Total price must be non-negative."],
        },
    },
    {
        timestamps: true, 
    }
);

const Order = model('order', orderSchema);

export default Order;

