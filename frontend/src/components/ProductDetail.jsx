import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductDetail({ onAddToCart }) {
  const { id } = useParams(); // get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Fetch all products for Related Products
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products`);
        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  // Filter related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Main Product */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 h-80 object-contain rounded"
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-2 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <ProductCard product={p} onAddToCart={onAddToCart} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
