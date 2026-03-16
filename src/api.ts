import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axios.get<Product[]>(
    "https://fakestoreapi.com/products",
  );
  return data;
};
