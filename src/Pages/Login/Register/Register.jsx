import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import bgImage from "../../../images/login-bg-img.png";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import useToken from "../../../hooks/useToken";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";

const Register = () => {
  DynamicTitle("Registration");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user);
  let errorElement;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (data?.password === data?.confirmPassword) {
      const displayName = data?.displayName;
      const email = data?.email;
      const password = data?.password;
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName });
      //   console.log(data);
    } else {
      errorElement = (
        <span className="text-error">sorry password is not same</span>
      );
    }
  };

  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      // console.log(user)
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading || updating) {
    return <Loading></Loading>;
  }

  if (error || updateError) {
    errorElement = (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              stroke-linejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-white">
            {error?.message} {updateError?.message}
          </span>
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
                    {...register("displayName", {
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
                    {errors.displayName?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName?.message}
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
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
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
                    type={`${showPassword ? "text" : "password"}`}
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
                    type={`${showPassword ? "text" : "password"}`}
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
                <div className="mb-3">
                  <input
                    onClick={() => setShowPassword(!showPassword)}
                    type="checkbox"
                    name=""
                    id="showPassword"
                  />
                  <label htmlFor="showPassword">Show Password</label>
                </div>

                <span>
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.password?.message}
                    </span>
                  )}
                </span>

                <input
                  className="btn btn-secondary rounded-none"
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
