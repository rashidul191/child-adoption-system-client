import React from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import Swal from "sweetalert2";

const MobileBanking = ({ amount }) => {
  const date = new Date();
  const currentDate = format(date, "PP");
  // personal number donate event handle
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const donation = {
      date: currentDate,
      paymentSystem: "mobile banking",
      amount: amount,
      mobileNumber: data?.number,
      trxId: data?.trxId,
      email: data?.email || "",
    };

    console.log(donation);
    fetch(
      "https://child-adoption-system-server.onrender.com/api/v1/payment",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ donation }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Thanks for your Donation",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="grid flex-grow place-items-center">
      <h2>Personal Number !!! Please Send Money</h2>
      <div className="text-xl font-bold">
        <h2>bKash: 01629226069</h2>
        <h2>Nogod: 01629226069</h2>
        <h2>Rocket: 016292260696</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="email">
              Email:
            </label>
            <input
              {...register("email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Provide a valid email",
                },
              })}
              type="email"
              id="email"
              placeholder="example@gmail.com (optional)"
              className="input input-bordered input-sm w-72 md:w-52 max-w-xs"
            />
            <label className="label">
              {errors.email?.type === "pattern" && (
                <span className="label-text-alt text-error">
                  {errors.email?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="number">
              Number * :
            </label>
            <input
              {...register("number", {
                required: {
                  value: true,
                  message: "Number is required",
                },
                pattern: {
                  // value: /1?([1-9])(\d{9})/,
                  value: /^\d{9,11}$/,
                  message: "Provide a valid number",
                },
              })}
              type="text"
              id="number"
              placeholder="Number"
              className="input input-bordered input-sm w-72 md:w-52 max-w-xs"
            />
            <label className="label">
              {errors.number?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.number?.message}
                </span>
              )}
              {errors.number?.type === "pattern" && (
                <span className="label-text-alt text-error">
                  {errors.number?.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              Amount (tk)* :
            </label>
            <input
              type="text"
              id="amount"
              placeholder="Amount"
              value={amount}
              className="input input-bordered input-sm w-72 md:w-52 max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="trx-id">
              Trx ID * :
            </label>
            <input
              {...register("trxId", {
                required: {
                  value: true,
                  message: "trxId is required",
                },
                pattern: {
                  // value: /^(?=.*\d)(?=.*[a-zA-Z])/,
                  value: /^[a-zA-Z0-9]{8,10}$/,
                  message: "Provide Valid Transaction ID",
                },
              })}
              type="text"
              placeholder="trxId"
              id="trx-id"
              className="input input-bordered input-sm w-72 md:w-52 max-w-xs"
            />
            <label className="label">
              {errors.trxId?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.trxId?.message}
                </span>
              )}
              {errors.trxId?.type === "pattern" && (
                <span className="label-text-alt text-error">
                  {errors.trxId?.message}
                </span>
              )}
            </label>
          </div>
        </div>
        <div>
          <input
            className="btn btn-secondary rounded-none mb-10 font-bold"
            type="submit"
            value="Donated"
          />
        </div>
      </form>
    </div>
  );
};

export default MobileBanking;
