export interface  IBook{
    _id: string;
    title: string;
    author: string;
    category: "Mountain" | "Road" | "Hybrid" | "BMX" | "Electric";
    price: number;
    image: string;
    quantity: number;   
    description: string;
    inStock: boolean;
  }
  