// EditProductForm.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    async function loadProduct() {
      if (!id) return;
      const ref = doc(db, "products", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct(snap.data() as typeof product);
      }
    }
    loadProduct();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;
    await updateDoc(doc(db, "products", id), {
      title: product.title,
      price: Number(product.price),
      category: product.category,
      description: product.description,
      image: product.image,
    });

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2>Edit Product</h2>

      <input
        name="title"
        value={product.title}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="category"
        value={product.category}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        className="form-control mb-2"
      />
      <input
        name="image"
        value={product.image}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <button className="btn-brand-yellow" style={{ borderRadius: "12px" }}>Save Changes</button>
    </form>
  );
}
