import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState(""); // priceAsc, priceDesc, rating

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (onCartUpdate) onCartUpdate(product);
    console.log("Added to cart:", product.title);
  };

  // Sort products based on selected type
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "priceAsc") return a.price - b.price;
    if (sortType === "priceDesc") return b.price - a.price;
    if (sortType === "rating") return b.rating?.rate - a.rating?.rate;
    return 0; // default order
  });

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      {/* Sort Dropdown */}
      <div className="mb-4 flex justify-end">
        <select
          className="border px-3 py-1 rounded"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
