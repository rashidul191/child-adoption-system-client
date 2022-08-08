import React from "react";
import { useForm } from "react-hook-form";
import SocialLogin from "./SocialLogin/SocialLogin";
import { Link } from "react-router-dom";
import bgImage from "../../images/login-bg-img.png";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:"gray"
      }}
    >
      <div 
       style={{
       
        backgroundColor:"rgb(0,0,0,0.8)"
      }} className="py-10 md:pt-5 md:pb-20 ">
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
          <div class="card w-96 bg-base-100 shadow-xl sm:ml-10 md:ml-32 pt-5 pb-10">
            <div className="text-center">
              <h1 className="text-3xl">Welcome Back !</h1>
              <h2 className="text-xl">Login to continue</h2>
            </div>
            <div class="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Email:</span>
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
                    class="input input-bordered w-full max-w-xs"
                  />
                  <label class="label">
                    {errors.email?.type === "required" && (
                      <span class="label-text-alt text-error">
                        {errors.email?.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span class="label-text-alt text-error">
                        {errors.email?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Password:</span>
                  </label>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                    type="password"
                    placeholder="password"
                    class="input input-bordered w-full max-w-xs"
                  />
                  <label class="label">
                    {errors.password?.type === "required" && (
                      <span class="label-text-alt text-error">
                        {errors.password?.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span class="label-text-alt text-error">
                        {errors.password?.message}
                      </span>
                    )}
                  </label>
                </div>

                <input className="btn btn-secondary" type="submit" />
              </form>
            </div>

            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
