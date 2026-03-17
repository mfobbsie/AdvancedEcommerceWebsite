// AddProductForm.tsx
import { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function AddProductForm() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "products"), {
      ...product,
      price: Number(product.price),
      rating: { rate: 0, count: 0 },
    });

    alert("Product added!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" onChange={handleChange} placeholder="Title" />
      <input name="price" onChange={handleChange} placeholder="Price" />
      <input name="category" onChange={handleChange} placeholder="Category" />
      <textarea
        name="description"
        onChange={handleChange}
        placeholder="Description"
      />
      <input name="image" onChange={handleChange} placeholder="Image URL" />
      <button>Add Product</button>
    </form>
  );
}
