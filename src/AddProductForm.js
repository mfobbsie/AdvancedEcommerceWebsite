import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// AddProductForm.tsx
import { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function AddProductForm() {
    const navigate = useNavigate();
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
            title: product.title,
            price: Number(product.price),
            category: product.category,
            description: product.description,
            image: product.image,
            rating: { rate: 0, count: 0 },
        });
        navigate("/"); // go home after adding
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "container mt-4", children: [_jsx("h2", { children: "Add Product" }), _jsx("input", { name: "title", onChange: handleChange, placeholder: "Title", className: "form-control mb-2" }), _jsx("input", { name: "price", onChange: handleChange, placeholder: "Price", className: "form-control mb-2" }), _jsx("input", { name: "category", onChange: handleChange, placeholder: "Category", className: "form-control mb-2" }), _jsx("textarea", { name: "description", onChange: handleChange, placeholder: "Description", className: "form-control mb-2" }), _jsx("input", { name: "image", onChange: handleChange, placeholder: "Image URL", className: "form-control mb-2" }), _jsx("button", { className: "mt-auto btn-brand-green", style: { borderRadius: "12px" }, children: "Add Product" })] }));
}
