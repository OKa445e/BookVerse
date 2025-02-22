import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin", link: "/profile" },

  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(3, 4);
  }
  if(isLoggedIn == true && role === "user"){
    links.splice(5,1);
  }
  if(isLoggedIn == true && role === "admin") {
    links.splice(4,1);
    links.splice(1,1)
  }

  const [mobileNav, setMobileNav] = useState(false); // Use boolean instead of "hidden"/"block"

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <div className="text-2xl font-semibold">BookVerse</div>
        </Link>

        <div className="block md:flex items-center gap-4">
  
          <div className="hidden md:flex gap-4">
            {links.map((items, i) => (
              <div className="flex items-center">
                {items.title === "Profile" || items.title === "Admin" ? (
                  <Link
                    to={items.link}
                    className="px-5 py-2 text-lg border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="text-lg hover:text-blue-500 transition-all duration-300"
                    key={i}
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {isLoggedIn === false && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-5 py-2 text-lg border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 text-lg bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={() => setMobileNav((prevState) => !prevState)}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${
          mobileNav ? "flex" : "hidden"
        } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex-col items-center justify-center`}
      >
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav(false)} // Close menu on click
          >
            {items.title}
          </Link>
        ))}

        <Link
          to="/login"
          className="px-8 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={() => setMobileNav(false)} // Close menu on click
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          onClick={() => setMobileNav(false)} // Close menu on click
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Navbar;
