import Container from "@/components/shared/Container";

import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";
import { BookCard } from "./BookCard";
import CustomButton from "@/components/ui/CustomButton";
import { Link } from "react-router-dom";

const FeaturedBooks = () => {
  const { data, isLoading, error } = useGetAllBooksQuery({});

  // Extract books array from API response
  console.log(data)
  const books = data?.data || [];
  if (isLoading) {
    return <p className="text-center text-xl">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching books</p>;
  }

  return (
    <div className="bg-white-900 text-black-800 py-10">
      <Container>
        <h2 className="text-center text-3xl font-bold">Featured Books</h2>

        {books.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {books.slice(0, 6).map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No books available</p>
        )}

        <Link to='/books' className="flex justify-center items-center  mt-5">
          <CustomButton text="View All"  />
        </Link>
      </Container>
    </div>
  );
};

export default FeaturedBooks;
