
import OrderDataRow from "../order/OrderDataRow";
import { IOrder } from "@/types/order.types";
import { useGetUserByEmailQuery } from "@/redux/features/users/usersMangementApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMyOrderQuery } from "@/redux/features/order/order";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const Order = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data: userData, isLoading: userLoading } = useGetUserByEmailQuery(user?.email);
    const email = userData?.data?.email;

    const { data: ordersData, isLoading: ordersLoading } = useGetMyOrderQuery(email);
    const orders: IOrder[] = ordersData?.data || [];

    console.log(orders);
   // Loading spinner
   if (ordersLoading) return <LoadingSpinner />
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
                                    <OrderDataRow order={order} key={order._id} />
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
