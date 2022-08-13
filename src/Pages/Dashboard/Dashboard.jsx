import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import CustomLink from "../Shared/CustomLink/CustomLink";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  return (
    <div class="drawer drawer-mobile md:mb-20">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content mx-5 md:mx-10">
        <h2 className="text-xl md:text-4xl text-sky-400 uppercase">
          Welcome to <span className="text-black">{user?.displayName}</span>{" "}
          Dashboard
        </h2>
        <Outlet />
      </div>
      <div class="drawer-side md:ml-10">
        <label for="dashboard-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-52 md:w-auto rounded-lg bg-accent text-base-content">
          <li className="bg-white">
            <CustomLink to={`/dashboard`}>My Profile</CustomLink>
          </li>
          <li className="bg-white">
            <CustomLink to={`/dashboard/review`}>Add a Review</CustomLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
