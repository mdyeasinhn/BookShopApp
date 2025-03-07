import DeleteModal from "@/components/shared/modal/DeleteModal";
import UpdateBookModal from "@/components/shared/modal/UpdateBookModal";
import { useState } from "react";
import { IBook } from "@/types/book.types";

interface BookDataRowProps {
    book: IBook;
    handleDelete: (id: string) => void;
    handleUpdate: (id: string) => void;
}

const BookDataRow: React.FC<BookDataRowProps> = ({ book, handleDelete, handleUpdate }) => {
    // Update Modal
    const [isEditOpen, setIsEditModalOpen] = useState<boolean>(false);
    // Delete Modal
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

    // Close modals
    const closeDeleteModal = () => setIsDeleteOpen(false);
    // const closeEditModal = () => setIsEditModalOpen(false);

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="block relative">
                            <img
                                alt="Book Cover"
                                src={book.image}
                                className="mx-auto object-cover rounded h-10 w-15"
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{book.title}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{book.author}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{book.category}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">${book.price}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{book.quantity}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {book.inStock ? "Yes" : "No"}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => setIsDeleteOpen(true)}
                    className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Delete</span>
                </button>
                {/* Delete Modal */}
                <DeleteModal
                    isOpen={isDeleteOpen}
                    closeModal={closeDeleteModal}
                    handleDelete={handleDelete}
                    id={book._id}
                />
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                >
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative">Update</span>
                </button>
                {/* Update Modal */}
                <UpdateBookModal
                    book={book}
                    isOpen={isEditOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    handleUpdate={handleUpdate}
                />
            </td>
        </tr>
    );
};

export default BookDataRow;
