import OrderDataRow from "../order/OrderDataRow";
import { IOrder } from "@/types/order.types";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDeleteOrderMutation, useGetMyOrderQuery } from "@/redux/features/order/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";

const Order = () => {
       const [deleteOrder] = useDeleteOrderMutation();
    const user = useAppSelector(selectCurrentUser);
    const { data: userData,   } = useGetUserByEmailQuery(user?.email);
    const email = userData?.data?.email;

    const { data: ordersData, isLoading: ordersLoading ,refetch} = useGetMyOrderQuery(email);
    const orders: IOrder[] = ordersData?.data || [];


      // Delete
        const handleDelete = async (id?: string) => {
            try {
                const res = await deleteOrder(id).unwrap();
                toast.success(res?.message);
                refetch()
            } catch (error) {
                console.error("Failed to delete order:", error);
                toast.error("Failed to delete order. Please try again.");
            }
        };

    console.log(orders);
   // Loading spinner
   if (ordersLoading) return <LoadingSpinner smallHeight={false}/>
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Transaction Id
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Quantity
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Price
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Status
                                    </th>
                                    <th className='px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: IOrder) => (
                                    <OrderDataRow order={order} key={order._id} handleDelete={handleDelete}/>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;
