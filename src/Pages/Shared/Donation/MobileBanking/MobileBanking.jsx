import React from "react";
import { useForm } from "react-hook-form";

const MobileBanking = () => {
  // personal number donate event handle
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                  message: "Provide a valid Email",
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
            </label>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              Amount * :
            </label>
            <input
              {...register("amount", {
                required: {
                  value: true,
                  message: "Amount is required",
                },
              })}
              type="text"
              id="amount"
              placeholder="Amount"
              className="input input-bordered input-sm w-72 md:w-52 max-w-xs"
            />
            <label className="label">
              {errors.amount?.type === "required" && (
                <span className="label-text-alt text-error">
                  {errors.amount?.message}
                </span>
              )}
            </label>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="trxId">
              Trx ID * :
            </label>
            <input
              {...register("trxId", {
                required: {
                  value: true,
                  message: "trxId is required",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z])/,
                  message: "Provide Valid Transaction ID",
                },
              })}
              type="text"
              placeholder="trxId"
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
            className="btn btn-secondary rounded-none mb-10"
            type="submit"
            value="Donated"
          />
        </div>
      </form>
    </div>
  );
};

export default MobileBanking;
