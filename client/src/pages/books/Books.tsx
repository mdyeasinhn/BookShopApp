import { BookCard } from "@/components/home/FeaturedBooks/BookCard";
import { categories } from "@/components/shared/Bookcategory/Categories";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";
import { IBook } from "@/types/book.types";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, RefreshCw, BookOpen, Package } from "lucide-react";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchParams({});
    setSearchInput("");
    refetch();
  };

  if (isLoading) return <LoadingSpinner smallHeight={false} />;
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-red-500" />
        </div>
        <p className="text-red-600 font-medium">Error fetching books</p>
        <button 
          onClick={() => refetch()} 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border hover:shadow-md transition-all"
            >
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filters</span>
            </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div className={`lg:w-80 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Filter className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-white font-semibold text-lg">Search & Filter</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Search Section */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Search Books
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-slate-400"
                      placeholder="Enter book title, author..."
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Search Books
                  </button>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-200"></div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      value={category}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-slate-700">
                    Availability
                  </label>
                  <div className="relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      onChange={(e) => handleFilterChange("inStock", e.target.value)}
                      value={inStock}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="">All Stock Status</option>
                      <option value="true">✅ In Stock</option>
                      <option value="false">❌ Out of Stock</option>
                    </select>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  Reset All Filters
                </button>

                {/* Active Filters Display */}
                {(category || inStock || searchQuery) && (
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-700 mb-3">Active Filters:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchQuery && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          Search: {searchQuery}
                        </span>
                      )}
                      {category && (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          {category}
                        </span>
                      )}
                      {inStock && (
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                          {inStock === "true" ? "In Stock" : "Out of Stock"}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Books Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 mb-1">Book Collection</h1>
                  <p className="text-slate-600">
                    {data?.data?.length ? (
                      `Showing ${data.data.length} book${data.data.length !== 1 ? 's' : ''}`
                    ) : (
                      'No books found'
                    )}
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            {data?.data?.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.data.map((book: IBook) => (
                  //@ts-ignore
                  <div key={book._id} className="transform hover:scale-105 transition-transform duration-200">
                    <BookCard book={book} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No Books Found</h3>
                <p className="text-slate-600 mb-6">
                  We couldn't find any books matching your current filters.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;