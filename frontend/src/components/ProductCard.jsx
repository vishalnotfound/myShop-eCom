import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col h-full">
      {/* Top section: Image + Title */}
      <Link
        to={`/product/${product.id}`}
        className="flex flex-col items-center flex-grow"
      >
        <div className="w-full h-48 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.name || product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <h2 className="text-lg font-semibold text-center line-clamp-2">
          {product.name || product.title}
        </h2>
      </Link>

      {/* Bottom section: Price + Add to Cart */}
      <div className="mt-4 flex flex-col items-center">
        <p className="text-gray-600 mb-2">${product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
