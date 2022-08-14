import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "./SocialLogin/SocialLogin";
import bgImage from "../../images/login-bg-img.png";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import { toast } from "react-toastify";
import useToken from "../../hooks/useToken";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef("");
  const [emptyEmailFiled, setEmptyEmailFiled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [sendPasswordResetEmail, sending, forgotPasswordError] =
    useSendPasswordResetEmail(auth);

  const [token] = useToken(user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const email = data?.email;
    const password = data?.password;
    if (
      email &&
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/.test(password)
    ) {
      signInWithEmailAndPassword(email, password);
      // toast.success("Login Successfully");
    } else {
      toast.error("Provide a valid email and password");
    }
  };

  let from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token) {
      // console.log(user);
      navigate(from, { replace: true });
    }
  }, [token, navigate, from]);

  if (loading || sending) {
    return <Loading></Loading>;
  }

  let errorElement;
  if (error || forgotPasswordError) {
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
            {error?.message} {forgotPasswordError?.message}
            {/* { toast.error(`${error?.message}`)}; */}
          </span>
        </div>
      </div>
    );
  }

  const handleForgotPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        await sendPasswordResetEmail(email);
        setEmptyEmailFiled(false);
        toast.success("Send Email and check spam folder");
      } else {
        toast.error("Provide a valid email");
      }
    } else {
      toast.error("Email Filed is empty");
      setEmptyEmailFiled(true);
    }
  };

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
              New User ?{" "}
              <Link to="/register" className="text-secondary underline">
                Create a new account
              </Link>{" "}
            </small>
          </p>
        </div>

        <div className="grid grid-cols-1">
          <div className="card w-96 bg-base-100 shadow-xl sm:ml-10 md:ml-32 pt-5 pb-10">
            <span>{errorElement}</span>
            <div className="text-center">
              <h1 className="text-3xl">Welcome Back !</h1>
              <h2 className="text-xl">Login to continue</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
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
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-error">
                        {errors.pattern?.message}
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
                  <label htmlhtmlFor="showPassword"> Show Password</label>
                </div>

                <input
                  className="btn btn-secondary rounded-none"
                  type="submit"
                  value={`Login`}
                />
                <label htmlhtmlFor="forgot-password-modal" className="btn btn-link">
                  <small>Forgot password?</small>
                </label>
              </form>
            </div>

            {/* Forgot Password modal */}

            <input
              type="checkbox"
              id="forgot-password-modal"
              className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <label
                  htmlhtmlFor="forgot-password-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>

                <label className="label">
                  <span className="label-text">Email:</span>
                </label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="example@gmail.com"
                  className={`input input-bordered w-full max-w-xs ${
                    emptyEmailFiled && "border-4 border-error"
                  }`}
                  name=""
                  id=""
                />
                <button onClick={handleForgotPassword} className="btn btn-info">
                  Send Email
                </button>
                {/* <div className="modal-action">
                  <label htmlhtmlFor="forgot-password-modal" className="btn btn-info">
                    Send Email
                  </label>
                </div> */}
              </div>
            </div>

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
