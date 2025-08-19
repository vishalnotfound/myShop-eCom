import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ cartCount, user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed top-0 left-0 w-full z-50 h-16">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 cursor-pointer">
        <Link to="/">MyShop</Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-6 text-gray-700">
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/">Home</Link>
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/">Products</Link>
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Cart & User/Profile */}
      <div className="flex items-center gap-4">
        <Link to="/cart">
          <button className="relative bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">
            🛒 Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </Link>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">
              {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
