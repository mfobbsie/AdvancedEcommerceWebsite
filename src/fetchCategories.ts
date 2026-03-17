// fetchCategories.ts
import { db } from "./firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export async function fetchCategories() {
  const snapshot = await getDocs(collection(db, "products"));
  const categories = snapshot.docs.map((doc) => doc.data().category);
  return Array.from(new Set(categories)); // unique categories
}
