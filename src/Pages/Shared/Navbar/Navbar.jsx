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
      <CustomLink to="/">
        <li>
          <span>Home</span>
        </li>
      </CustomLink>

      <CustomLink to="/about">
        <li>
          <span>About</span>
        </li>
      </CustomLink>

      <CustomLink to="/all-blogs">
        <li>
          <span>Blogs</span>
        </li>
      </CustomLink>

      <CustomLink to="/contact-us">
        {" "}
        <li>
          <span>Contact Us</span>
        </li>
      </CustomLink>

      <CustomLink to="/donation">
        <li>
          <span>Donate</span>
        </li>
      </CustomLink>

      {!user && (
        <CustomLink className="btn btn-primary" to="/login">
          <li>
            <span>Login</span>
          </li>
        </CustomLink>
      )}
    </>
  );
  return (
    <section>
      <div className="navbar bg-white border-b-2 border-black fixed z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menubar}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            child-Adoption-System
          </Link>
        </div>
        <div
          className={`${!user ? "navbar-end" : "navbar-center"} hidden lg:flex`}
        >
          <ul className="menu menu-horizontal p-0">{menubar}</ul>
        </div>
        <div className={`${user && "navbar-end md:mr-5"}`}>
          {user && (
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL
                          ? user?.photoURL
                          : `https://i.ibb.co/tmprR1w/profile-icon.webp`
                      }
                      alt={user?.displayName}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <CustomLink to="/dashboard">
                    <li>
                      <span>Dashboard</span>
                    </li>
                  </CustomLink>

                  {/* <li>
                    <a>Settings</a>
                  </li> */}
                  <li>
                    <button
                      className="btn btn-error btn-sm text-white mt-3"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
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
      {/* </div> */}
    </section>
  );
};

export default Navbar;
