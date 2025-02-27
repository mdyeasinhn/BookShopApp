import { Link } from 'react-router-dom';

type Book = {
  _id: string;
  image: string;
  location: string;
  author: string;
  category: string;
  availability: boolean;
  priceRange: string;
};

type CardProps = {
  book?: Book; // Make book optional to prevent errors on missing data
};

const BookCard: React.FC<CardProps> = ({ book }) => {
  // Debugging: Check if book exists
  console.log('Book data:', book);

  // Handle loading state
  if (!book) {
    return <p className="text-center text-gray-500">Loading book details...</p>;
  }

  return (
    <Link to={`/book/${book._id?.toString()}`} className="col-span-1 cursor-pointer group shadow-xl rounded-lg p-5">
      <div className="flex flex-col gap-2 w-full">
        {/* Image Container */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={book.image}
            alt="Book Cover"
          />
        </div>

        {/* Book Details */}
        <div className="font-semibold text-lg">{book.location}</div>
        <div className="font-light text-neutral-500">{book.author}</div>
        <div className="font-light text-neutral-500">{book.category}</div>
        <div className="font-light text-neutral-500">{book.priceRange}</div>
        <div className="font-light text-neutral-500">
          {book.availability ? 'Available' : 'Unavailable'}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
