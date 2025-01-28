import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/index.js";
import { doSignOut } from "../firebase/auth.js";

export function Navbar() {
  const location = useLocation();
  const { userLoggedIn } = useAuth();
  //want to add a logout button if user is logged in
  const NavLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`px-4 py-2 rounded-md transition-colors ${
          isActive ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-blue-50"
        }`}
      >
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"
          >
            Crex
          </Link>
          <div className="flex space-x-4">
            <NavLink to="/demo">Demo</NavLink>
            <NavLink to="/how-it-works">How It Works</NavLink>
            <NavLink to="/about">About Us</NavLink>
            {userLoggedIn ? (
              <button
                onClick={doSignOut}
                className="px-4 py-2 rounded-md text-gray-600 hover:bg-blue-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
