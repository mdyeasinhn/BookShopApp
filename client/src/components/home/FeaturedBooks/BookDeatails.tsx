import CheckoutModal from "@/components/shared/modal/CheckoutModal";
import CustomButton from "@/components/ui/CustomButton";
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

    const soldPercentage = book ? (0 / book.quantity) * 100 : 0;
    const availableStock = book ? book.quantity - 0 : 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span className="hover:text-blue-600 cursor-pointer">Home</span>
                        <span>/</span>
                        <span className="hover:text-blue-600 cursor-pointer">Books</span>
                        <span>/</span>
                        <span className="text-gray-900 font-medium">{book.title}</span>
                    </div>
                </nav>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="lg:flex">
                        {/* Book Image Section */}
                        <div className="lg:w-2/5 p-8 bg-gradient-to-br from-gray-50 to-gray-100">
                            <div className="relative group">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-auto rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 shadow-sm">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                                        IN STOCK
                                    </span>
                                </div>
                                {availableStock < 5 && availableStock > 0 && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 shadow-sm">
                                            Only {availableStock} left!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Book Details Section */}
                        <div className="lg:w-3/5 p-8">
                            <div className="space-y-6">
                                {/* Title and Author */}
                                <div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                                        {book.title}
                                    </h1>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-600">by</span>
                                        <span className="text-lg font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                                            {book.author}
                                        </span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-4xl font-bold text-red-600">${book.price}</span>
                                    <span className="text-lg text-gray-500 line-through">${(book.price * 1.2).toFixed(2)}</span>
                                    <span className="px-2 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                                        17% OFF
                                    </span>
                                </div>

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                                </div>

                                {/* Stock Information */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">
                                            Availability: <span className="text-green-600">{availableStock} in stock</span>
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {soldPercentage.toFixed(0)}% sold
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${soldPercentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Quantity Selector */}
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button 
                                            onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="px-4 py-2 border-x border-gray-300 min-w-[50px] text-center">
                                            {selectedQuantity}
                                        </span>
                                        <button 
                                            onClick={() => setSelectedQuantity(Math.min(availableStock, selectedQuantity + 1))}
                                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <CustomButton 
                                        onClick={() => setIsOpen(true)}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Buy Now - ${(book.price * selectedQuantity).toFixed(2)}
                                    </CustomButton>
                                   
                                </div>

                                {/* Additional Info */}
                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">✓</div>
                                        <div className="text-sm text-gray-600 mt-1">Free Shipping</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">↩</div>
                                        <div className="text-sm text-gray-600 mt-1">30-Day Returns</div>
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