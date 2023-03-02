import { signOut } from "firebase/auth";
import React from "react";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../firebase.init";

const EditMyProfile = ({ user, userData }) => {
  const [updateProfile] = useUpdateProfile(auth);
  const { displayName, photoURL } = user;

  const {
    register: userProfile,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const imageStorageKey = `830f12aefec823fea323e5fd7f93c732`;
  const onSubmit = async (data) => {
    await updateProfile({
      displayName: data.displayName,
      address: data.address,
      zipCode: data.zipCode,
      phone: data.phone,
    });
    const image =
      data?.img[0] || photoURL || `https://i.ibb.co/tmprR1w/profile-icon.webp`;
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageStoreOutput) => {
        if (imageStoreOutput?.success) {
          const img = imageStoreOutput?.data?.url;
          const usrProfileUpdateInfo = {
            img: img,
            displayName: data.displayName,
            email: userData.email,
            address: data.address,
            zipCode: data.zipCode,
            phone: data.phone,
          };

          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/user/${userData?.email}`,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
              body: JSON.stringify(usrProfileUpdateInfo),
            }
          )
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem("access-token");
                Navigate("/login");
              }
              return res.json();
            })
            .then((data) => {
              if (data?.data?.user?.acknowledged) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: `Update profile Done`,
                  showConfirmButton: false,
                  timer: 1500,
                });
                window.location.reload();
              } else {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: `Failed to update profile`,
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };

  return (
    <div className=" card bg-base-100 shadow-md pb-16">
      <div className="card-body">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-2"
        >
          <div className="flex justify-center items-center">
            <div>
              <div className="avatar">
                <div className="w-32 rounded-full">
                  <img
                    width={150}
                    src={
                      photoURL
                        ? userData?.img || photoURL
                        : `https://i.ibb.co/tmprR1w/profile-icon.webp`
                    }
                    alt={displayName}
                  />
                </div>
              </div>
              <br />
              <div className="form-control w-full max-w-xs mt-0">
                <div className="flex items-center ml-3">
                  <div className="flex items-center">
                    <label className="block">
                      <span className="sr-only">Upload Photo</span>
                      <input
                        {...userProfile("img")}
                        type="file"
                        name="img"
                        id="childImage"
                        className="btn border-none w-32 mt-5 block text-sm text-slate-500 btn-sm
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold   
    "
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
              <div className="form-control w-full max-w-xs">
                <label className="label">Full Name:</label>
                <input
                  {...userProfile("displayName", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                  type="text"
                  placeholder="Full Name"
                  defaultValue={displayName}
                  className="input input-bordered input-sm md:w-52 lg:w-64 max-w-xs"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span>
                    Email:{" "}
                    <span className="text-sm text-[#D8DBE0] font-semibold">
                      (Email Address cannot be changed)
                    </span>
                  </span>
                </label>
                <input
                  // {...userProfile("email")}
                  type="email"
                  defaultValue={userData?.email}
                  disabled
                  className="input input-bordered  input-sm md:w-52 lg:w-64 max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">Address:</label>
                <input
                  {...userProfile("address", {
                    required: {
                      value: true,
                      message: "Address is required",
                    },
                  })}
                  type="text"
                  placeholder="Address"
                  defaultValue={userData?.address}
                  className="input input-bordered  input-sm md:w-52 lg:w-64 max-w-xs"
                />
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.address?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">Zip Code:</label>
                <input
                  {...userProfile("zipCode", {
                    pattern: {
                      value: /1?([1-9])(\d{3})/,
                      message: "Provide a valid Zip Code",
                    },
                  })}
                  type="text"
                  placeholder="Zip Code"
                  defaultValue={userData?.zipCode}
                  className="input input-bordered input-sm md:w-52 lg:w-64 max-w-xs"
                />
                <label className="label">
                  {errors.zipCode?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.zipCode?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">Phone:</label>
                <input
                  {...userProfile("phone", {
                    pattern: {
                      value: /1?([1-9])(\d{9})/,
                      message: "Provide a valid Phone Number",
                    },
                  })}
                  type="text"
                  placeholder="Phone Number"
                  defaultValue={userData?.phone}
                  className="input input-bordered input-sm md:w-52 lg:w-64 max-w-xs"
                />
                <label className="label">
                  {errors.phone?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.phone?.message}
                    </span>
                  )}
                </label>

                <input
                  className="mt-3 btn btn-sm border-none bg-primary text-white font-bold md:w-52"
                  type="submit"
                  value="Save Change"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMyProfile;
