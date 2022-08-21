import { signOut } from "firebase/auth";
import React from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const AddChild = () => {
  const aboutChildRef = useRef("");
  const {
    register: childInfo,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const imageStorageKey = `830f12aefec823fea323e5fd7f93c732`;

  const onSubmit = async (data) => {
    // image storage in imgbb website
    const image = data.img[0];
    console.log("Image: ", image);
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgStoreOutput) => {
        console.log(imgStoreOutput);
        if (imgStoreOutput.success) {
          const img = imgStoreOutput.data.url;
          const childInfo = {
            img: img,
            name: data.displayName,
            age: data.age,
            childType: data.childType,
            gender: data.gender,
            religion: data.religion,
            location: data.location,
            agency: data.agency,
            description: aboutChildRef.current.value,
          };

          fetch("http://localhost:5000/childInsert", {
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
              console.log(data);
              if (data?.insertedId) {
                toast.success("Child is added successfully");
                data = "";
              } else {
                toast.error("Failed to add tool");
              }
            });
        }
      });
  };
  return (
    <section>
      <h1 className="md:text-xl font-bold uppercase">Add Child</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Child Image:</span>
              </label>
              <input
                {...childInfo("img", {
                  required: {
                    value: true,
                    message: "Child Image is required",
                  },
                })}
                type="file"
                name="img"
                id=""
              />

              <label className="label">
                {errors.img?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.img?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Child Full Name:</span>
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
                className="input input-bordered w-full max-w-xs"
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
                <span className="label-text">Child Age:</span>
              </label>
              <input
                {...childInfo("age", {
                  required: {
                    value: true,
                    message: "Child Age required",
                  },
                })}
                type="number"
                placeholder="Age"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors.age?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.age?.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Child Type:</span>
              </label>
              <select
                class="select select-bordered w-full max-w-xs"
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
              <label className="label">
                <span className="label-text">Child Gander:</span>
              </label>
              <select
                class="select select-bordered w-full max-w-xs"
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
              <label className="label">
                {errors.gender?.type === "required" && (
                  <span className="label-text-alt text-error">
                    {errors.gender?.message}
                  </span>
                )}
              </label>
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Child Religion:</span>
              </label>
              <select
                class="select select-bordered w-full max-w-xs"
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
              <label className="label">
                <span className="label-text">Child Location:</span>
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
                className="input input-bordered w-full max-w-xs"
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
                <span className="label-text">Agency:</span>
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
                className="input input-bordered w-full max-w-xs"
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

          <div class="form-control">
            <label class="label">
              <span class="label-text">About Child</span>
            </label>
            <textarea
              ref={aboutChildRef}
              class="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </div>

          <input
            className="btn btn-secondary rounded-none"
            type="submit"
            value="Add Child"
          />
        </form>
      </div>
    </section>
  );
};

export default AddChild;
