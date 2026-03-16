import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./api";

type NavBarProps = {
  onCategoryChange: (category: string) => void;
};

export default function NavBar({ onCategoryChange }: NavBarProps) {
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
            Online Store
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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
    id="categoryDropdown"
    role="button"
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
