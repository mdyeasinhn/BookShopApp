import CheckoutModal from "@/components/shared/modal/CheckoutModal";
import { Button } from "@/components/ui/button";
import { useGetSingleBooksQuery } from "@/redux/features/books/bookManagementApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface Book {
    image: string;
    title: string;
    author: string;
    price: number;
    description: string;
    quantity: number;
}

const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const { data, isLoading } = useGetSingleBooksQuery(id);
    const book: Book | undefined = data?.data;

    const closeModal = () => {
        setIsOpen(false);
    };

    const availableStock = book ? book.quantity - 0 : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Book Not Found</h2>
                    <p className="text-gray-600">The book you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600">
                        <li>
                            <a href="#" className="hover:text-rose-500 transition-colors">Home</a>
                        </li>
                        <li>/</li>
                        <li>
                            <a href="#" className="hover:text-rose-500 transition-colors">Books</a>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 font-medium truncate max-w-xs">{book.title}</li>
                    </ol>
                </nav>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        {/* Book Image */}
                        <div className="md:w-1/3 p-6 bg-gray-100 flex items-center justify-center">
                            <div className="relative h-96 w-full">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="h-full w-full object-contain rounded-xl shadow-sm"
                                />
                                {availableStock > 0 && (
                                    <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                        {availableStock} in stock
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Book Details */}
                        <div className="md:w-2/3 p-6 md:p-8">
                            <div className="space-y-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
                                    <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <span className="text-4xl font-bold text-rose-600">${book.price}</span>
                                    {availableStock > 0 && (
                                        <span className="text-sm text-green-600">Available</span>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center border border-gray-300 rounded-xl">
                                                    <button
                                                        onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-lg"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-12 h-10 flex items-center justify-center border-x border-gray-300 bg-white">
                                                        {selectedQuantity}
                                                    </span>
                                                    <button
                                                        onClick={() => setSelectedQuantity(Math.min(availableStock, selectedQuantity + 1))}
                                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-lg"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {availableStock} available
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="text-2xl font-bold text-rose-600">
                                                ${(book.price * selectedQuantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <Button
                                        onClick={() => setIsOpen(true)}
                                        className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:shadow-rose-500/50 transition-all"
                                        disabled={availableStock <= 0}
                                    >
                                        {availableStock > 0 ? `Buy Now` : 'Out of Stock'}
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl mb-2">🚚</span>
                                        <span className="text-xs font-medium text-gray-700 text-center">Free Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl mb-2">🔄</span>
                                        <span className="text-xs font-medium text-gray-700 text-center">Easy Returns</span>
                                    </div>
                                    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-xl">
                                        <span className="text-2xl mb-2">🔒</span>
                                        <span className="text-xs font-medium text-gray-700 text-center">Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {book && (
                <CheckoutModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    bookInfo={{ ...book, selectedQuantity }}
                />
            )}
        </div>
    );
};

export default BookDetails;