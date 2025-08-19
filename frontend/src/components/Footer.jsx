import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="flex justify-center items-center space-x-6">
        {/* Name */}
        <p className="text-gray-300">&copy; Vishal Verma</p>

        {/* Social Icons */}
        <a href="#" className="hover:text-blue-400" aria-label="Twitter">
          🐦
        </a>
        <a href="#" className="hover:text-blue-600" aria-label="LinkedIn">
          🔗
        </a>
        <a
          href="mailto:yourmail@example.com"
          className="hover:text-red-400"
          aria-label="Email"
        >
          ✉️
        </a>
      </div>
    </footer>
  );
}

export default Footer;
