import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import CustomLink from "../CustomLink/CustomLink";
import logo from "../../../images/logo.png";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { data: userInfo } = useQuery(["userDB"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/user/email/?email=${user?.email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => res.json())
  );

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("access-token");
    navigate("/");
  };

  const menubar = (
    <>
      <CustomLink className="font-bold text-teal-600 " to="/">
        <li>
          <span>Home</span>
        </li>
      </CustomLink>
      <CustomLink className="font-bold text-teal-600 " to="/child-types">
        <li>
          <span>Child Types</span>
        </li>
      </CustomLink>

      <CustomLink className="font-bold text-teal-600 " to="/all-agency">
        <li>
          <span>Agency</span>
        </li>
      </CustomLink>

      <CustomLink className="font-bold text-teal-600 " to="/all-blogs">
        <li>
          <span>Blogs</span>
        </li>
      </CustomLink>

      <CustomLink className="font-bold text-teal-600 " to="/about">
        <li>
          <span>About Us</span>
        </li>
      </CustomLink>

      <CustomLink className="font-bold text-teal-600  " to="/contact-us">
        {" "}
        <li>
          <span>Contact Us</span>
        </li>
      </CustomLink>

      <CustomLink className="font-bold text-teal-600 " to="/donation">
        <li>
          <span>Donate</span>
        </li>
      </CustomLink>

      {!user && (
        <CustomLink
          className="btn btn-success btn-md font-bold text-white"
          to="/login"
        >
          <li>
            <span>Login</span>
          </li>
        </CustomLink>
      )}
    </>
  );
  return (
    <section>
      <div className="navbar bg-white border-b-2 border-black md:fixed md:z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden pl-0">
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
              className="menu menu-compact dropdown-content mt-3 m-2 shadow bg-base-100 rounded-box w-52 "
            >
              {menubar}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl btn-sm sm:px-5 font-bold hover:bg-white"
          >
            <img className="w-[44px]" src={logo} alt="" />
            Ador
          </Link>
        </div>
        <div className={`navbar-center hidden lg:flex`}>
          <ul className="menu menu-horizontal p-0">{menubar}</ul>
        </div>
        <div className={`${user && "navbar-end "}`}>
          {user && (
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar pr-0"
                >
                  <div className="w-10 rounded-full">
                    <img
                      src={
                        user?.photoURL
                          ? userInfo?.data?.img || user?.photoURL
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
                  <CustomLink className="font-bold" to="/dashboard">
                    <li>
                      <span>Dashboard</span>
                    </li>
                  </CustomLink>

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
            className="btn btn-ghost lg:hidden pl-2"
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
    </section>
  );
};

export default Navbar;
