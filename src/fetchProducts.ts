// fetchProducts.ts
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export async function fetchProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Product),
  }));
}
