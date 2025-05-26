export interface  IBook{
    _id: string;
    title: string;
    author: string;
    category: "Fiction" | "Science" | "SelfDevelopement" | "Poetry" | "Religious";
    price: number;
    image: string;
    quantity: number;   
    description: string;
    inStock: boolean;
  }
  