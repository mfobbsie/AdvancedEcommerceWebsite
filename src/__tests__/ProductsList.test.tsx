jest.mock("../firebaseConfig", () => ({
  db: {},
}));

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

import { render, screen, fireEvent } from "@testing-library/react";
import ProductsList from "../ProductsList";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "../CartContext";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";

// --------------------
// MOCKS
// --------------------
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
  }),
}));

jest.mock("../CartContext", () => ({
  useCart: jest.fn(),
}));

jest.mock("../useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// --------------------
// TEST DATA
// --------------------
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
  {
    id: "2",
    title: "Laptop",
    price: 999,
    category: "electronics",
    description: "Fast laptop",
    image: "laptop.jpg",
    rating: { rate: 5, count: 200 },
  },
];

// --------------------
// HELPERS
// --------------------
function mockQuery({
  data,
  isLoading = false,
  error = null,
}: {
  data: any;
  isLoading?: boolean;
  error?: any;
}) {
  (useQuery as jest.Mock).mockReturnValue({
    data,
    isLoading,
    error,
  });
}

function renderList(category = "all") {
  return render(<ProductsList selectedCategory={category} />);
}

// --------------------
// TESTS
// --------------------
describe("ProductsList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useCart as jest.Mock).mockReturnValue({
      addToCart: jest.fn(),
    });

    (useAuth as jest.Mock).mockReturnValue({
      user: null, // default: logged out
    });

    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  test("renders loading state", () => {
    mockQuery({ data: null, isLoading: true });

    renderList();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockQuery({ data: null, error: new Error("Failed") });

    renderList();

    expect(screen.getByText(/Error loading products/i)).toBeInTheDocument();
  });

  test("renders products when data is available", () => {
    mockQuery({ data: mockProducts });

    renderList();

    expect(screen.getByText("Shirt")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
  });

  test("filters products by category", () => {
    mockQuery({ data: mockProducts });

    renderList("electronics");

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.queryByText("Shirt")).not.toBeInTheDocument();
  });

  test("calls addToCart when clicking Add to Cart", () => {
    const addToCartMock = jest.fn();
    (useCart as jest.Mock).mockReturnValue({ addToCart: addToCartMock });

    mockQuery({ data: mockProducts });

    renderList();

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);

    expect(addToCartMock).toHaveBeenCalledWith({
      id: "1",
      title: "Shirt",
      image: "shirt.jpg",
      price: 20,
      quantity: 1,
    });
  });

  test("shows Edit/Delete buttons when user is logged in", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: "abc" } });

    mockQuery({ data: mockProducts });

    renderList();

    expect(screen.getAllByText("Edit").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Delete").length).toBeGreaterThan(0);
  });

  test("calls deleteDoc when Delete is clicked", () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { uid: "abc" } });

    mockQuery({ data: mockProducts });

    // mock confirm() to always return true
    jest.spyOn(window, "confirm").mockReturnValue(true);

    renderList();

    fireEvent.click(screen.getAllByText("Delete")[0]);

    expect(deleteDoc).toHaveBeenCalled();
    expect(doc).toHaveBeenCalledWith(expect.anything(), "products", "1");
  });
});
