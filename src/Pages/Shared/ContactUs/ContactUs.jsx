import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useForm } from "react-hook-form";
import DynamicTitle from "../DynamicTitle/DynamicTitle";

const ContactUs = () => {
  DynamicTitle("Contact-Us");

  const {
    register: contactUs,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    alert("Your message send successfully");
  };

  return (
    <section className="pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          Contact Us
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className="my-10">
        <h2 className="text-center text-xl">
          We'd really love to hear your feedback
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          <div>
            <div className="text-center md:text-right md:mr-14">
              <div className=" mb-5">
                <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                  <h2 className="text-xl uppercase text-[#8EA246]">
                    {" "}
                    <span>
                      <FontAwesomeIcon className="text-2xl" icon={faPhone} />
                    </span>{" "}
                    Call Us
                  </h2>
                  <h2 className="text-xl font-bold">+880-1629226069</h2>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right md:mr-14">
              <div className=" mb-5">
                <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                  <h2 className="text-xl uppercase text-[#8EA246]">
                    {" "}
                    <span>
                      <FontAwesomeIcon className="text-2xl" icon={faEnvelope} />
                    </span>{" "}
                    Email
                  </h2>
                  <h2 className="text-xl font-bold">casa@gmail.com</h2>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right md:mr-14">
              <div className="">
                <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                  <h2 className="text-xl uppercase text-[#8EA246]">
                    {" "}
                    <span>
                      <FontAwesomeIcon
                        className="text-2xl"
                        icon={faLocationDot}
                      />
                    </span>{" "}
                    Address
                  </h2>
                  <h2 className="text-xl font-bold">
                    Mirpur-10, Dhaka, Bangladesh
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 ml-7 sm:ml-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="form-control w-full md:w-56 max-w-xs">
                  <input
                    {...contactUs("displayName", {
                      required: {
                        value: true,
                        message: "Name is required",
                      },
                    })}
                    type="text"
                    placeholder="Name"
                    id="name"
                    className="input input-bordered input-sm w-full md:w-56 max-w-xs"
                  />
                  <label className="label">
                    {errors.displayName?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.displayName?.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full md:w-56 max-w-xs">
                  <input
                    {...contactUs("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Provide a valid Email",
                      },
                    })}
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    className="input input-bordered input-sm w-full md:w-56 max-w-xs"
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
                <div className="form-control w-full md:w-56 max-w-xs">
                  <input
                    {...contactUs("phone", {
                      pattern: {
                        value: /^[0-9]{1,13}$/,
                        message: "Provide a valid Phone Number",
                      },
                    })}
                    type="text"
                    id="phone"
                    placeholder="Phone Number"
                    className="input input-bordered input-sm w-full md:w-56 max-w-xs"
                  />
                  <label className="label">
                    {errors.phone?.type === "required" && (
                      <span className="label-text-alt text-error">
                        {errors.phone?.message}
                      </span>
                    )}
                    {errors.phone?.type === "pattern" && (
                      <span className="label-text-alt text-error">
                        {errors.phone?.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>

              <div className="form-control w-full pr-6 sm:pr-12">
                <input
                  {...contactUs("subject", {
                    required: {
                      value: true,
                      message: "Subject is required",
                    },
                  })}
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered input-md w-full "
                />
                <label className="label">
                  {errors.subject?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.subject?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full pr-6 sm:pr-12">
                <textarea
                  className="textarea textarea-bordered h-24 input-sm w-full"
                  placeholder="Message"
                  id="aboutChild"
                ></textarea>
              </div>

              <input
                className="btn btn-primary text-white mt-5 w-48 md:w-96"
                type="submit"
                value="Send"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
