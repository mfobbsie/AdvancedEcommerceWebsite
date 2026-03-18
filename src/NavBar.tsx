// NavBar.tsx
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./fetchCategories";
import { useAuth } from "./useAuth";

export default function NavBar({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const user = useAuth();
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/assets/logo.svg" alt="Stitch & Spark Logo" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Filter Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onCategoryChange("all")}
                    >
                      All
                    </button>
                  </li>
                  {categories?.map((category) => (
                    <li key={category}>
                      <button
                        className="dropdown-item text-capitalize"
                        onClick={() => onCategoryChange(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/add-product">
                    Add Product
                  </Link>
                </li>
              )}

              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
