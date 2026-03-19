import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, Row, Spinner, Alert, Badge, Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import { fetchProducts } from "./fetchProducts";
import { useAuth } from "./useAuth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
export default function ProductsList({ selectedCategory }) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient(); // <-- FIXED
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
    async function handleDelete(id) {
        if (!confirm("Delete this product?"))
            return;
        await deleteDoc(doc(db, "products", id));
        // Refresh product list
        queryClient.invalidateQueries({ queryKey: ["products"] });
    }
    if (isLoading)
        return (_jsx("div", { className: "d-flex justify-content-center mt-4", children: _jsx(Spinner, { animation: "border", role: "status" }) }));
    if (error)
        return (_jsxs(Alert, { variant: "danger", children: ["Error loading products: ", error.message] }));
    const filteredProducts = selectedCategory === "all"
        ? data
        : data?.filter((p) => p.category === selectedCategory);
    return (_jsx(Row, { xs: 1, sm: 2, md: 3, lg: 4, className: "g-4 products-grid", children: filteredProducts?.map((product) => {
            const title = product.title ?? "Untitled Product";
            const price = product.price ?? 0;
            const description = product.description ?? "";
            const category = product.category ?? "uncategorized";
            const image = product.image ?? "assets/placeholder.jpg";
            const rate = product.rating?.rate ?? 0;
            const count = product.rating?.count ?? 0;
            return (_jsx(Col, { children: _jsxs(Card, { className: "product-card h-100 shadow-sm", children: [_jsx(Card.Img, { variant: "top", src: image, alt: title, className: "product-image p-3", style: { height: "220px", objectFit: "contain" }, onError: (e) => {
                                e.currentTarget.src = "assets/placeholder.jpg";
                            } }), _jsxs(Card.Body, { className: "d-flex flex-column", children: [_jsx(Card.Title, { children: title }), _jsx(Badge, { bg: "secondary", className: "mb-2 align-self-start", children: category }), _jsxs(Card.Text, { className: "text-muted small mb-2", children: [description.substring(0, 100), "..."] }), _jsxs("div", { className: "d-flex justify-content-between align-items-center mb-2", children: [_jsxs("span", { className: "fw-bold", children: ["$", price.toFixed(2)] }), _jsxs("span", { className: "text-warning", children: ["\u2B50 ", rate, " (", count, ")"] })] }), _jsx(Button, { className: "mt-auto btn-brand-green", onClick: () => addToCart({
                                        id: product.id,
                                        title,
                                        image,
                                        price,
                                        quantity: 1,
                                    }), children: "Add to Cart" }), user && (_jsxs("div", { className: "d-flex gap-2 mt-3", children: [_jsx(Button, { className: "btn-brand-yellow", onClick: () => navigate(`/edit-product/${product.id}`), children: "Edit" }), _jsx(Button, { className: "btn-brand-grey", onClick: () => handleDelete(product.id), children: "Delete" })] }))] })] }) }, product.id));
        }) }));
}
