import { Link } from "react-router-dom";

type NavBarProps = {
  onCategoryChange: (category: string) => void;
};

export default function NavBar({ onCategoryChange }) {
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
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onCategoryChange("electronics")}
                    >
                      Electronics
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onCategoryChange("jewelery")}
                    >
                      Jewelry
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onCategoryChange("men's clothing")}
                    >
                      Men's Clothing
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => onCategoryChange("women's clothing")}
                    >
                      Women's Clothing
                    </button>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
