import React from "react";
import {} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const { displayName, img, email, phone, address, zip } = user;
  return (
    <div>
      <div className="flex justify-between">
        <h1 className=" md:text-xl font-bold uppercase">My Profile</h1>
        <button className="text-error underline">
          <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          Edit
        </button>
      </div>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 card bg-base-100 shadow-xl ">
        <div className="flex justify-center ">
          <div>
            <img
              width={120}
              src={img ? img : `https://i.ibb.co/tmprR1w/profile-icon.webp`}
              alt={displayName}
            />
            <button className="btn btn-error text-white mt-5">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="card-body">
          <span>Name:</span>
          <h2 className="text-xl font-bold">{displayName}</h2>
          <span>Email:</span>
          <h2 className="text-xl font-bold"> {email}</h2>
          <span>Address:</span>
          <h2 className="text-xl font-bold"> {address}</h2>
          <span>Zip Code:</span>
          <h2 className="text-xl font-bold"> {zip}</h2>
          <span>Phone:</span>
          <h2 className="text-xl font-bold"> {phone}</h2>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default MyProfile;
