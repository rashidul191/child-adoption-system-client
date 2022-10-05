import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading/Loading";

const ChildApplyForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  const { data: countryAll, isLoading } = useQuery(["countries"], () =>
    fetch(`https://restcountries.com/v3.1/all`).then((res) => res.json())
  );

  // console.log(countryAll);
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="md:mt-8 mb-16">
      <div className="card md:w-4/5 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          {/* <div className="text-center">
                  <h2 className="text-2xl">Please! Registration</h2>
                </div> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2 className="text-xl md:text-3xl font-bold">Parent 1 Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Full Name:</span>
                </label>
                <input
                  {...register("displayName", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered                          l"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Gander:</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-lg"
                  {...register("gender", {
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
              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Citizenship:</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-lg"
                  {...register("citizenship", {
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

              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Birth Date:</span>
                </label>
                <input
                  {...register("birthDate", {
                    required: {
                      value: true,
                      message: "Birth Date is required",
                    },
                  })}
                  type="date"
                  placeholder="Birth Date"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  {errors.birthDate?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.birthDate?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">NID / Passport Number:</span>
                </label>
                <input
                  {...register("nidPassport", {
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
                  className="input input-bordered w-full max-w-md"
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
              <h2 className="text-xl md:text-3xl font-bold">Parent 2 Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Full Name:</span>
                </label>
                <input
                  {...register("displayName2", {
                    required: {
                      value: true,
                      message: "Full Name is required",
                    },
                  })}
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  {errors.displayName2?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName2?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Gander:</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-lg"
                  {...register("gender2", {
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

              <div className="form-control w-full max-w-lg">
                <label className="label">
                  <span className="label-text">Citizenship:</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-lg"
                  {...register("citizenship2", {
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

              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Birth Date:</span>
                </label>
                <input
                  {...register("birthDate2", {
                    required: {
                      value: true,
                      message: "Birth Date is required",
                    },
                  })}
                  type="date"
                  placeholder="Birth Date"
                  className="input input-bordered w-full"
                />
                <label className="label">
                  {errors.birthDate2?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.birthDate2?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-md">
                {/* <label className="label">
                    <span className="label-text">Phone Number:</span>
                  </label> */}
                <input
                  {...register("nidPassport2", {
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
                  className="input input-bordered w-full max-w-"
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
                <h2 className="text-xl md:text-3xl font-bold">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                <div className="form-control w-full max-w-md">
                  {/* <label className="label">
                    <span className="label-text">Email:</span>
                  </label> */}
                  <input
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Provide a valid Email",
                      },
                    })}
                    type="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full max-w-lg"
                  />
                  <label className="label">
                    {errors.email?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.email?.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="label-text-alt text-error">
                        {errors.email?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-md">
                  {/* <label className="label">
                    <span className="label-text">Phone Number:</span>
                  </label> */}
                  <input
                    {...register("phoneNumber", {
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
                    className="input input-bordered w-full max-w-"
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

                <div className="form-control w-full max-w-md">
                  <input
                    {...register("address", {
                      required: {
                        value: true,
                        message: "Address is required",
                      },
                    })}
                    type="text"
                    placeholder="Address line 1"
                    className="input input-bordered w-full max-w-"
                  />
                  <label className="label">
                    {errors.address?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.address?.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control w-full max-w-md">
                  <input
                    type="text"
                    placeholder="Address line 2 optional"
                    className="input input-bordered w-full max-w-"
                  />
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    {...register("city", {
                      required: {
                        value: true,
                        message: "City is required",
                      },
                    })}
                    type="text"
                    placeholder="City"
                    className="input input-bordered w-full max-w-"
                  />
                  <label className="label">
                    {errors.city?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.city?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    {...register("state", {
                      required: {
                        value: true,
                        message: "State is required",
                      },
                    })}
                    type="text"
                    placeholder="State"
                    className="input input-bordered w-full max-w-"
                  />
                  <label className="label">
                    {errors.state?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.state?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-md">
                  <input
                    {...register("zipCode", {
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
                    className="input input-bordered w-full max-w-"
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

                <div className="form-control w-full max-w-lg">
                  <select
                    className="select select-bordered w-full max-w-lg"
                    {...register("country", {
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

            <input
              className="btn btn-secondary rounded-none"
              type="submit"
              value="Apply Now"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChildApplyForm;
