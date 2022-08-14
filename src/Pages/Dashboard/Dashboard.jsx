import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import CustomLink from "../Shared/CustomLink/CustomLink";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="drawer drawer-mobile md:mb-20">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mx-5 md:mx-10">
        <h2 className="text-xl md:text-4xl text-sky-400 uppercase">
          Welcome to <span className="text-black">{user?.displayName}</span>{" "}
          Dashboard
        </h2>
        <Outlet />
      </div>
      <div className="drawer-side md:ml-10">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-52 md:w-auto rounded-lg bg-accent text-base-content">
          <li className="bg-white">
            <CustomLink to={`/dashboard`}>My Profile</CustomLink>
          </li>
          <li className="bg-white">
            <CustomLink to={`/dashboard/review`}>Add a Review</CustomLink>
          </li>
          <li className="bg-white">
            <CustomLink to={`/dashboard/make-admin`}>Make Admin</CustomLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
