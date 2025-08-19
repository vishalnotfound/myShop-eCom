import React from "react";

function Cart({ cartItems, onRemove, onQuantityChange }) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">Your cart is empty.</div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center border p-4 rounded gap-4"
          >
            {/* Product Image */}
            <div className="w-full sm:w-20 flex-shrink-0 flex justify-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-32 sm:w-full h-32 sm:h-20 object-contain rounded"
              />
            </div>

            {/* Product Name */}
            <div className="w-full sm:w-1/2">
              <h3 className="font-semibold truncate text-center sm:text-left">
                {item.title}
              </h3>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 justify-center w-full sm:w-1/4 mt-2 sm:mt-0">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="w-full sm:w-24 text-center sm:text-right font-semibold mt-2 sm:mt-0">
              ${(item.price * item.quantity).toFixed(2)}
            </div>

            {/* Remove Button */}
            <div className="w-full sm:w-12 text-center mt-2 sm:mt-0">
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-xl font-bold">
        Total: ${totalPrice.toFixed(2)}
      </div>
    </div>
  );
}

export default Cart;
