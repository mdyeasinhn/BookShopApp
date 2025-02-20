import { Request, Response } from "express";
import { bookService } from "./book.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";


// ----> Create Book controller <----
const createBook = async (req: Request, res: Response) => {

    const payload = req.body;
    const result = await bookService.createBook(payload);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: 'Book created successfully',
        data: result,
    })
};

// ----> Get All Books controller <----
const getBooks = async (req: Request, res: Response) => {

    const result = await bookService.getBooks();

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: 'Books fetched successfully',
        data: result,
    });
};

// ----> Get single Book controller <----
const getSpecificBook = async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const result = await bookService.getSpecificProduct(bookId);

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Book retrieved successfully",
        data: result,
    });
};


// ----> Update Book controller <----
const updateBook = async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const body = req.body;


    const result = await bookService.updateBook(bookId, body);
    // Check if result is null or undefined
    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Book not found or update failed',
            data: null,
        })
    }

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Book updated successfully",
        data: result,
    })
};
// ----> Delete Book controller <----

const deleteBook = async (req: Request, res: Response) => {

    const bookId = req.params.bookId;
    const result = await bookService.deleteBook(bookId);
    if (!result) {
        return sendResponse(res, {
            success: false,
            statusCode: StatusCodes.NOT_FOUND,
            message: 'Book not found or delete failed',
            data: null,
        })
    }

    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Book deleted successfully",
        data: result,
    })
};


// ----> export <----
export const bookController = {
    createBook,
    getBooks,
    getSpecificBook,
    updateBook,
    deleteBook,
}