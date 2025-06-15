import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi"; // Example icon

// Define the Book type (as you provided)
type Book = {
  _id: string;
  image?: string;
  title: string;
  price: number;
  location: string;
  author: string;
  category: string;
  availability: boolean;
  priceRange: string;
  rating?: number;
};

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  // A fallback image in case book.image is missing or broken
  const fallbackImage = 'https://i.ibb.co/68B1S8P/image-not-found.jpg';

  return (
    // The <Link> component now wraps the entire card, making it all clickable.
    <Link to={`/books/${book._id}`} className="group block overflow-hidden">
      <div className="flex flex-col h-full bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
        {/* Image Container: Uses aspect ratio for responsive, consistent sizing */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={book.image || fallbackImage}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>

        {/* Content Area: Flex-grow allows this area to expand, pushing the footer down */}
        <div className="flex flex-col flex-grow p-5">
          <div className="flex-grow">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600">
              {book.category}
            </span>
            <h3 className="mt-2 text-xl font-bold text-slate-800 truncate" title={book.title}>
              {book.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              by {book.author}
            </p>
          </div>

          {/* Footer: Pushed to the bottom by flex-grow on the content area above */}
          <div className="mt-6 flex justify-between items-center">
            <p className="text-2xl font-extrabold text-slate-900">
              ${book.price}
            </p>
            
            {/* A "View" button that is purely visual, as the whole card is a link */}
            <div className="inline-flex items-center gap-1 font-semibold text-purple-700 transition-all duration-300 group-hover:text-purple-500 group-hover:gap-2">
              View
              <FiArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}