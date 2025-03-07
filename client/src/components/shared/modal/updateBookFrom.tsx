import { categories } from "../Bookcategory/Categories";
import { useForm } from "react-hook-form";
import { IBook } from "@/types/book.types";
import { useEffect } from "react";

interface UpdateBookFormProps {
    book: IBook;
    handleUpdate: (id: string, updatedData: Partial<IBook>) => Promise<void>;
}

const UpdateBookForm: React.FC<UpdateBookFormProps> = ({ book, handleUpdate }) => {
    const { register, handleSubmit, reset } = useForm<IBook>();  // ❌ Removed defaultValues

    useEffect(() => {
        if (book) {
            reset(book);  // ✅ Ensures form updates when book changes
        }
    }, [book, reset]);

    const onSubmit = (data: Partial<IBook>) => {
        handleUpdate(book._id, data);  
        console.log("Updated Data:", book._id, data);
    };

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
                <div className='grid grid-cols-1 gap-5'>
                    
                    {/* Title */}
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='title' className='block text-gray-600'>Title</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md'
                            id='title'
                            type='text'
                            placeholder='Book Title'
                        />
                    </div>

                    {/* Author */}
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='author' className='block text-gray-600'>Author</label>
                        <input
                            {...register("author", { required: "Author is required" })}
                            className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md'
                            id='author'
                            type='text'
                            placeholder='Author Name'
                        />
                    </div>

                    {/* Category */}
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='category' className='block text-gray-600'>Category</label>
                        <select
                            {...register("category", { required: "Category is required" })}
                            className='w-full px-4 py-3 border border-gray-300 focus:outline-rose-500 rounded-md'
                            id='category'
                        >
                            {categories.map(category => (
                                <option value={category} key={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price & Quantity */}
                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>Price</label>
                            <input
                                {...register("price", { required: "Price is required", valueAsNumber: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md'
                                id='price'
                                type='number'
                                placeholder='Price'
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='quantity' className='block text-gray-600'>Quantity</label>
                            <input
                                {...register("quantity", { required: "Quantity is required", valueAsNumber: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-gray-300 focus:outline-rose-500 rounded-md'
                                id='quantity'
                                type='number'
                                placeholder='Quantity'
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='description' className='block text-gray-600'>Description</label>
                        <textarea
                            {...register("description")}
                            id='description'
                            className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-gray-300 focus:outline-rose-500'
                            placeholder='Book Description'
                        ></textarea>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500 hover:bg-rose-600'
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateBookForm;
