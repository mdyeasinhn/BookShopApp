const CreateBook = () => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form className="w-3/4">
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                    {/* Left Column */}
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='title' className='block text-gray-600'>
                                Title
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                name='title'
                                id='title'
                                type='text'
                                placeholder='Title'
                                required
                            />
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='category' className='block text-gray-600'>
                                Category
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                name='category'
                                id='category'
                                type='text'
                                placeholder='Category'
                                required
                            />
                        </div>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>
                                Price
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Price'
                                required
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='space-y-6'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='author' className='block text-gray-600'>
                                Author
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                name='author'
                                id='author'
                                type='text'
                                placeholder='Author'
                                required
                            />
                        </div>

                        <div className='p-4 bg-white w-full m-auto rounded-lg'>
                            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                                <div className='flex flex-col w-max mx-auto text-center'>
                                    <label>
                                        <input
                                            className='text-sm cursor-pointer w-36 hidden'
                                            type='file'
                                            name='image'
                                            id='image'
                                            accept='image/*'
                                            hidden
                                        />
                                        <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                            Upload Image
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='quantity' className='block text-gray-600'>
                                Quantity
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md'
                                name='quantity'
                                id='quantity'
                                type='number'
                                placeholder='Quantity'
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='space-y-1 text-sm mt-4'>
                    <label htmlFor='description' className='block text-gray-600'>
                        Description
                    </label>
                    <textarea
                        id='description'
                        className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500'
                        name='description'
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
