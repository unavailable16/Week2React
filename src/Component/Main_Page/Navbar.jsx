import React, { useState } from "react";
import { NavLink, useLocation} from "react-router-dom";
import { HiReply } from "react-icons/hi";
import { GoSignIn } from "react-icons/go";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import "./Navbar.css";

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const handleLogout = () => {
    isLoggedIn(false)
    logout(); // Panggil fungsi logout dari AuthContext
    navigate("/"); // Arahkan pengguna ke halaman login setelah logout
  };

  return (
    <>
      {location.pathname !== "/" && location.pathname !== "/sign" && (
        <header data-aos="fade-down" data-aos-duration="300" className="sticky">
          {isLoggedIn && (
            <span className="username">Welcome, {username}</span>
          )}

          {location.pathname !== "/home" && (
            <NavLink
              to="/"
              className={`button rounded ${isActive("/")}`}
              onClick={() => window.history.back()}
            >
              <HiReply />
              <span> </span>
              Back
            </NavLink>
          )}

          <NavLink
            data-aos="fade-down"
            data-aos-duration="400"
            to="home"
            className={`button rounded ${isActive("/home")}`}
            onClick={() => handleButtonClick("home")}
          >
            <span
              className={`icon-home ${isActive("/home") ? "" : "inverse"}`}
            ></span>
            <span className={isActive("/home") ? "text-black" : ""}>
              Home
            </span>
          </NavLink>

          <NavLink
            data-aos="fade-down"
            data-aos-duration="500"
            to="about"
            className={`button rounded ${isActive("/about")}`}
            onClick={() => handleButtonClick("about")}
          >
            <span
              className={`icon-info ${isActive("/about") ? "" : "inverse"}`}
            ></span>
            <span className={isActive("/about") ? "text-black" : ""}>
              About
            </span>
          </NavLink>

          <NavLink
            data-aos="fade-down"
            data-aos-duration="700"
            to="create"
            className={`button rounded ${isActive("/create")}`}
            onClick={() => handleButtonClick("create")}
          >
            <span
              className={`icon-upload ${isActive("/create") ? "" : "inverse"}`}
            ></span>
            <span className={isActive("/create") ? "text-black" : ""}>
              Create
            </span>
          </NavLink>
          
          <NavLink
            data-aos="fade-down"
            data-aos-duration="700"
            to="search"
            className={`button rounded ${isActive("/search")}`}
            onClick={() => handleButtonClick("search")}
          >
            <span
              className={`icon-search ${isActive("/search") ? "" : "inverse"}`}
            ></span>
            <span className={isActive("/search") ? "text-black" : ""}>
              Search
            </span>
          </NavLink>
          
          <NavLink
            data-aos="fade-down"
            data-aos-duration="700"
            to="/"
            className={`button rounded ${isActive("/")}`}
            onClick={() => handleButtonClick("/")}
          >
            <span className={isActive("/") ? "text-black" : ""}>
            <GoSignIn />
              Login
            </span>
          </NavLink>

          {isLoggedIn && (
            <button
              data-aos="fade-down"
              data-aos-duration="700"
              to="/"
              className={`button rounded ${isActive("/login")}`}
              onClick={handleLogout}
            >
              <span className={isActive("/") ? "" : ""}>
                <GoSignOut />
                Log Out
              </span>
            </button>
          )}
        </header>
      )}
    </>
  );
};

export default Navbar;