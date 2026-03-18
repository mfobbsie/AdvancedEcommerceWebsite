import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, Col, Row, Spinner, Alert, Badge, Button } from "react-bootstrap";
import { useCart } from "./CartContext";
import { fetchProducts } from "./fetchProducts";
import { useAuth } from "./useAuth";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
  rating?: {
    rate?: number;
    count?: number;
  };
};

type ProductsListProps = {
  selectedCategory: string;
};

export default function ProductsList({ selectedCategory }: ProductsListProps) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // <-- FIXED

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", id));

    // Refresh product list
    queryClient.invalidateQueries(["products"]); // <-- FIXED
  }

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger">
        Error loading products: {(error as Error).message}
      </Alert>
    );

  const filteredProducts =
    selectedCategory === "all"
      ? data
      : data?.filter((p) => p.category === selectedCategory);

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 products-grid">
      {filteredProducts?.map((product) => {
        const title = product.title ?? "Untitled Product";
        const price = product.price ?? 0;
        const description = product.description ?? "";
        const category = product.category ?? "uncategorized";
        const image =
          product.image ?? "https://fakestoreapi.com/icons/logo.png";
        const rate = product.rating?.rate ?? 0;
        const count = product.rating?.count ?? 0;

        return (
          <Col key={product.id}>
            <Card className="product-card h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={image}
                alt={title}
                className="product-image p-3"
                style={{ height: "220px", objectFit: "contain" }}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://fakestoreapi.com/icons/logo.png";
                }}
              />

              <Card.Body className="d-flex flex-column">
                <Card.Title>{title}</Card.Title>

                <Badge bg="secondary" className="mb-2 align-self-start">
                  {category}
                </Badge>

                <Card.Text className="text-muted small mb-2">
                  {description.substring(0, 100)}...
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold">${price.toFixed(2)}</span>
                  <span className="text-warning">
                    ⭐ {rate} ({count})
                  </span>
                </div>

                <Button
                  className="mt-auto btn-brand-green"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title,
                      image,
                      price,
                      quantity: 1,
                    })
                  }
                >
                  Add to Cart
                </Button>

                {user && (
                  <div className="d-flex gap-2 mt-3">
                    <Button
                      className="btn-brand-yellow"
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      className="btn-brand-grey"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
