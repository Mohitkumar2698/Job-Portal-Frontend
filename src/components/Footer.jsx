import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaLinkedin,
  FaSquareFacebook,
} from "react-icons/fa6";

const Footer = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto flex flex-col">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 flex flex-col">
            <Link
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
            >
              JOB HUB
            </Link>
            <p className="text-gray-400 text-sm">
              Your gateway to finding the perfect career opportunity.
            </p>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                Mohitkumar@email.com
              </li>
              <li className="text-gray-400 text-sm hover:text-blue-400 transition-colors">
                +91 9876543210
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Quick Links</h4>
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                >
                  Jobs
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link
                    to="/dashboard"
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg font-semibold">Follow Us</h4>
            <ul>
              <li
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 transition-colors group"
              >
                <a>
                  <FaSquareXTwitter className="text-lg group-hover:scale-110 transition-transform" />
                  <span>X (Twitter)</span>
                </a>
              </li>
              <li
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-pink-400 transition-colors group"
              >
                <a>
                  <FaSquareInstagram className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Instagram</span>
                </a>
              </li>
              <li
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-500 transition-colors group"
              >
                <a>
                  <FaSquareFacebook className="text-lg group-hover:scale-110 transition-transform" />
                  <span>Facebook</span>
                </a>
              </li>
              <li
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-blue-400 transition-colors group"
              >
                <a>
                  <FaLinkedin className="text-lg group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="mt-12 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Job Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
