import Container from "@/components/shared/Container";
import BookCard from "./BookCard";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";

export interface IBook {
  _id: string;
  image: string;
  location: string;
  author: string;
  category: string;
  availability: boolean;
  priceRange: string;
}

const books: IBook[] = [
  {
    _id: "1",
    image: "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
    location: "New York, USA",
    author: "John Doe",
    category: "Luxury",
    availability: true,
    priceRange: "$150 - $300",
  },
  {
    _id: "2",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym9va3xlbnwwfHwwfHx8MA%3D%3D",
    location: "Paris, France",
    author: "Jane Smith",
    category: "Budget",
    availability: false,
    priceRange: "$50 - $100",
  },
  {
    _id: "3",
    image: "https://img.freepik.com/free-vector/book-with-lighbulb-cartoon-vector-icon-illustration-object-education-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4009.jpg",
    location: "Tokyo, Japan",
    author: "Takashi Yamamoto",
    category: "Mid-Range",
    availability: true,
    priceRange: "$100 - $200",
  },
  {
    _id: "4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6PK5Ei-CvEMy6WFlFKdTr-aEAmK-4Qn-PU1QqzWolJokdRrtaXQegeTE&s",
    location: "Sydney, Australia",
    author: "Emma Wilson",
    category: "Luxury",
    availability: true,
    priceRange: "$200 - $400",
  },
];

const FeaturedBooks = () => {
  return (
    <div className="bg-white-900 text-slate-800 py-10">
      <Container>
        <h2 className="text-center text-3xl font-bold">Featured Books</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {books?.slice(0, 6).map((book) => (
            <BookCard key={book._id} book={book} /> 
          ))}
        </div>
      </Container>

      {/* Uncomment if you want a "View More" button */}
      {/* <div className="flex justify-center items-center my-12">
        <Link to="/books">
          <Button>View More</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default FeaturedBooks;
