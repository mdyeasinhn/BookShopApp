import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment, useState } from 'react';

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
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </TransitionChild>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <DialogTitle
                  as='h3'
                  className='text-lg font-medium text-center leading-6 text-gray-900'
                >
                  Checkout
                </DialogTitle>
                <div className='bg-gray-100 rounded-xl h-40 w-full p-4 flex items-center justify-center'>
                  <img
                    src={bookInfo.image}
                    alt={bookInfo.title}
                    className='w-32 h-32 object-contain'
                  />
                </div>
                <div className='mt-4'>
                  <h2 className='text-xl font-semibold'>{bookInfo.title}</h2>
                  <p className='text-gray-600 font-bold mt-2'>Price: ${bookInfo.price.toFixed(2)}</p>
                </div>

                <hr className='mt-4' />

                {/* Quantity Selector */}
                <div className='mt-4'>
                  <label className='block text-gray-700 font-semibold mb-2'>Quantity:</label>
                  <input
                    type='number'
                    min='1'
                    value={quantity}
                    onChange={handleQuantityChange}
                    className='w-full p-2 border rounded-lg text-center'
                  />
                </div>

                {/* Total Price */}
                <div className='mt-4 text-lg font-semibold'>
                  Total Price: ${ (bookInfo.price * quantity).toFixed(2) }
                </div>

                {/* Checkout Button */}
                <button
                  className='w-full bg-blue-600 text-white py-2 px-4 mt-4 rounded-lg hover:bg-blue-700 transition'
                >
                  Confirm Purchase
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CheckoutModal;
