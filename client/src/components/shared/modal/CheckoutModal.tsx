/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from '@/components/ui/CustomButton';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useCreateOrderMutation } from '@/redux/features/order/order';
import { useAppSelector } from '@/redux/hooks';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface BookInfo {
  image: string;
  title: string;
  price: number;
}

interface CheckoutModalProps {
  closeModal: () => void;
  isOpen: boolean;
  bookInfo: BookInfo;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ closeModal, isOpen, bookInfo }) => {
  const user = useAppSelector(selectCurrentUser);
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false); // Loading state

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      address: '',
      contact: '',
    },
  });

  const quantity = watch('quantity');

  const onSubmit = async (data: any) => {
    if (user?.role === 'admin') {
      toast.error("Admins are not allowed to purchase books.");
      return;
    }

    const orderData = {
      email: user?.email,
      // @ts-ignore
      book: bookInfo._id,
      quantity: data.quantity,
      totalPrice: (bookInfo.price * data.quantity).toFixed(2),
      address: data.address,
      contact: data.contact,
    };

    const toastId = toast.loading("Processing your order...");
    setLoading(true); // Set loading to true

    try {
      const response = await createOrder(orderData).unwrap();

      if (response?.success) {
        toast.success(response?.message, { id: toastId });

        const checkoutUrl = response?.data?.payment?.checkout_url;

        if (checkoutUrl) {
          reset();
          window.location.href = checkoutUrl;
        } else {
          toast.error("Failed to generate checkout URL.", { id: toastId });
          console.error("Checkout URL is undefined!");
        }
      } else {
        toast.error(response?.message || "Order creation failed.", { id: toastId });
        console.error("Order Creation Failed:", response);
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.", { id: toastId });
      console.error("Order Creation Failed:", error);
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Checkout
                </DialogTitle>
                <div className="bg-gray-100 rounded-xl h-40 w-full p-4 flex items-center justify-center">
                  <img
                    src={bookInfo.image}
                    alt={bookInfo.title}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{bookInfo.title}</h2>
                  <p className="text-gray-600 font-bold mt-2">Price: ${bookInfo.price.toFixed(2)}</p>
                </div>

                <hr className="mt-4" />

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-2">
                    {/* Quantity Selector */}
                    <div className="mt-4">
                      <label className="block text-gray-700 font-semibold mb-2">Quantity:</label>
                      <input
                        type="number"
                        min="1"
                        {...register('quantity', { valueAsNumber: true, min: 1 })}
                        className="w-full p-2 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md"
                      />
                      {errors.quantity && <p className="text-red-500 text-sm">Quantity must be at least 1</p>}
                    </div>

                    {/* Contact Info */}
                    <div className="mt-4">
                      <label className="block text-gray-700 font-semibold mb-2">Contact Info:</label>
                      <input
                        type="number"
                        {...register('contact', { required: 'Contact info is required' })}
                        className="w-full p-2 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md"
                      />
                      {errors.contact && <p className="text-red-500 text-sm">{errors.contact.message}</p>}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mt-4">
                    <label className="block text-gray-700 font-semibold mb-2">Address:</label>
                    <input
                      type="text"
                      {...register('address', { required: 'Address is required' })}
                      className="w-full p-2 border rounded-lg"
                    />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                  </div>

                  {/* Total Price */}
                  <div className="mt-4 text-lg font-semibold mb-2">
                    Total Price: ${(bookInfo.price * quantity).toFixed(2)}
                  </div>

                  {/* Checkout Button */}
                  <CustomButton
                    type="submit"
                    className="w-full"
                  >
                    {loading ? (
                      <span className="animate-spin">⏳</span> // Spinner when loading
                    ) : (
                      'Confirm Purchase'
                    )}
                  </CustomButton>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;
