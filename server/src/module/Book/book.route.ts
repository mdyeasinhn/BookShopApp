// ---> Router <----

import { Router } from "express";
import { bookController } from "./book.controller";





const bookRoutes = Router();


bookRoutes.post('/', bookController.createBook);
bookRoutes.get('/',  bookController.getBooks);
bookRoutes.get('/:bookId', bookController.getSpecificBook);
bookRoutes.put('/:bookId', bookController.updateBook);
bookRoutes.delete('/:bookId', bookController.deleteBook);


export default bookRoutes;

