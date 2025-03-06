import { categories } from "../Bookcategory/Categories"

const UpdateBookForm = () => {
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form>
                <div className='grid grid-cols-1 gap-10'>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='location' className='block text-gray-600'>
                            Title
                        </label>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='title'
                            id='title'
                            type='text'
                            placeholder='Title'
                            required
                        />
                    </div>
                    <div className='space-y-1 text-sm'>
                        <label htmlFor='author' className='block text-gray-600'>
                            Author
                        </label>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='author'
                            id='author'
                            type='text'
                            placeholder='Author'
                            required
                        />
                    </div>

                    <div className='space-y-1 text-sm'>
            <label htmlFor='category' className='block text-gray-600'>
              Category
            </label>
            <select
              required
              className='w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md'
              name='category'
            >
              {categories.map(category => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>


                    <div className='space-y-1 text-sm'>
                        <label htmlFor='title' className='block text-gray-600'>
                            Title
                        </label>
                        <input
                            className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                            name='title'
                            id='title'
                            type='text'
                            placeholder='Title'
                            required
                        />
                    </div>
                    <div className='flex justify-between gap-2'>
                        <div className='space-y-1 text-sm'>
                            <label htmlFor='price' className='block text-gray-600'>
                                Price
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='price'
                                id='price'
                                type='number'
                                placeholder='Price'
                                required
                            />
                        </div>

                        <div className='space-y-1 text-sm'>
                            <label htmlFor='guest' className='block text-gray-600'>
                                Quantity
                            </label>
                            <input
                                className='w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md '
                                name='quantity'
                                id='quantity'
                                type='number'
                                placeholder='Quantity'
                                required
                            />
                        </div>
                    </div>

                   

                    <div className='space-y-1 text-sm'>
                        <label htmlFor='description' className='block text-gray-600'>
                            Description
                        </label>

                        <textarea
                            id='description'
                            className='block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800  border border-rose-300 focus:outline-rose-500 '
                            name='description'
                        ></textarea>
                    </div>
                </div>

                <button
                    type='submit'
                    className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500'
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UpdateBookForm