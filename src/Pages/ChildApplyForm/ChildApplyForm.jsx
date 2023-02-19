import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading/Loading";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";
import { Navigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";

const ChildApplyForm = () => {
  DynamicTitle("Child Application");
  const { id } = useParams();
  const [user] = useAuthState(auth);

  // country api
  const { data: countryAll, isLoading } = useQuery(["countries"], () =>
    fetch(`https://restcountries.com/v3.1/all`).then((res) => res.json())
  );

  // react query
  const { data: child, isLoading2 } = useQuery(["childApplyForm"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/child/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );

  const {
    register: childApplyForm,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const childApplyFormData = {
      email: user?.email,
      data,
      child: child?.data,
    };
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/childApply`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify(childApplyFormData),
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
          toast.success("Your Apply Successfully");
          window.location.reload();
        } else {
          toast.error("Failed to Apply");
        }
      });
  };

  if (isLoading || isLoading2) {
    return <Loading></Loading>;
  }

  return (
    <section className="pt-16">
      <div className=" mb-16">
        <div className="bg-info py-10">
          <h1 className="text-center text-2xl font-bold uppercase text-white">
            Apply Form
          </h1>
          <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
        </div>
        <div className="card w-96 md:w-3/4 bg-base-100 shadow-md mx-auto">
          <div className="card-body">
            <div className="flex items-center space-x-3 justify-center">
              <div className="avatar">
                <div className="mask mask-squircle w-16 h-16">
                  <img src={child?.data?.img} alt={child?.data?.name} />
                </div>
              </div>
              <div>
                <div className="font-bold">{child?.data?.name}</div>
                <div className="text-sm">{child?.data?.location}</div>
                <div className="text-sm">{child?.data?.agency}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  Parent 1 Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="form-control w-full max-w-sm mx-auto ">
                  <label className="label">
                    <span className="label-text">Full Name:</span>
                  </label>
                  <input
                    {...childApplyForm("displayName", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label">
                    {errors.displayName?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto ">
                  <label className="label">
                    <span className="label-text">Gander:</span>
                  </label>
                  <select
                    className="select-bordered input input-sm md:w-96 max-w-lg"
                    {...childApplyForm("gender", {
                      required: {
                        value: true,
                        message: "Gender required",
                      },
                    })}
                  >
                    <option selected>Please select Gender</option>
                    <option value={`Male`}>Male</option>
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

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Citizenship:</span>
                  </label>
                  <select
                    className="select-bordered input input-sm md:w-96 max-w-lg"
                    {...childApplyForm("citizenship", {
                      required: {
                        value: true,
                        message: "Citizenship required",
                      },
                    })}
                  >
                    <option selected>Please select Citizenship</option>
                    {countryAll?.map((country, index) => (
                      <option key={index} value={country?.name?.common}>
                        {country?.name?.common}
                      </option>
                    ))}
                  </select>
                  <label className="label">
                    {errors.citizenship?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.citizenship?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Birth Date:</span>
                  </label>
                  <input
                    {...childApplyForm("birthDate", {
                      required: {
                        value: true,
                        message: "Birth Date is required",
                      },
                    })}
                    type="date"
                    placeholder="Birth Date"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label">
                    {errors.birthDate?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.birthDate?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">NID / Passport Number:</span>
                  </label>
                  <input
                    {...childApplyForm("nidPassport", {
                      required: {
                        value: true,
                        message: "NID / Passport Number is required",
                      },
                      pattern: {
                        value: /1?([1-9])/,
                        message: "Provide a valid NID / Passport Number",
                      },
                    })}
                    type="text"
                    placeholder="NID / Passport Number"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label">
                    {errors.nidPassport?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.nidPassport?.message}
                      </span>
                    )}
                    {errors.nidPassport?.type === "pattern" && (
                      <span className="label-text-alt text-error">
                        {errors.nidPassport?.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  Parent 2 Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Full Name:</span>
                  </label>
                  <input
                    {...childApplyForm("displayName2", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered input-sm md:w-96"
                  />
                  <label className="label">
                    {errors.displayName2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Gander:</span>
                  </label>
                  <select
                    className="select-bordered input input-sm md:w-96 max-w-lg"
                    {...childApplyForm("gender2", {
                      required: {
                        value: true,
                        message: "Gender required",
                      },
                    })}
                  >
                    <option selected>Please select Gender</option>
                    <option value={`Male`}>Male</option>
                    <option value={`Female`}>Female</option>
                    <option value={`Other`}>Other</option>
                  </select>
                  <label className="label">
                    {errors.gender2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.gender2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Citizenship:</span>
                  </label>
                  <select
                    className="select-bordered input input-sm md:w-96 max-w-lg"
                    {...childApplyForm("citizenship2", {
                      required: {
                        value: true,
                        message: "Citizenship required",
                      },
                    })}
                  >
                    <option selected>Please select Citizenship</option>
                    {countryAll?.map((country, index) => (
                      <option key={index} value={country?.name?.common}>
                        {country?.name?.common}
                      </option>
                    ))}
                  </select>
                  <label className="label">
                    {errors.citizenship2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.citizenship2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">Birth Date:</span>
                  </label>
                  <input
                    {...childApplyForm("birthDate2", {
                      required: {
                        value: true,
                        message: "Birth Date is required",
                      },
                    })}
                    type="date"
                    placeholder="Birth Date"
                    className="input input-bordered input-sm md:w-96"
                  />
                  <label className="label">
                    {errors.birthDate2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.birthDate2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label">
                    <span className="label-text">NID / Passport Number:</span>
                  </label>
                  <input
                    {...childApplyForm("nidPassport2", {
                      required: {
                        value: true,
                        message: "NID / Passport Number is required",
                      },
                      pattern: {
                        value: /1?([1-9])/,
                        message: "Provide a valid NID / Passport Number",
                      },
                    })}
                    type="text"
                    placeholder="NID / Passport Number"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label">
                    {errors.nidPassport2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.nidPassport2?.message}
                      </span>
                    )}
                    {errors.nidPassport2?.type === "pattern" && (
                      <span className="label-text-alt text-error">
                        {errors.nidPassport2?.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <div>
                  <h2 className="text-xl md:text-3xl font-bold mb-3">
                    Contact Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("email")}
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("phoneNumber", {
                        required: {
                          value: true,
                          message: "Phone Number is required",
                        },
                        pattern: {
                          value: /1?([1-9])(\d{9})/,
                          message: "Provide a valid Phone Number",
                        },
                      })}
                      type="text"
                      placeholder="Phone Number"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label">
                      {errors.phoneNumber?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.phoneNumber?.message}
                        </span>
                      )}
                      {errors.phoneNumber?.type === "pattern" && (
                        <span className="label-text-alt text-error">
                          {errors.phoneNumber?.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("address", {
                        required: {
                          value: true,
                          message: "Address is required",
                        },
                      })}
                      type="text"
                      placeholder="Address line 1"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label">
                      {errors.address?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.address?.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      type="text"
                      placeholder="Address line 2 optional"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("city", {
                        required: {
                          value: true,
                          message: "City is required",
                        },
                      })}
                      type="text"
                      placeholder="City"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label">
                      {errors.city?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.city?.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("state", {
                        required: {
                          value: true,
                          message: "State is required",
                        },
                      })}
                      type="text"
                      placeholder="State"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label">
                      {errors.state?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.state?.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("zipCode", {
                        required: {
                          value: true,
                          message: "Zip code is required",
                        },
                        pattern: {
                          value: /1?([1-9])(\d{3})/,
                          message: "Provide a valid Zip Code",
                        },
                      })}
                      type="text"
                      placeholder="Zip code"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label">
                      {errors.zipCode?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.zipCode?.message}
                        </span>
                      )}
                      {errors.zipCode?.type === "pattern" && (
                        <span className="label-text-alt text-error">
                          {errors.zipCode?.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <select
                      className="select-bordered input input-sm md:w-96 max-w-lg"
                      {...childApplyForm("country", {
                        required: {
                          value: true,
                          message: "country required",
                        },
                      })}
                    >
                      <option selected placeholder="Country">
                        Country Name
                      </option>
                      {countryAll?.map((country, index) => (
                        <option key={index} value={country?.name?.common}>
                          {country?.name?.common}
                        </option>
                      ))}
                    </select>
                    <label className="label">
                      {errors.country?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.country?.message}
                        </span>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="">
                <input
                  className="btn btn-info rounded-none sm:w-full mx-auto text-white"
                  type="submit"
                  value="Apply Now"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildApplyForm;
