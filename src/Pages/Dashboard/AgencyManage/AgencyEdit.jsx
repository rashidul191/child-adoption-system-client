import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import Swal from "sweetalert2";

const AgencyEdit = () => {
  DynamicTitle("Edit Agency Info");
  const { id } = useParams();
  const navigate = useNavigate();
  const aboutAgencyRef = useRef("");
  const {
    register: agencyInfo,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    data: agencyWithId,
    isLoading,
    // refetch,
  } = useQuery(["agencyWithId"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/agency/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

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
          const agencyInfo = {
            agencyImg: img,
            agencyName: data.agencyName,
            agencyLocation: data.location,
            agencyDirectorName: data.directorName,
            description: aboutAgencyRef.current.value,
          };

          fetch(
            `https://child-adoption-system-server.onrender.com/api/v1/agency/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
              },
              body: JSON.stringify(agencyInfo),
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
              if (data?.data?.modifiedCount) {
                Swal.fire({
                  position: "top-center",
                  icon: "success",
                  title: "Update Agency Info Done",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/dashboard/agency-manage");
                window.location.reload();
              } else if (!data?.data?.modifiedCount) {
                Swal.fire({
                  position: "top-center",
                  icon: "info",
                  title: "Already Update Agency Info",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } else {
                Swal.fire({
                  position: "top-center",
                  icon: "error",
                  title: "Failed to Update Agency Info",
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
      <h1 className="md:text-xl font-bold uppercase">Edit Agency</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="form-control w-full max-w-xs mt-0">
            <label className="label font-bold">Agency Image*:</label>
            <div className="flex items-center">
              <div className="flex items-center space-x-6">
                <label className="block">
                  <span className="sr-only">Choose photo</span>
                  <input
                    {...agencyInfo("img", {
                      required: {
                        value: true,
                        message: "Agency Image is required",
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
            <label className="label font-bold">Agency Full Name*:</label>
            <input
              {...agencyInfo("agencyName", {
                required: {
                  value: true,
                  message: "Agency Full Name is required",
                },
              })}
              type="text"
              placeholder="Agency Full Name"
              defaultValue={agencyWithId?.data?.agencyName}
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
            <label className="label font-bold">Agency Location*:</label>
            <input
              {...agencyInfo("location", {
                required: {
                  value: true,
                  message: "Agency Location is required",
                },
              })}
              type="text"
              placeholder="Agency Location"
              defaultValue={agencyWithId?.data?.agencyLocation}
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
            <label className="label font-bold">Agency Director Name*:</label>
            <input
              {...agencyInfo("directorName", {
                required: {
                  value: true,
                  message: "Agency Director Name is required",
                },
              })}
              type="text"
              placeholder="Agency Director Full Name"
              defaultValue={agencyWithId?.data?.agencyDirectorName}
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
          <label className="label font-bold">About Agency:</label>
          <textarea
            ref={aboutAgencyRef}
            className="textarea textarea-bordered h-24 w-80 md:w-5/6"
            placeholder="About Agency Here"
            defaultValue={agencyWithId?.data?.description}
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

export default AgencyEdit;
