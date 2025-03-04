/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";

const CreateBook = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
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
                            <input
                                {...register("category", { required: true })}
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                type='text'
                                placeholder='Category'
                            />
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
