import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsGrid from "./components/ProductsGrid";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Toast from "./components/Toast";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // Load cart from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [toast, setToast] = useState({ show: false, message: "" });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // Save cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Show toast notification
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  // Add item to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });

    // Show toast
    showToast(`${product.name || product.title} added to cart`);
  };

  // Remove item from cart
  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  // Change quantity
  const changeQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen relative">
        {/* Navbar */}
        <Navbar
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          user={user}
          setUser={setUser}
        />

        {/* Toast notification */}
        <Toast message={toast.message} show={toast.show} />

        {/* Main content */}
        <main className="flex-grow pt-16">
          <Routes>
            {/* Home / Products Grid */}
            <Route
              path="/"
              element={<ProductsGrid onCartUpdate={addToCart} />}
            />

            {/* Cart Page */}
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  onRemove={removeFromCart}
                  onQuantityChange={changeQuantity}
                />
              }
            />

            {/* Product Detail Page */}
            <Route
              path="/product/:id"
              element={<ProductDetail onAddToCart={addToCart} />}
            />

            {/* Login Page */}
            <Route path="/login" element={<Login setUser={setUser} />} />

            {/* Register Page */}
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;