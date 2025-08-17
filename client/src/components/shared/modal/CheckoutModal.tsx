/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
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
  author?: string;
  _id?: string;
  selectedQuantity?: number;
}

interface CheckoutModalProps {
  closeModal: () => void;
  isOpen: boolean;
  bookInfo: BookInfo;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ closeModal, isOpen, bookInfo }) => {
  const user = useAppSelector(selectCurrentUser);
  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: bookInfo.selectedQuantity || 1,
      address: '',
      contact: '',
    },
  });

  const quantity = watch('quantity');
  const totalPrice = (bookInfo.price * quantity).toFixed(2);

  const onSubmit = async (data: any) => {
    if (user?.role === 'admin') {
      toast.error("Admins are not allowed to purchase books.");
      return;
    }

    const orderData = {
      email: user?.email,
      book: bookInfo._id,
      quantity: data.quantity,
      totalPrice,
      address: data.address,
      contact: data.contact,
    };

    const toastId = toast.loading("Processing your order...");
    setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-lg font-semibold text-white">
                      Complete Your Order
                    </DialogTitle>
                    <button
                      onClick={closeModal}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Book Preview */}
                  <div className="flex items-start gap-4 mb-6 p-4 bg-rose-50 rounded-xl">
                    <img
                      src={bookInfo.image}
                      alt={bookInfo.title}
                      className="w-16 h-20 object-cover rounded-lg shadow-sm"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{bookInfo.title}</h3>
                      {bookInfo.author && (
                        <p className="text-sm text-gray-600 mt-1">by {bookInfo.author}</p>
                      )}
                      <div className="mt-2 flex items-center">
                        <span className="text-gray-900 font-medium">${bookInfo.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500 ml-2">× {quantity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        {...register('quantity', { 
                          valueAsNumber: true, 
                          min: { value: 1, message: 'Minimum quantity is 1' },
                          max: { value: 10, message: 'Maximum quantity is 10' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                      {errors.quantity && (
                        <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                      )}
                    </div>

                    {/* Contact */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1234 567890"
                        {...register('contact', { 
                          required: 'Phone number is required',
                          pattern: {
                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                            message: 'Invalid phone number format'
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Enter your complete delivery address..."
                        {...register('address', { 
                          required: 'Delivery address is required',
                          minLength: { value: 10, message: 'Address must be at least 10 characters' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-rose-50 rounded-xl p-4 border border-rose-100">
                      <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">${totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="text-green-600">FREE</span>
                        </div>
                        <div className="border-t border-rose-200 my-2"></div>
                        <div className="flex justify-between font-medium text-gray-900">
                          <span>Total:</span>
                          <span className="text-rose-600">${totalPrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-medium py-2.5 rounded-xl shadow-sm"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          'Proceed to Payment'
                        )}
                      </Button>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center text-xs text-gray-500 mt-3">
                      <svg className="w-4 h-4 mr-1 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      Secure checkout
                    </div>
                  </form>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;