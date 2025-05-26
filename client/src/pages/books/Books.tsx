import { BookCard } from "@/components/home/FeaturedBooks/BookCard";
import { categories } from "@/components/shared/Bookcategory/Categories";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";
import { IBook } from "@/types/book.types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "";
  const inStock = searchParams.get("inStock") || "";
  const searchQuery = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(searchQuery);

  const { data, isLoading, error, refetch } = useGetAllBooksQuery({
    search: searchQuery || undefined,
    category: category || undefined,
    inStock: inStock === "true" ? true : inStock === "false" ? false : undefined,
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  const handleSearch = () => {
    handleFilterChange("search", searchInput);
  };

  const handleReset = () => {
    setSearchParams({});
    setSearchInput("");
    refetch();
  };

  if (isLoading) return <LoadingSpinner  smallHeight={false}/>;
  if (error) return <p className="text-center text-red-500">Error fetching books</p>;

  return (
    <div className="bg-white text-black py-10">
<div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 p-4">
  {/* Category Filter */}
  <select
    onChange={(e) => handleFilterChange("category", e.target.value)}
    value={category}
    className="border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>{cat}</option>
    ))}
  </select>

  {/* Search Input with Button */}
  <div className="flex rounded-xl border overflow-hidden shadow-sm">
    <input
      type="text"
      className="px-4 py-3 text-gray-700 bg-white outline-none"
      placeholder="Search Books"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
    />
    <button
      type="button"
      className="px-5 py-3 bg-rose-600 text-white hover:bg-rose-500 transition-all"
      onClick={handleSearch}
    >
      Search
    </button>
  </div>

  {/* In-Stock Filter */}
  <select
    onChange={(e) => handleFilterChange("inStock", e.target.value)}
    value={inStock}
    className="border px-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <option value="">All Stock</option>
    <option value="true">In Stock</option>
    <option value="false">Out of Stock</option>
  </select>

  {/* Reset Button */}
  <button
    onClick={handleReset}
    className="px-5 py-3 bg-red-500 text-white rounded-xl shadow-md hover:bg-red-600 transition-all"
  >
    Reset
  </button>
</div>


      <div className="container mx-auto px-4 mt-6">
        {data?.data?.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((book :IBook) => (
              //@ts-ignore
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No books available</p>
        )}
      </div>
    </div>
  );
};

export default Books;
