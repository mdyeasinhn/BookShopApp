import { model, Schema } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The book title is required. Please provide a title.']
  },
  author: {
    type: String,
    required: [true, 'The author name is required. Please provide the author of the book.'],
  },
  price: {
    type: Number,
    required: [true, 'The book price is required. Don’t forget to add it.'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category for the book.'],
    enum: {
      values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      message: 'Invalid category. Must be one of Fiction, Science, SelfDevelopment, Poetry, or Religious.',
    },
  },
  description: {
    type: String,
    required: [true, "Please provide a description"]
  },
  quantity: {
    type: Number,
    required: [true, 'The book quantity is required. Please provide the quantity available.'],
    min: [0, 'Quantity must be zero or a positive number.'],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
},{
  timestamps: true,
}
)

const Book = model('Book',  bookSchema)

export default Book;