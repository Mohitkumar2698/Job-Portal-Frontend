import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="navlogo small_logo">
          {/* <img src="/logo.png" alt="logo" /> */}
          <Link
            to="/"
            className="text-4xl tracking-wider font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
          >
            JOB HUB
          </Link>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(false)}>
                Jobs
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(false)}>
                  Dashboard
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;
