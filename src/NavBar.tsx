import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "./fetchCategories";
import { useAuth } from "./useAuth";
import { useUserProfile } from "./useUserProfile";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export default function NavBar({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src="/assets/logo.svg" alt="Stitch & Spark Logo" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Home */}
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* Category Filter */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                >
                  Categories
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

              {/* Logged-in user */}
              {user && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Hello, {profile?.name || "User"}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        View Profile
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/add-product">
                        Add Product
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/orders">
                        Order History
                      </Link>
                    </li>

                    <li>
                      <hr className="dropdown-divider" />
                    </li>

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}

              {/* Guest user */}
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

              {/* Cart */}
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  🛒 {totalItems > 0 && <span>({totalItems})</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
