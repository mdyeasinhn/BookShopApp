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

  const onSubmit = async (data: any) => {
    if (user?.role === 'admin') {
      toast.error("Admins are not allowed to purchase books.");
      return;
    }

    const orderData = {
      email: user?.email,
      book: bookInfo._id,
      quantity: data.quantity,
      totalPrice: (bookInfo.price * data.quantity).toFixed(2),
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <DialogTitle className="text-xl font-semibold text-white flex items-center">
                      <span className="mr-2">🛒</span>
                      Complete Your Purchase
                    </DialogTitle>
                    <button
                      onClick={closeModal}
                      className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/20"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {/* Book Preview */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={bookInfo.image}
                          alt={bookInfo.title}
                          className="w-16 h-20 object-cover rounded-lg shadow-md"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 w-3 h-3 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{bookInfo.title}</h3>
                        {bookInfo.author && (
                          <p className="text-xs text-gray-600 mt-1">by {bookInfo.author}</p>
                        )}
                        <div className="flex items-center mt-2">
                          <span className="text-lg font-bold text-blue-600">${bookInfo.price.toFixed(2)}</span>
                          <span className="text-xs text-gray-500 ml-2">per item</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Quantity and Contact Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="10"
                            {...register('quantity', { 
                              valueAsNumber: true, 
                              min: { value: 1, message: 'Minimum quantity is 1' },
                              max: { value: 10, message: 'Maximum quantity is 10' }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          <div className="absolute right-2 top-2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z" />
                            </svg>
                          </div>
                        </div>
                        {errors.quantity && (
                          <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="+880 1234 567890"
                            {...register('contact', { 
                              required: 'Phone number is required',
                             
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          />
                          <div className="absolute right-2 top-2 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                          </div>
                        </div>
                        {errors.contact && (
                          <p className="text-red-500 text-xs mt-1">{errors.contact.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <textarea
                          rows={3}
                          placeholder="Enter your complete delivery address..."
                          {...register('address', { 
                            required: 'Delivery address is required',
                            minLength: { value: 10, message: 'Address must be at least 10 characters' }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                        <div className="absolute right-2 top-2 text-gray-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      {errors.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                      )}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                        <span className="mr-2">📋</span>
                        Order Summary
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Item Price:</span>
                          <span className="font-medium">${bookInfo.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">×{quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">${(bookInfo.price * quantity).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Delivery:</span>
                          <span className="font-medium">FREE</span>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex justify-between text-lg font-bold text-gray-900">
                          <span>Total:</span>
                          <span className="text-blue-600">${(bookInfo.price * quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        
                      >
                        {loading ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <span className="mr-2">🔒</span>
                            Secure Checkout
                          </div>
                        )}
                      </Button>
                    </div>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center text-xs text-gray-500 mt-3">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Your payment information is secure and encrypted
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