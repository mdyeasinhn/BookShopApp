/* eslint-disable @typescript-eslint/no-explicit-any */
import Container from "@/components/shared/Container";
import { useGetAllBooksQuery } from "@/redux/features/books/bookManagementApi";
import { BookCard } from "./BookCard"; // We'll use the new BookCard

import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { BookCardSkeleton } from "./BookCardSkeleton";
import { Button } from "@/components/ui/button";

const FeaturedBooks = () => {
    const { data, isLoading, error } = useGetAllBooksQuery({});
    const books = data?.data || [];

    if (error) {
        return <p className="text-center text-red-500 py-20">Error fetching books. Please try again later.</p>;
    }

    return (
        <section className="py-20 sm:py-24 bg-gray-50">
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Featured Books</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our hand-picked selection of recent bestsellers and timeless classics.
                    </p>
                </div>

                {/* Grid Layout - 4 Cards per Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
                    {isLoading ? (
                        // Show 6 skeleton cards while loading
                        Array.from({ length: 6 }).map((_, index) => <BookCardSkeleton key={index} />)
                    ) : books.length > 0 ? (
                        // Show actual book cards (limit to 6 books)
                        books.slice(0, 6).map((book: any) => <BookCard key={book._id} book={book} />)
                    ) : (
                        <p className="text-center text-gray-500 mt-4 col-span-full">No books available at the moment.</p>
                    )}
                </div>

                {/* View All Books Button */}
                {!isLoading && books.length > 0 && (
                    <div className="text-center mt-16">
                        <Link to='/books'>
                            <Button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md hover:shadow-lg">
                                View All Books <FiArrowRight />
                            </Button>
                        </Link>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default FeaturedBooks;
