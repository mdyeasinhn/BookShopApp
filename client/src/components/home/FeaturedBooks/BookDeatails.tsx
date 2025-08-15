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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
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
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="hover:text-orange-600 cursor-pointer transition-colors">Home</span>
                        <span>/</span>
                        <span className="hover:text-orange-600 cursor-pointer transition-colors">Books</span>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{book.title}</span>
                    </div>
                </nav>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="lg:flex">
                        {/* Book Image Section */}
                        <div className="lg:w-2/5 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                            <div className="relative">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-96 object-cover rounded-2xl shadow-xl"
                                />
                                {/* Stock badge */}
                                <div className="absolute top-4 right-4">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                                        {availableStock} in stock
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Book Details Section */}
                        <div className="lg:w-3/5 p-8 lg:p-12">
                            <div className="space-y-6">
                                {/* Title and Author */}
                                <div>
                                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                                        {book.title}
                                    </h1>
                                    <p className="text-xl text-orange-600 font-semibold">
                                        by {book.author}
                                    </p>
                                </div>

                                {/* Price */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-5xl font-bold text-orange-600">${book.price}</span>
                                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Best Price
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">About this book</h3>
                                    <p className="text-gray-700 leading-relaxed text-lg">{book.description}</p>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-6">
                                    <span className="text-lg font-semibold text-gray-700">Quantity:</span>
                                    <div className="flex items-center bg-gray-100 rounded-xl">
                                        <button 
                                            onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                            className="w-12 h-12 flex items-center justify-center text-2xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-l-xl transition-all"
                                        >
                                            -
                                        </button>
                                        <span className="w-16 h-12 flex items-center justify-center text-xl font-semibold bg-white border-x border-gray-200">
                                            {selectedQuantity}
                                        </span>
                                        <button 
                                            onClick={() => setSelectedQuantity(Math.min(availableStock, selectedQuantity + 1))}
                                            className="w-12 h-12 flex items-center justify-center text-2xl text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-r-xl transition-all"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="pt-4">
                                    <Button 
                                        onClick={() => setIsOpen(true)}
                                        className="w-full lg:w-auto bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                                    >
                                        Buy Now - ${(book.price * selectedQuantity).toFixed(2)}
                                    </Button>
                                </div>

                                {/* Features */}
                                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
                                    <div className="text-center p-4 bg-green-50 rounded-xl">
                                        <div className="text-3xl mb-2">🚚</div>
                                        <div className="text-sm font-medium text-green-700">Free Shipping</div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                                        <div className="text-3xl mb-2">🔄</div>
                                        <div className="text-sm font-medium text-blue-700">30-Day Returns</div>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                                        <div className="text-3xl mb-2">🔒</div>
                                        <div className="text-sm font-medium text-purple-700">Secure Payment</div>
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
                    bookInfo={{...book, selectedQuantity}} 
                />
            )}
        </div>
    );
};

export default BookDetails;