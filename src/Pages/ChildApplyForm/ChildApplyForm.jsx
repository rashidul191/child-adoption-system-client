import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading/Loading";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
import { format } from "date-fns";

const ChildApplyForm = () => {
  DynamicTitle("Child Application");
  const applicationDate = format(new Date(), "PP");
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const { id } = useParams();
  const [user] = useAuthState(auth);

  // country api
  const { data: countryAll, isLoading } = useQuery(["countries"], () =>
    fetch(`https://restcountries.com/v3.1/all`).then((res) => res.json())
  );

  // react query, child information here
  const { data: child, isLoading2 } = useQuery(["childApplyForm"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/child/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );

  // react query, user eligibility score result here
  const { data: eligibilityScore, isLoading3 } = useQuery(
    ["eligibilityScore"],
    () =>
      fetch(
        `https://child-adoption-system-server.onrender.com/api/v1/checkEligibility/?email=${user?.email}`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      ).then((res) => res.json())
  );

  // console.log(eligibilityScore?.data[0]?.allowValue.length * 10);

  const {
    register: childApplyForm,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const childApplyFormData = {
      email: user?.email,
      applicationDate,
      data,
      child: child?.data,
      eligibilityScore:eligibilityScore?.data[0]
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
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your application Done",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/you-application");
          window.location.reload();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Failed application!!!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  if (isLoading || isLoading2 || isLoading3) {
    return <Loading></Loading>;
  }

  return (
    <section className="md:pt-16">
      <div className=" mb-16">
        <div className="bg-info py-10">
          <h1 className="text-center md:text-2xl font-bold uppercase text-white">
            Adoption Application Form
          </h1>
          <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
        </div>
        <div className="card w-96 md:w-3/4 bg-base-100 shadow-sm mx-auto">
          <div className="card-body">
            <div
              className={`${
                eligibilityScore?.data[0] && "grid grid-cols-2 mx-auto"
              }`}
            >
              {/* child info start */}
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
              {/* child info end */}
              {/* user eligibility score start */}
              {eligibilityScore?.data[0] && (
                <div className="text-center font-bold">
                  <h2>Eligible score is: </h2>
                  <p className="text-success">
                    Yes: {eligibilityScore?.data[0]?.allowValue.length * 10} %
                  </p>
                  <p className="text-error">
                    No: {eligibilityScore?.data[0]?.notAllowValue.length * 10} %
                  </p>
                </div>
              )}
              {/* user eligibility score end */}
            </div>

            {/* child info end */}
            {/* Parent  and Contact info form start */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <h2 className="text-xl md:text-3xl font-bold">
                  Parent 1 Information
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                <div className="form-control w-full max-w-sm mx-auto ">
                  <label className="label font-bold">Full Name:</label>
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
                  <label className="label font-bold">
                    {errors.displayName?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto ">
                  <label className="label font-bold">Gander:</label>
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
                  </select>
                  <label className="label font-bold">
                    {errors.gender?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.gender?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Citizenship:</label>
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
                  <label className="label font-bold">
                    {errors.citizenship?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.citizenship?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Birth Date:</label>
                  <input
                    {...childApplyForm("birthDate", {
                      required: {
                        value: true,
                        message: "Birth Date is required",
                      },
                    })}
                    type="date"
                    placeholder="Birth Date"
                    className="input input-bordered input-sm md:w-96"
                    min="1950-01-01"
                    max={`${currentYear - 18}-12-31`}
                  />
                  <label className="label font-bold">
                    {errors.birthDate?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.birthDate?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">NID Number:</label>
                  <input
                    {...childApplyForm("nidPassport", {
                      required: {
                        value: true,
                        message: "NID Number is required",
                      },
                      pattern: {
                        // value: /1?([1-9])/,
                        value: /^\d{10,16}$/,
                        message: "Provide a valid NID Number",
                      },
                    })}
                    type="text"
                    placeholder="NID Number"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label font-bold">
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
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Full Name:</label>
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
                  <label className="label font-bold">
                    {errors.displayName2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Gander:</label>
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
                  </select>
                  <label className="label font-bold">
                    {errors.gender2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.gender2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Citizenship:</label>
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
                  <label className="label font-bold">
                    {errors.citizenship2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.citizenship2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">Birth Date:</label>
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
                    min="1950-01-01"
                    max={`${currentYear - 18}-12-31`}
                  />
                  <label className="label font-bold">
                    {errors.birthDate2?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.birthDate2?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-sm mx-auto">
                  <label className="label font-bold">NID Number:</label>
                  <input
                    {...childApplyForm("nidPassport2", {
                      required: {
                        value: true,
                        message: "NID Number is required",
                      },
                      pattern: {
                        // value: /1?([1-9])/,
                        value: /^\d{10,16}$/,
                        message: "Provide a valid NID Number",
                      },
                    })}
                    type="text"
                    placeholder="NID Number"
                    className="input input-bordered input-sm md:w-96 max-w-lg"
                  />
                  <label className="label font-bold">
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
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-4">
                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      {...childApplyForm("email")}
                      type="email"
                      value={user?.email}
                      disabled
                      className="input input-bordered input-sm md:w-96 max-w-lg mb-3"
                    />
                  </div>

                  <div className="form-control w-full max-w-sm mx-auto">
                    <input
                      type="text"
                      disabled
                      value={applicationDate}
                      placeholder="Address line 2 optional"
                      className="input input-bordered input-sm md:w-96 max-w-lg mb-3"
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
                          value: /^\d{9,11}$/,
                          message: "Provide a valid Phone Number",
                        },
                      })}
                      type="text"
                      placeholder="Phone Number"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label font-bold">
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
                      placeholder="Address"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label font-bold">
                      {errors.address?.type === "required" && (
                        <span className="label-text-alt text-error">
                          {errors.address?.message}
                        </span>
                      )}
                    </label>
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
                    <label className="label font-bold">
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
                    <label className="label font-bold">
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
                          value: /^\d{4,5}$/,
                          message: "Provide a valid Zip Code",
                        },
                      })}
                      type="text"
                      placeholder="Zip code"
                      className="input input-bordered input-sm md:w-96 max-w-lg"
                    />
                    <label className="label font-bold">
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
                    <label className="label font-bold">
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
                  className="btn btn-info rounded-none w-full mx-auto text-white"
                  type="submit"
                  value="Apply Now"
                />
              </div>
            </form>
            {/* Parent and Contact info form start */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChildApplyForm;
