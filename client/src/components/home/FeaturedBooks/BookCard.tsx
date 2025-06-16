import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import CustomButton from "@/components/ui/CustomButton";
import { IBook } from "@/types/book.types";



interface BookCardProps {
  book: IBook;
}

export function BookCard({ book }: BookCardProps) {
  // Fallback image if book image is missing or broken
  const fallbackImage = "https://i.ibb.co/68B1S8P/image-not-found.jpg";

  return (
    <Card className="shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="w-full p-6 flex flex-col items-center">
        {/* Image section */}
        <div className="bg-[#F9F9F9] rounded-xl h-[300px] w-full flex justify-center items-center p-4">
          <img
            src={book.image || fallbackImage}
            alt={book.title}
            className="w-full h-full object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Title and Author */}
        <div className="mt-5 text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
          <p className="text-gray-600 font-medium text-lg">By: {book.author}</p>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-200 my-4 w-full" />

        {/* Category, Price Range, and View Button */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-gray-700 text-md">{book.category}</p>
            
          </div>
          <Link to={`/books/${book._id?.toString()}`}>
            <CustomButton className="px-5 rounded-2xl py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-600 hover:to-orange-700 transition-all duration-200">
              View
            </CustomButton>
          </Link>
        </div>
      </div>
    </Card>
  );
}
