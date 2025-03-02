import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Book as BookIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Define the Book type if you don't have the schema
type Book = {
  _id: string;
  image?: string;
  location: string;
  author: string;
  category: string;
  availability: boolean;
  priceRange: string;
};

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Card className="w-full h-full flex flex-col overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-center gap-2">
          <BookIcon className="h-5 w-5 text-primary" />
          <Badge variant="secondary" className="bg-[#CAE9FF] text-[#1B4965]">
            {book.category}
          </Badge>
        </div>
        <h3 className="font-merriweather text-lg font-semibold leading-none tracking-tight text-[#333333] line-clamp-2">
          {book.title}
        </h3>
        <p className="font-open-sans text-sm text-muted-foreground">
          by {book.author}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="font-merriweather text-xl font-bold text-[#1B4965]">
          ${(book.price / 100).toFixed(2)}
        </p>
      </CardContent>
      <Link to={`/books/${book._id?.toString()}`}>
        <CardFooter className="p-4 pt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-[#62B6CB] hover:bg-[#1B4965] text-white transition-colors duration-300">
                View Details
              </Button>
            </DialogTrigger>

          </Dialog>
        </CardFooter>
      </Link>
    </Card>
  );
}