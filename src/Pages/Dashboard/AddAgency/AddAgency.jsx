import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import auth from "../../../firebase.init";
import { toast } from "react-toastify";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const AddAgency = () => {
  DynamicTitle("Add Agency");
  const aboutAgencyRef = useRef("");
  const {
    register: agencyInfo,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = `830f12aefec823fea323e5fd7f93c732`;

  const onSubmit = async (data) => {
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
            agencyImg: img,
            agencyName: data.agencyName,
            agencyLocation: data.location,
            agencyDirectorName: data.directorName,
            description: aboutAgencyRef.current.value,
          };

          fetch("https://child-adoption-system-server.onrender.com/agency", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
            body: JSON.stringify(childInfo),
          })
            .then((res) => {
              if (res.status === 401 || res.status === 403) {
                signOut(auth);
                localStorage.removeItem("access-token");
                Navigate("/login");
              }
              return res.json();
            })
            .then((data) => {
              if (data?.insertedId) {
                toast.success("Agency information added successfully");
                window.location.reload();
              } else {
                toast.error("Failed to add Agency Information");
              }
            });
        }
      });
  };
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Add Agency</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label">
              <span className="label-text">Agency Image:</span>
            </label>
            <div className="flex items-center">
              <label className="w-full  px-4 py-3 bg-white text-blue rounded-lg tracking-wide uppercase border border-blue-100 cursor-pointer hover:bg-blue-500 hover:text-white">
                <FontAwesomeIcon
                  className="text-xl mr-4"
                  icon={faCloudUpload}
                ></FontAwesomeIcon>
                <span className="mt-2 text-base leading-normal">Upload</span>
                <input
                  {...agencyInfo("img", {
                    required: {
                      value: true,
                    },
                  })}
                  type="file"
                  name="img"
                  id=""
                  className="hidden"
                />
              </label>
            </div>
          </div>
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label">
              <span className="label-text">Agency Full Name:</span>
            </label>
            <input
              {...agencyInfo("agencyName", {
                required: {
                  value: true,
                  message: "Agency Full Name is required",
                },
              })}
              type="text"
              placeholder="Agency Full Name"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.agencyName?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.agencyName?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Agency Location:</span>
            </label>
            <input
              {...agencyInfo("currentDate", {
                required: {
                  value: true,
                  message: "Agency Location is required",
                },
              })}
              type="text"
              placeholder="Agency Location"
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
            <label className="label">
              <span className="label-text">Agency Director Name:</span>
            </label>
            <input
              {...agencyInfo("directorName", {
                required: {
                  value: true,
                  message: "Agency Location is required",
                },
              })}
              type="text"
              placeholder="Agency Director Full Name"
              className="input input-bordered input-sm md:w-96 max-w-xs"
            />
            <label className="label">
              {errors.directorName?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.directorName?.message}
                </span>
              )}
            </label>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">About Agency:</span>
          </label>
          <textarea
            ref={aboutAgencyRef}
            className="textarea textarea-bordered h-24 w-80 md:w-5/6"
            placeholder="About Agency Here"
          ></textarea>
        </div>

        <input
          className="btn btn-primary text-white w-80 md:w-96 rounded-none mt-3"
          type="submit"
          value="Add Agency"
        />
      </form>
    </section>
  );
};

export default AddAgency;
