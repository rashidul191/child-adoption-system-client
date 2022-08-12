import React from "react";
import { Outlet } from "react-router-dom";
import CustomLink from "../Shared/CustomLink/CustomLink";

const Dashboard = () => {
  return (
    <div class="drawer drawer-mobile">
      <input id="dashboard-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ml-5 md:ml-10">
        {/* <!-- Page content here --> */}
        <h2 className="text-4xl text-sky-400">Welcome to Dashboard</h2>
        <Outlet />      

      </div>
      <div class="drawer-side">
        <label for="dashboard-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-72 bg-accent text-base-content">
          {/* <!-- Sidebar content here --> */}
          <li className="bg-white">
            <CustomLink to={`/dashboard`} >My Profile</CustomLink>
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
