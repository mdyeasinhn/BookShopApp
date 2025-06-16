import { Link } from "react-router-dom";

import { Card } from "@/components/ui/card";
import CustomButton from "@/components/ui/CustomButton";

// Define the Book type (as you provided)
type Book = {
  _id: string
  image?: string
  title: string
  price: number
  location: string
  author: string
  category: string
  availability: boolean
  priceRange: string
  rating?: number
}

interface BookCardProps {
  book: Book
}

export function BookCard({ book }: BookCardProps) {
  // A fallback image in case book.image is missing or broken
  // const fallbackImage = 'https://i.ibb.co/68B1S8P/image-not-found.jpg';

  return (
    <Card >
      < div>
        <div className="w-[374px]    border-opacity-30  rounded-xl p-6  mt-6">
          <div className="bg-[#F3F3F3] rounded-xl h-[300px] w-[310px] wflex justify-center items-center p-10">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-3">
            <h2 className="text-2xl font-bold">{book.title}</h2>
            <p className="mt-4 font-medium">By : {book.author}</p>
          </div>
          <hr className="border border-dashed mt-4" />
          <div className="flex justify-between mt-4">
            <p className="font-medium">{book.category}</p>
            <Link to={`/books/${book._id?.toString()}`}>
              <CustomButton>
                View
              </CustomButton></Link>
          </div>
        </div>
      </div>
    </Card>
  );
}