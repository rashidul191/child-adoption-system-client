import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DynamicTitle from "../DynamicTitle/DynamicTitle";

const ContactUs = () => {
  DynamicTitle("Contact-Us");
  const contactMessageRef = useRef("");
  let num1 = Math.ceil(Math.random() * 10);
  let num2 = Math.ceil(Math.random() * 10);

  const [error, setError] = useState("");
  const {
    register: contactUs,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    let sumNumber = num1 + num2;
    let captcha = parseInt(data?.captcha);
    if (sumNumber !== captcha) {
      setError("Provide a valid math");
    }
    const contactInfo = {
      name: data.displayName,
      phoneNumber: data.phone,
      email: data.email,
      subject: data.subject,
      message: contactMessageRef.current.value,
    };

    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/contactUs`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(contactInfo),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `Thanks your feedback. Please check mail`,
            showConfirmButton: false,
            timer: 2000,
          });
          window.location.reload();
        } else {
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: `Something is wrong!! please try again.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <section className="md:pt-16">
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
                <a href="tel:+8809696860878">
                  <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                    <h2 className="text-xl uppercase text-[#8EA246]">
                      {" "}
                      <span>
                        <FontAwesomeIcon className="text-2xl" icon={faPhone} />
                      </span>{" "}
                      Call Us
                    </h2>
                    <h2 className="text-sm font-bold link link-hover hover:text-blue-500">
                      +880-9696 860 878
                    </h2>
                  </div>
                </a>
              </div>
            </div>

            <div className="text-center md:text-right md:mr-14">
              <div className=" mb-5">
                <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                  <a href="mailto:childadoptionsystemador@gmail.com">
                    <h2 className="text-xl uppercase text-[#8EA246]">
                      {" "}
                      <span>
                        <FontAwesomeIcon
                          className="text-2xl"
                          icon={faEnvelope}
                        />
                      </span>{" "}
                      Email
                    </h2>{" "}
                    <h2 className="text-sm font-bold link link-hover hover:text-blue-500">
                      childadoptionsystemador@gmail.com
                    </h2>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right md:mr-14">
              <div className="">
                <div className="md:pr-3 md:border-r-2 md:border-indigo-500">
                  <a
                    target="_blank"
                    href="https://www.google.com/maps/place/%E0%A6%AC%E0%A6%BE%E0%A6%B8%E0%A6%A8%E0%A6%BE+%E0%A6%A8%E0%A7%80%E0%A6%A1%E0%A6%BC+(Bashna+Nir)/@23.7880058,90.374184,45m/data=!3m1!1e3!4m6!3m5!1s0x3755c1bae422e91d:0xb437e5d06e95c142!8m2!3d23.7881005!4d90.374196!16s%2Fg%2F11rz2yxwch"
                  >
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

                    <h2 className="text-sm font-bold link link-hover hover:text-blue-500">
                      West Shewrapara, Dhaka, Bangladesh
                    </h2>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 ml-7 sm:ml-0">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-3 gap-2"
            >
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-2"> */}
              <div className="form-control w-full md:w-56 max-w-xs col-span-3 md:col-auto">
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

              <div className="form-control w-full md:w-56 max-w-xs col-span-3 md:col-auto">
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
              <div className="form-control w-full md:w-56 max-w-xs col-span-3 md:col-auto">
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
                  {errors.phone?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.phone?.message}
                    </span>
                  )}
                </label>
              </div>
              {/* </div> */}

              <div className="form-control w-full pr-6 sm:pr-12 col-span-3">
                <input
                  {...contactUs("subject", {
                    required: {
                      value: true,
                      message: "Subject is required",
                    },
                  })}
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered input-sm w-full "
                />
                <label className="label">
                  {errors.subject?.type === "required" && (
                    <span className="label-text-alt text-error">
                      {errors.subject?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full pr-6 sm:pr-12 col-span-3">
                <textarea
                  className="textarea textarea-bordered h-24 input-sm w-full"
                  placeholder="Message"
                  id="aboutChild"
                  ref={contactMessageRef}
                  required
                ></textarea>
              </div>

              <div className="form-control w-full pr-6 sm:pr-12 mt-5 col-span-3 md:col-auto">
                <input
                  {...contactUs("captcha", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    pattern: {
                      value: /^[0-9]{1,2}$/,
                      message: "Provide a valid math",
                    },
                  })}
                  type="text"
                  className="input input-bordered input-md w-full"
                  placeholder={`${num1} + ${num2} = ?`}
                />
                <label className="label">
                  {errors.captcha?.type === "pattern" && (
                    <span className="label-text-alt text-error">
                      {errors.captcha?.message}
                    </span>
                  )}

                  {error || errors.captcha?.type === "required" ? (
                    <span className="label-text-alt text-error">
                      {errors.captcha?.message} <br /> {error}
                      <br />
                    </span>
                  ) : (
                    <span></span>
                  )}
                </label>
              </div>

              <input
                className="btn btn-primary text-white mt-5 w-48 md:w-96"
                type="submit"
                value="Send Message"
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
