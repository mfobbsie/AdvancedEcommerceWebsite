import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
            if (!id)
                return;
            const ref = doc(db, "products", id);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setProduct(snap.data());
            }
        }
        loadProduct();
    }, [id]);
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!id)
            return;
        await updateDoc(doc(db, "products", id), {
            title: product.title,
            price: Number(product.price),
            category: product.category,
            description: product.description,
            image: product.image,
        });
        navigate("/");
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "container mt-4", children: [_jsx("h2", { children: "Edit Product" }), _jsx("input", { name: "title", value: product.title, onChange: handleChange, className: "form-control mb-2" }), _jsx("input", { name: "price", value: product.price, onChange: handleChange, className: "form-control mb-2" }), _jsx("input", { name: "category", value: product.category, onChange: handleChange, className: "form-control mb-2" }), _jsx("textarea", { name: "description", value: product.description, onChange: handleChange, className: "form-control mb-2" }), _jsx("input", { name: "image", value: product.image, onChange: handleChange, className: "form-control mb-2" }), _jsx("button", { className: "btn-brand-yellow", style: { borderRadius: "12px" }, children: "Save Changes" })] }));
}
