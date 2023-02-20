import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../hooks/useAdmin";
import useEmployer from "../../hooks/useEmployer";
import CustomLink from "../Shared/CustomLink/CustomLink";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [employer] = useEmployer(user);

  return (
    <section className="md:pt-10 lg:pt-20">
      <div className="drawer drawer-mobile md:mb-20">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content mx-5 md:mx-10">
          <Outlet />
        </div>
        <div className="drawer-side md:ml-10">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-52 md:w-auto rounded-lg bg-accent text-base-content">
            <li className="bg-white">
              <CustomLink className="font-bold text-teal-600" to={`/dashboard`}>
                My Profile
              </CustomLink>
            </li>

            {!admin && !employer && (
              <>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/review`}
                  >
                    Add Review
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/check-eligibility`}
                  >
                    Check Eligibility
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/eligibility-score`}
                  >
                    Eligibility Score
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/you-application`}
                  >
                    Your Application
                  </CustomLink>
                </li>
              </>
            )}

            {(admin || employer) && (
              <>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/application`}
                  >
                    All Application
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/add-child`}
                  >
                    Add Child
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/child-manage`}
                  >
                    Child Manage
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/add-agency`}
                  >
                    Add Agency
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/agency-manage`}
                  >
                    Agency Manage
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/post-a-blog`}
                  >
                    Post A Blog
                  </CustomLink>
                </li>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/blogs-manage`}
                  >
                    Blog Manage
                  </CustomLink>
                </li>

                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/all-donation`}
                  >
                    All Donation{" "}
                  </CustomLink>
                </li>
              </>
            )}

            {admin && (
              <>
                <li className="bg-white">
                  <CustomLink
                    className="font-bold text-teal-600"
                    to={`/dashboard/user-manage`}
                  >
                    User Manage{" "}
                  </CustomLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
