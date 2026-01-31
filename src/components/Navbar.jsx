import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6  py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-4xl tracking-wider font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            JOB HUB
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-lg font-medium transition-all duration-300 relative group ${
                isActive("/")
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>

            <Link
              to="/jobs"
              className={`text-lg font-medium transition-all duration-300 relative group ${
                isActive("/jobs")
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Jobs
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ${
                  isActive("/jobs") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className={`text-lg font-medium transition-all duration-300 relative group ${
                  isActive("/dashboard")
                    ? "text-blue-500"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Dashboard
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300 ${
                    isActive("/dashboard") ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShow(!show)}
            className="md:hidden text-white text-2xl hover:text-blue-500 transition-colors"
          >
            {show ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            show ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-gray-800">
            <Link
              to="/"
              onClick={() => setShow(false)}
              className={`text-lg font-medium px-4 py-2 rounded-lg transition-all ${
                isActive("/")
                  ? "bg-blue-600/20 text-blue-500 border-l-4 border-blue-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              to="/jobs"
              onClick={() => setShow(false)}
              className={`text-lg font-medium px-4 py-2 rounded-lg transition-all ${
                isActive("/jobs")
                  ? "bg-blue-600/20 text-blue-500 border-l-4 border-blue-500"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              Jobs
            </Link>

            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setShow(false)}
                className={`text-lg font-medium px-4 py-2 rounded-lg transition-all ${
                  isActive("/dashboard")
                    ? "bg-blue-600/20 text-blue-500 border-l-4 border-blue-500"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setShow(false)}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold text-center hover:from-blue-700 hover:to-cyan-600 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
