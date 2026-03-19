import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export type CartItem = {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
};

export async function createOrder(
  userId: string,
  cartItems: CartItem[],
): Promise<string> {
  const totalPrice = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0,
  );

  const order = {
    userId,
    createdAt: Timestamp.now(),
    totalPrice,
    items: cartItems.map((item: CartItem) => ({
      productId: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    })),
  };

  const docRef = await addDoc(collection(db, "orders"), order);
  return docRef.id;
}
