import { useDeleteBookMutation, useGetAllBooksQuery, useUpdateBookMutation } from "@/redux/features/books/bookManagementApi";
import BookDataRow from "./BookRow";
import { IBook } from "@/types/book.types";
import { toast } from "sonner";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const AllBooks = () => {
    const { data , isLoading, refetch} = useGetAllBooksQuery({});
    const books = data?.data || [];


    const [deleteBook] = useDeleteBookMutation();
    const [updateBook] = useUpdateBookMutation();
    const handleUpdate = async (id: string, updatedData: Partial<IBook>) => {
        try {
            console.log(updatedData)
            const res = await updateBook({ id, data: updatedData }).unwrap();

            toast.success(res?.message );
            refetch()
            console.log(res)
        } catch (error) {
            console.error("Failed to update book:", error);
            toast.error("Failed to update book. Please try again.");
        }
    };
    
    // Delete
    const handleDelete = async (id?: string) => {
        try {
            const res = await deleteBook(id).unwrap();
            toast.success(res?.message);
            refetch()
        } catch (error) {
            console.error("Failed to delete book:", error);
            toast.error("Failed to delete book. Please try again.");
        }
    };
   // Loading spinner
   if (isLoading) return <LoadingSpinner />
    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {["Image", "Title", "Author", "Category", "Price", "Quantity", "In stock", "Delete", "Update"].map((header) => (
                                        <th key={header} className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((book: IBook) =>
                                    book._id ? (
                                        <BookDataRow book={book} key={book._id} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                                    ) : null
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllBooks;
