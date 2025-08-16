import { Link } from "react-router-dom";

import { IBook } from "@/types/book.types";

interface BookCardProps {
  book: IBook;
}

export function BookCard({ book }: BookCardProps) {
  // Fallback image if book image is missing or broken
  const fallbackImage = "https://i.ibb.co/68B1S8P/image-not-found.jpg";

  return (
    <Link to={`/books/${book._id?.toString()}`}>
      <div className="w-64 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:scale-110 transition-transform duration-300">
        {/* Book Cover Area */}
        <div className="h-48 w-full">
          <img
            src={book.image || fallbackImage}
            alt={book.title}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Book Details */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {book.title}
          </h3>
          <p className="text-blue-600 text-sm mb-1">
            {book.author}
          </p>
          <p className="text-gray-500 text-sm">
            {book.category} • {book.price}
          </p>
        </div>
      </div>
    </Link>
  );
}