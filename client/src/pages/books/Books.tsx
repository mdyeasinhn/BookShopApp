import { BookCard } from "@/components/home/FeaturedBooks/BookCard";
import { categories } from "@/components/shared/Bookcategory/Categories";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const inStock = searchParams.get("inStock") || "";
  const searchQuery = searchParams.get("search") || "";

  // Local state for search input
  const [searchInput, setSearchInput] = useState(searchQuery);

  const { data, isLoading, error, refetch } = useGetAllBooksQuery({
    search: searchQuery,
    category,
    inStock: inStock === "true",
  });

  useEffect(() => {
    refetch();
  }, [searchParams]);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
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

  if (isLoading) return <LoadingSpinner/>
  if (error) return <p className="text-center text-red-500">Error fetching books</p>;

  return (
    <div className="bg-white text-black py-10">
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        {/* Category Filter */}
        <select
          onChange={(e) => handleFilterChange("category", e.target.value)}
          value={category}
          className="border p-4 rounded-lg"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        {/* Search Input with Button */}
        <div className="flex border rounded-lg overflow-hidden">
          <input
            type="text"
            className="px-4 py-2 text-gray-700 bg-white outline-none"
            placeholder="Search Books"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 text-white bg-gray-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        {/* In-Stock Filter */}
        <select
          onChange={(e) => handleFilterChange("inStock", e.target.value)}
          value={inStock}
          className="border p-4 rounded-md"
        >
          <option value="">All Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        {/* Reset Button */}
        <button onClick={handleReset} className="px-4 py-2 bg-red-500 text-white rounded-md">
          Reset
        </button>
      </div>

      <div className="container mx-auto px-4 mt-6">
        {data?.data?.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.data.map((book) => (
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
