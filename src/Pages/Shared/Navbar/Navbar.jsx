import React from "react";
import { Link } from "react-router-dom";
import CustomLink from "../CustomLink/CustomLink";

const Navbar = () => {
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
      <li>
        <CustomLink to="/login">Login</CustomLink>
      </li>
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
      </div>
    </div>
  );
};

export default Navbar;
