import { jsx as _jsx } from "react/jsx-runtime";
// src/main.tsx
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { CartProvider } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(CartProvider, { children: _jsx(App, {}) }) }));
