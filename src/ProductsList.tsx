import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spinner, Alert, Badge, Button } from "react-bootstrap";
import { fetchProducts, type Product } from "./api";

type ProductsListProps = {
  selectedCategory: string; // "all", "electronics", "jewelery", etc.
};

export default function ProductsList({ selectedCategory }: ProductsListProps) {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" variant="light" />
      </div>
    );

  if (error)
    return (
      <Alert variant="danger">
        Error loading products: {(error as Error).message}
      </Alert>
    );

  // Filter products by category
  const filteredProducts =
    selectedCategory === "all"
      ? data
      : data?.filter((p) => p.category === selectedCategory);

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 products-grid">
      {filteredProducts?.map((product) => (
        <Col key={product.id}>
          <Card className="product-card h-100 shadow-sm">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              className="product-image p-3"
              style={{ height: "220px", objectFit: "contain" }}
            />

            <Card.Body className="d-flex flex-column">
              <Card.Title className="product-title">{product.title}</Card.Title>

              <Badge bg="secondary" className="mb-2 align-self-start">
                {product.category}
              </Badge>

              <Card.Text className="text-muted small mb-2">
                {product.description.substring(0, 100)}...
              </Card.Text>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold">${product.price.toFixed(2)}</span>
                <span className="text-warning">
                  ⭐ {product.rating.rate} ({product.rating.count})
                </span>
              </div>

              <Button
                variant="primary"
                className="mt-auto"
                onClick={() => console.log("Add to cart:", product.id)}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
