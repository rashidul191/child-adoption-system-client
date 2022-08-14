import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase.init";
import CustomLink from "../CustomLink/CustomLink";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("access-token");
  };
  const menubar = (
    <>
      <li>
        <CustomLink to="/">Home</CustomLink>
      </li>

      <li>
        <CustomLink to="/about">About</CustomLink>
      </li>

      <li>
        <CustomLink to="/blog">Blog</CustomLink>
      </li>

      <li>
        <CustomLink to="/contact-us">Contact Us</CustomLink>
      </li>

      {user ? (
        <>
          <li>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
          </li>
          <li>
            <button className="btn btn-error text-white" onClick={logout}>
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <CustomLink to="/login">Login</CustomLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menubar}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            child-Adoption-System
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">{menubar}</ul>
        </div>

        {/* Dashboard Drawer Menu */}
        {user && (
          <div className="navbar-end lg:hidden">
            <label
              htmlFor="dashboard-drawer"
              tabIndex="1"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
