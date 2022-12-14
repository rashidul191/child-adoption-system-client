import React from "react";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import EditMyProfile from "./EditMyProfile";
import { useState } from "react";
import useAdmin from "../../../hooks/useAdmin";
import useEmployer from "../../../hooks/useEmployer";

const MyProfile = () => {
  DynamicTitle("My Profile");

  const [profileEdit, setProfileEdit] = useState(true);
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  const [employer] = useEmployer(user);
  const { displayName, email, photoURL } = user;
  const { data, isLoading } = useQuery(["userDB"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/user?email=${email}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => {
      if (res.status === 401 || res.status === 403) {
        signOut(auth);
        localStorage.removeItem("access-token");
        Navigate("/login");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <h2 className="text-xl md:text-4xl text-sky-400 uppercase">
        Welcome to{" "}
        <span className="text-black">
          {user?.displayName}{" "}
          <span className="text-green-500">
            {admin && "(Admin)"} {employer && "(Employer)"}
          </span>
        </span>
      </h2>
      <div className="flex justify-between">
        <h1 className=" md:text-xl font-bold uppercase">My Profile</h1>
        <button
          onClick={() => setProfileEdit(!profileEdit)}
          className="text-[#FF428D] underline"
        >
          <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          Edit
        </button>
      </div>
      <hr />

      <div
        className={`${
          profileEdit || "hidden"
        }  grid grid-cols-1 md:grid-cols-3 card bg-base-100 shadow-md pb-16`}
      >
        <div className="flex justify-center items-center col-span-1">
          <div>
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  width={150}
                  src={
                    photoURL
                      ? photoURL
                      : `https://i.ibb.co/tmprR1w/profile-icon.webp`
                  }
                  alt={displayName}
                />
              </div>
            </div>
            <br />
            <button
              onClick={() => setProfileEdit(!profileEdit)}
              className="btn bg-[#FF428D] border-none text-white"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="card-body col-span-2">
          <span>Name:</span>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <span>Email:</span>
          <h2 className="text-xl font-bold"> {data?.email}</h2>
          <span>Address:</span>
          <h2 className="text-xl font-bold"> {data.address}</h2>
          <span>Zip Code:</span>
          <h2 className="text-xl font-bold"> {data.zip}</h2>
          <span>Phone:</span>
          <h2 className="text-xl font-bold"> {data.phone}</h2>
        </div>
      </div>

      <div className={`${profileEdit && "hidden"}`}>
        <EditMyProfile user={user} data={data}></EditMyProfile>
      </div>
    </section>
  );
};

export default MyProfile;
