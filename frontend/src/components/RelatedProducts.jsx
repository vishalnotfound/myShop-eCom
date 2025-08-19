import React from "react";
import ProductCard from "./ProductCard";

function RelatedProducts({ currentProductId, products, onCartUpdate }) {
  const related = products.filter((p) => p.id !== currentProductId).slice(0, 4);

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onCartUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
