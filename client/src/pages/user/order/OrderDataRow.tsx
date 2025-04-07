import { IOrder } from "@/types/order"; // Adjust the path as needed

interface OrderDataRowProps {
    order: IOrder;
}

const OrderDataRow = ({ order }: OrderDataRowProps) => {
    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{order.transaction.id}</p>
            </td>


            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{order.quantity}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">${order.totalPrice}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{order.status}</p>

            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Delete</span>
                </button>
            </td>
        </tr >
    );
};

export default OrderDataRow;
