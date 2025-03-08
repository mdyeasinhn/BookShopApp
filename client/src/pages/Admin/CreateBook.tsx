/* eslint-disable @typescript-eslint/no-explicit-any */
import { categories } from "@/components/shared/Bookcategory/Categories";
import { useCreateBookMutation } from "@/redux/features/books/bookManagementApi";
import { IBook } from "@/types/book.types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateBook = () => {
    const { register, handleSubmit } = useForm<IBook>();
    const [createBook] = useCreateBookMutation();
    const onSubmit = async (data: any) => {
        const bookData = {
            ...data,
            price: Number(data.price),
            quantity: Number(data.quantity),
            inStock: true,
        };
        console.log(bookData)

        try {
            const res = await createBook(bookData).unwrap();
            console.log(res)
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>Title</label>
                            <input
                                {...register("title", { required: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='text'
                                placeholder='Title'
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>Category</label>
                            <select
                                {...register("category", { required: true })}  // ✅ Fix: Register the category field
                                className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
                            >
                                {categories.map((category) => (
                                    <option value={category} key={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>Price</label>
                            <input
                                {...register("price", { required: true, valueAsNumber: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='number'
                                placeholder='Price'
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='author' className='block text-gray-600'>Author</label>
                            <input
                                {...register("author", { required: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='text'
                                placeholder='Author'
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='image' className='block text-gray-600'>Image</label>
                            <input
                                {...register("image", { required: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='text'
                                placeholder='Image URL'
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='quantity' className='block text-gray-600'>Quantity</label>
                            <input
                                {...register("quantity", { required: true, valueAsNumber: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='number'
                                placeholder='Quantity'
                            />
                        </div>
                    </div>
                </div>

                <div className='space-y-1 text-sm mt-4'>
                    <label htmlFor='description' className='block text-gray-600'>Description</label>
                    <textarea
                        {...register("description")}
                        className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                        placeholder="Write a short description..."
                    ></textarea>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    Save & Continue
                </button>
            </form>
        </div>
    );
};

export default CreateBook;
