import { IBook } from "./book.interface";
import Book from "./book.model";



const createBook = async (payload: IBook): Promise<IBook> => {
    const result = await Book.create(payload);
    return result;
}
const getBooks = async () => {
    const result = await Book.find();
    return result;
}

const getSpecificProduct = async (id: string) => {
    const result = await Book.findById(id);
    return result;
}

const updateBook = async (id: string, data: IBook) => {
    const result = await Book.findByIdAndUpdate(id, data, { new: true });
    return result;
}

const deleteBook = async (id: string) => {
    const result = await Book.findByIdAndDelete(id);
    return result;
}

export const bookService = {
    createBook,
    getBooks,
    getSpecificProduct,
    updateBook,
    deleteBook,
}