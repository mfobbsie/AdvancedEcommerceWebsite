import { jsx as _jsx } from "react/jsx-runtime";
jest.mock("../firebaseConfig", () => ({
    db: {}, // not used directly in the test
}));
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
}));
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import OrderDetails from "../OrderDetails";
import { getDoc } from "firebase/firestore";
import "@testing-library/jest-dom";
// Mock Firestore
jest.mock("firebase/firestore", () => ({
    doc: jest.fn(),
    getDoc: jest.fn(),
}));
// Helper to render component with router params
function renderWithRouter(orderId) {
    return render(_jsx(MemoryRouter, { initialEntries: [`/orders/${orderId}`], children: _jsx(Routes, { children: _jsx(Route, { path: "/orders/:orderId", element: _jsx(OrderDetails, {}) }) }) }));
}
describe("OrderDetails Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("renders loading state initially", () => {
        getDoc.mockResolvedValue({
            exists: () => false,
        });
        renderWithRouter("123");
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
    test("renders order details when Firestore returns valid data", async () => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                createdAt: { toDate: () => new Date("2024-01-01T12:00:00Z") },
                totalPrice: 49.99,
                items: [
                    {
                        title: "Test Product",
                        price: 25,
                        quantity: 2,
                        image: "https://example.com/image.jpg",
                    },
                ],
            }),
        });
        renderWithRouter("123");
        await waitFor(() => {
            expect(screen.getByText(/Order #123/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
            expect(screen.getByText(/\$49.99/i)).toBeInTheDocument();
        });
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
    });
    test("handles missing order (Firestore exists() = false)", async () => {
        getDoc.mockResolvedValue({
            exists: () => false,
        });
        renderWithRouter("missing");
        await waitFor(() => {
            expect(screen.getByText(/loading/i)).toBeInTheDocument();
        });
    });
    test("handles Firestore errors gracefully", async () => {
        const consoleSpy = jest
            .spyOn(console, "error")
            .mockImplementation(() => { });
        getDoc.mockRejectedValue(new Error("Firestore error"));
        renderWithRouter("error-case");
        await waitFor(() => {
            expect(screen.getByText(/error loading order/i)).toBeInTheDocument();
        });
        consoleSpy.mockRestore();
    });
    test("handles missing fields in order items (edge case)", async () => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                createdAt: { toDate: () => new Date() },
                totalPrice: 0,
                items: [
                    {
                        title: undefined,
                        price: undefined,
                        quantity: undefined,
                        image: undefined,
                    },
                ],
            }),
        });
        renderWithRouter("edge-case");
        await waitFor(() => {
            expect(screen.getByText(/Order #edge-case/i)).toBeInTheDocument();
        });
        // Should still render without crashing
        expect(screen.getByRole("img")).toBeInTheDocument();
    });
    test("renders multiple items correctly", async () => {
        getDoc.mockResolvedValue({
            exists: () => true,
            data: () => ({
                createdAt: { toDate: () => new Date() },
                totalPrice: 100,
                items: [
                    { title: "Item A", price: 20, quantity: 2, image: "a.jpg" },
                    { title: "Item B", price: 30, quantity: 2, image: "b.jpg" },
                ],
            }),
        });
        renderWithRouter("multi");
        await waitFor(() => {
            expect(screen.getByText(/Item A/i)).toBeInTheDocument();
            expect(screen.getByText(/Item B/i)).toBeInTheDocument();
        });
    });
});
