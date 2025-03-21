import CheckoutModal from "@/components/shared/modal/CheckoutModal";
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
    const { data } = useGetSingleBooksQuery(id);
    const book: Book | undefined = data?.data;
    console.log(data);

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex gap-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-16">
            {/* Book Cover */}
            <div className="w-1/3 relative">
                <img
                    src={book?.image}
                    alt="Book Cover"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
                <span className="absolute top-2 left-2 bg-green-200 text-green-800 px-2 py-1 text-xs font-semibold rounded">IN STOCK</span>
            </div>

            {/* Book Info */}
            <div className="w-2/3 flex flex-col">
                <h2 className="text-2xl font-bold">{book?.title}</h2>
                <p className="text-gray-500">Author: <span className="font-semibold">{book?.author}</span></p>
                <p className="text-red-500 text-xl font-semibold mt-2">${book?.price}</p>
                <p className="text-gray-600 mt-2">{book?.description}</p>

                <div className="mt-4">
                    <span className="text-gray-600">Already sold: <strong>0/{book?.quantity}</strong></span>
                    <div className="w-full bg-gray-200 h-2 mt-1 rounded-full">
                        <div className="bg-red-500 h-2 w-4/4 rounded-full"></div>
                    </div>
                </div>

                <div className="mt-4 flex gap-4">
                    <button onClick={() => setIsOpen(true)} className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600">Buy now</button>
                </div>
                
                {book && (
                    <CheckoutModal isOpen={isOpen} closeModal={closeModal} bookInfo={book} />
                )}
            </div>
        </div>
    );
};

export default BookDetails;
