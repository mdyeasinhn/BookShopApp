import { BookCard } from "@/components/home/FeaturedBooks/BookCard";
import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";

const Books = () => {
  const { data, isLoading, error } = useGetAllBooksQuery({});

  console.log("Fetched Data:", data); // Debugging API response

  const books = data?.data || [];

  if (isLoading) {
    return <p className="text-center text-xl">Loading books...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error fetching books</p>;
  }

  return (
    <div className="bg-white text-black py-10">
      <div className="container mx-auto px-4">

        {books.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {books.map((book) => {
              console.log("Book data:", book); // Debugging each book
              return <BookCard key={book._id} book={book} />;
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No books available</p>
        )}
      </div>
    </div>
  );
};

export default Books;
