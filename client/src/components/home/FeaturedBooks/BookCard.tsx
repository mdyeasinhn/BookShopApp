import { Card } from "@/components/ui/card"
import CustomButton from "@/components/ui/CustomButton"
import { Link } from "react-router-dom"

// Define the Book type
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
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div>
        <div className="w-[374px] border border-gray-200 border-opacity-30 rounded-xl p-6 mt-6 bg-white">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-[300px] w-[310px] flex justify-center items-center p-10 overflow-hidden">
            <img
              src={book.image || "/placeholder.svg"}
              alt={book.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="mt-4 space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {book.title}
            </h2>
            <p className="text-gray-600 font-medium">By: {book.author}</p>
          </div>
          <hr className="border-dashed border-gray-300 mt-4" />
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 uppercase tracking-wide">Category</span>
              <p className="font-medium text-gray-800">{book.category}</p>
            </div>
            <Link to={`/books/${book._id?.toString()}`}>
              <CustomButton className="hover:shadow-md transition-shadow">View Details</CustomButton>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
