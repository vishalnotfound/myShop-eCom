import React from "react";

function Toast({ message, show }) {
  return (
    <div
      className={`fixed top-20 right-5 px-4 py-2 rounded bg-green-500 text-white shadow-lg transition-all duration-300 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
      }`}
    >
      {message}
    </div>
  );
}

export default Toast;
