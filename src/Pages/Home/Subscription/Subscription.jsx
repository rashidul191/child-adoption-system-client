import React from "react";
import { useForm } from "react-hook-form";
import { Fade, Zoom } from "react-reveal";
import Swal from "sweetalert2";

const Subscription = () => {
  const {
    register: subscription,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/subscription`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title:
              "Subscribe our new letter to stay updated every moment, Please Check Mail",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `Failed Subscription`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className="m-10">
      <Zoom>
        <div>
          <h1 className="text-center text-3xl font-bold uppercase">
            Subscribe
          </h1>
          <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
        </div>
      </Zoom>

      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-center mt-8 mb-4 font-semibold">
          Subscribe our new letter to stay updated every moment
        </p>
        <div className="flex justify-center">
          <div className="form-control w-full max-w-xs">
            <Fade left big>
              <input
                {...subscription("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Provide a valid Email",
                  },
                })}
                type="email"
                placeholder="example@gmail.com"
                className="input input-bordered rounded-none w-full max-w-xs"
              />
            </Fade>
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
          <Fade right big>
            <input
              className="btn btn-primary text-white font-bold rounded-none w-24 md:w-40"
              type="submit"
              value={`Submit`}
            />
          </Fade>
        </div>
      </form>
    </section>
  );
};

export default Subscription;
