import React from "react";
import { useForm } from "react-hook-form";

const ChildApplyForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="md:mt-8 mb-16">
      <div className="card md:w-4/5 bg-base-100 shadow-xl mx-auto">
        <div className="card-body">
          {/* <div className="text-center">
                  <h2 className="text-2xl">Please! Registration</h2>
                </div> */}

          <form onSubmit={handleSubmit(onSubmit)}>
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
                  className="input input-bordered w-full"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-md">
                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>


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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>


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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>


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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>



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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>



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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
              </div>




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
                  className="input input-bordered w-full max-w-"
                />
                <label className="label">
                  {errors.displayName?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.displayName?.message}
                    </span>
                  )}
                </label>
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
