import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "../CartContext";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import ProductsList from "../ProductsList";
import ViewShoppingCart from "../ViewShoppingCart";
import { useAuth } from "../useAuth";
import { fetchProducts } from "../fetchProducts";

jest.mock("../fetchProducts");
jest.mock("../useAuth", () => ({
  useAuth: jest.fn(),
}));

const mockProducts = [
  {
    id: "1",
    title: "Shirt",
    price: 20,
    category: "clothing",
    description: "A nice shirt",
    image: "shirt.jpg",
    rating: { rate: 4, count: 10 },
  },
];

function TestApp() {
  return (
    <>
      {/* Test-only navigation link */}
      <Link to="/cart">Go to Cart</Link>

      <Routes>
        <Route path="/" element={<ProductsList selectedCategory="all" />} />
        <Route path="/cart" element={<ViewShoppingCart />} />
      </Routes>
    </>
  );
}

describe("E-commerce Integration Flow", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "test-user-123" },
      loading: false,
    });
  });

  test("user can load products, add to cart, and view cart", async () => {
    (fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <MemoryRouter initialEntries={["/"]}>
            <TestApp />
          </MemoryRouter>
        </CartProvider>
      </QueryClientProvider>,
    );

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Shirt")).toBeInTheDocument();
    });

    // Add to cart
    fireEvent.click(screen.getByText("Add to Cart"));

    // Navigate to cart using real React Router navigation
    fireEvent.click(screen.getByText("Go to Cart"));

    // Now the cart should show the item
    await waitFor(() => {
      expect(screen.getByText("Shirt")).toBeInTheDocument();

      // Match "$20.00 × 1" even though the DOM splits it across nodes
      expect(
        screen.getByText(
          (_, element) =>
            element?.textContent?.replace(/\s+/g, " ").trim() === "$20.00 × 1",
        ),
      ).toBeInTheDocument();
    });
  });
});
