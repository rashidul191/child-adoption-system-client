import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import bgImage from "../../../images/login-bg-img.png";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Register = () => {
  const navigate = useNavigate();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  let errorElement;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    if (data?.password === data?.confirmPassword) {
      createUserWithEmailAndPassword(data?.email, data?.password);
      //   console.log(data);
    } else {
      errorElement = (
        <span className="text-error">sorry password is not same</span>
      );
    }
  };

  if (loading) {
    return <p>Loading........</p>;
  }

  if (user) {
    navigate("/");
  }

  if (error) {
    errorElement = (
      <div class="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">{error?.message}</span>
        </div>
      </div>
    );
  }

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "gray",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(0,0,0,0.8)",
        }}
        className="py-10 md:pt-5 md:pb-20 "
      >
        <div className="text-end m-5 sm:mx-6">
          <p>
            <small className="font-bold text-blue-200">
              Already Have a Account ?{" "}
              <Link to="/login" className="text-secondary underline">
                Login
              </Link>{" "}
            </small>
          </p>
        </div>

        <div className="grid grid-cols-1">
          <span className="w-1/3 sm:ml-10 md:ml-32">{errorElement}</span>
          <div className="card w-1/3 bg-base-100 shadow-xl sm:ml-10 md:ml-32 pt-5 pb-10">
            <div className="text-center">
              <h2 className="text-2xl">Please! Registration</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Full Name:</span>
                  </label>
                  <input
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Full Name is required",
                      },
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.name?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email:</span>
                  </label>
                  <input
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/,
                        message: "Provide a valid Email",
                      },
                    })}
                    type="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered w-full max-w-xs"
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

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Password:</span>
                  </label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/,
                        message: (
                          <>
                            <li>Must be 6 characters or longer</li>
                            <li>Must be 1 Letters</li>
                            <li>Must be 1 Digits</li>
                            <li>Must be 1 Special characters</li>
                          </>
                        ),
                      },
                    })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.password?.message}
                      </span>
                    )}
                    {/* {errors.password?.type === "pattern" && (
                      <span className="label-text-alt text-error">
                        {errors.password?.message}
                      </span>
                    )} */}
                  </label>
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Confirm Password:</span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: {
                        value: true,
                        message: "Confirm Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                    type="password"
                    placeholder="Confirm password"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    {errors.confirmPassword?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword?.message}
                      </span>
                    )}
                    {errors.confirmPassword?.type === "minLength" && (
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword?.message}
                      </span>
                    )}
                  </label>
                </div>

                <span>
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.password?.message}
                    </span>
                  )}
                </span>

                <input
                  className="btn btn-secondary"
                  type="submit"
                  value="Registration"
                />
              </form>
            </div>

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
