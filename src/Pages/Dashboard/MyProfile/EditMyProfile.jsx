import React from "react";
import { useForm } from "react-hook-form";

const EditMyProfile = ({ user, data }) => {
  const { displayName, photoURL, phone, address, zip } = user;

  const {
    register: userProfile,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 card bg-base-100 shadow-md pb-16">
      <div className="flex justify-center ">
        <div>
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img
                width={120}
                src={
                  photoURL
                    ? photoURL
                    : `https://i.ibb.co/tmprR1w/profile-icon.webp`
                }
                alt={displayName}
              />
            </div>
          </div>

          <div className="form-control w-full max-w-xs mt-0">
            <div className="flex items-center">
              <div className="flex items-center space-x-6">
                <label className="block">
                  <span className="sr-only">Upload Photo</span>
                  <input
                    {...userProfile("img")}
                    type="file"
                    name="img"
                    id="childImage"
                    className="btn border-none bg-[#FF428D] w-32 mt-5 block text-sm text-slate-500 btn-sm
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
        <div className="card-body">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid  grid-cols-1 sm:grid-cols-2 gap-2"
          >
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
                className="input input-bordered input-sm md:w-96 max-w-xs"
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
                {...userProfile("email")}
                type="email"
                value={data?.email}
                disabled
                className="input input-bordered  input-sm md:w-96 max-w-xs"
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
                defaultValue={address}
                className="input input-bordered  input-sm md:w-96 max-w-xs"
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
                  required: {
                    value: true,
                    message: "Zip Code is required",
                  },
                })}
                type="text"
                placeholder="Zip Code"
                defaultValue={zip}
                className="input input-bordered input-sm md:w-96 max-w-xs"
              />
              <label className="label">
                {errors.phone?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.phone?.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">Phone:</label>
              <input
                {...userProfile("phone", {
                  required: {
                    value: true,
                    message: "Full Name is required",
                  },
                })}
                type="text"
                placeholder="Phone Number"
                defaultValue={phone}
                className="input input-bordered  input-sm md:w-96 max-w-xs"
              />
              <label className="label">
                {errors.phone?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.phone?.message}
                  </span>
                )}
              </label>

              <input
                className="btn border-none bg-[#FF428D] text-white btn-sm md:w-52"
                type="submit"
                value="Save Change"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMyProfile;
