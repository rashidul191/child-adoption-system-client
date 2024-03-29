import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import auth from "../../../firebase.init";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const AddChild = () => {
  DynamicTitle("Add Child");
  const addChildYear = new Date().getFullYear();
  const navigate = useNavigate();
  const aboutChildRef = useRef("");
  const {
    register: childInfo,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = `830f12aefec823fea323e5fd7f93c732`;

  const onSubmit = (data) => {
    // image storage in imgbb website
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgStoreOutput) => {
        if (imgStoreOutput.success) {
          const img = imgStoreOutput.data.url;
          const childInfo = {
            addChildYear,
            img: img,
            name: data.displayName,
            ageYear: data.ageYear,
            ageMonth: data.ageMonth,
            childType: data.childType,
            gender: data.gender,
            religion: data.religion,
            location: data.location,
            city: data.city,
            disabilities: data.disabilities,
            agency: data.agency,
            description: aboutChildRef.current.value,
          };

          fetch(
            "https://child-adoption-system-server.onrender.com/api/v1/child",
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
              body: JSON.stringify(childInfo),
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
              if (data?.data?.insertedId) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Child Added Done",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard/child-manage");
                window.location.reload();
              } else {
                Swal.fire({
                  position: "top-center",
                  icon: "error",
                  title: "Failed to add child",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
  };
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Add Child</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 ">
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label font-bold" htmlFor="childImage">
              Child Image*:
            </label>
            <div className="flex items-center">
              <div className="flex items-center space-x-6">
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    {...childInfo("img", {
                      required: {
                        value: true,
                        message: "Child Image is required",
                      },
                    })}
                    type="file"
                    name="img"
                    id="childImage"
                    className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                  />
                </label>
              </div>
            </div>

            <label className="label">
              {errors.img?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.img?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs mt-0">
            <label className="label font-bold" htmlFor="childFullName">
              Child Full Name*:
            </label>
            <input
              {...childInfo("displayName", {
                required: {
                  value: true,
                  message: "Child Full Name is required",
                },
              })}
              type="text"
              placeholder="Full Name"
              id="childFullName"
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
            <div className="grid grid-cols-2 gap-x-2">
              <div>
                <label className="label font-bold" htmlFor="childAgeYear">
                  Child Age *: Year
                </label>
                <input
                  {...childInfo("ageYear", {
                    required: {
                      message: "Child age year required",
                    },
                    pattern: {
                      value: /^[0-9]{1,100}$/,
                      message: "Provide a valid age year",
                    },
                  })}
                  defaultValue={0}
                  type="text"
                  placeholder="Year"
                  id="childAgeYear"
                  className="input input-bordered input-sm w-36 max-w-xs"
                />
                {errors.ageYear?.type === "pattern" && (
                  <span className="label-text-alt text-error">
                    {errors.ageYear?.message}
                  </span>
                )}
              </div>
              <div>
                <label className="label font-bold" htmlFor="childAgeMonth">
                  Month
                </label>
                <input
                  {...childInfo("ageMonth", {
                    pattern: {
                      value: /^[0-9]{1,100}$/,
                      message: "Provide a valid age month",
                    },
                  })}
                  type="text"
                  defaultValue={0}
                  placeholder="Month"
                  id="childAgeMonth"
                  className="input input-bordered input-sm w-36 max-w-xs"
                />
                {errors.ageMonth?.type === "pattern" && (
                  <span className="label-text-alt text-error">
                    {errors.ageMonth?.message}
                  </span>
                )}
              </div>
            </div>
            <label className="label font-bold">
              {errors.ageYear?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.ageYear?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="childType">
              Child Type*:
            </label>

            <select
              id="childType"
              className="select-bordered input input-sm md:w-96 max-w-xs"
              {...childInfo("childType", {
                required: {
                  value: true,
                  message: "Child Type required",
                },
              })}
            >
              <option selected value={`Infant-Child`}>
                Infant Child
              </option>
              <option value={`Foster-Care-Child`}>Foster Care Child</option>
              <option value={`Street-Child`}>Street Child</option>
            </select>
            <label className="label">
              {errors.childType?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.childType?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="childGander">
              Child Gander*:
            </label>
            <select
              id="childGander"
              className="select-bordered input input-sm md:w-96 max-w-xs"
              {...childInfo("gender", {
                required: {
                  value: true,
                  message: "Child Gender required",
                },
              })}
            >
              <option selected value={`Male`}>
                Male
              </option>
              <option value={`Female`}>Female</option>
              <option value={`Other`}>Other</option>
            </select>
            <label className="label font-bold">
              {errors.gender?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.gender?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="childReligion">
              Child Religion*:
            </label>
            <select
              id="childReligion"
              className="select-bordered input input-sm md:w-96 max-w-xs"
              {...childInfo("religion", {
                required: {
                  value: true,
                  message: "Child Religion required",
                },
              })}
            >
              <option selected value={`Islam`}>
                Islam
              </option>
              <option value={`Hindu`}>Hindu</option>
              <option value={`Buddha`}>Buddha</option>
              <option value={`Other`}>Other</option>
            </select>
            <label className="label">
              {errors.religion?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.religion?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="childLocation">
              Child Location*:
            </label>
            <input
              {...childInfo("location", {
                required: {
                  value: true,
                  message: "Child Location is required",
                },
              })}
              type="text"
              placeholder="Location"
              id="childLocation"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.location?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.location?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="city">
              City*:
            </label>
            <input
              {...childInfo("city", {
                required: {
                  value: true,
                  message: "City is required",
                },
              })}
              type="text"
              placeholder="City"
              id="city"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.city?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.city?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="disabilities">
              Disabilities*:
            </label>
            <select
              id="disabilities"
              className="select-bordered input input-sm md:w-96 max-w-xs"
              {...childInfo("disabilities", {
                required: {
                  value: true,
                  message: "Disabilities required",
                },
              })}
            >
              <option selected value={`No`}>
                No
              </option>
              <option value={`Yes`}>Yes</option>
            </select>
            <label className="label">
              {errors.disabilities?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.disabilities?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label font-bold" htmlFor="agencyName">
              Agency Name*:
            </label>
            <input
              {...childInfo("agency", {
                required: {
                  value: true,
                  message: "Agency info is required",
                },
              })}
              type="text"
              placeholder="Agency Information"
              id="agencyName"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.agency?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.agency?.message}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="form-control">
          <label className="label font-bold" htmlFor="aboutChild">
            About Child:
          </label>
          <textarea
            ref={aboutChildRef}
            className="textarea textarea-bordered h-40 w-80 md:w-10/12"
            placeholder="About Description"
            id="aboutChild"
          ></textarea>
        </div>

        <input
          className="btn btn-primary text-white w-80 md:md:w-96 rounded-none mt-3 mb-10 font-bold"
          type="submit"
          value="Add Child"
        />
      </form>
    </section>
  );
};

export default AddChild;
