// Products from Fake Store API: https://fakestoreapi.com/products
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spinner, Alert, Badge } from "react-bootstrap";
import { fetchProducts, type Product } from "./api";

export default function ProductsList() {
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

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4 products-grid">
      {data?.map((product) => (
        <Col key={product.id}>
          <Card className="product-card h-100">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="product-title">{product.title}</Card.Title>
              <Badge bg="secondary" className="mb-2 align-self-start">
                {product.category}
              </Badge>
              <Card.Text className="mt-auto product-price">
                ${product.price.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}