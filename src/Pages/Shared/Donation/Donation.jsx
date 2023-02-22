import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DynamicTitle from "../DynamicTitle/DynamicTitle";
import DonationFirstPage from "./DonationFirstPage";

const Donation = () => {
  DynamicTitle("Donation");
  const navigate = useNavigate();
  const [otherAmount, setOtherAmount] = useState(0);
  const [error, setError] = useState(false);
  const { register: donationAmount, handleSubmit } = useForm();

  const handleOtherAmount = (event) => {
    event.preventDefault();
    const userAmount = event.target.value;
    if (userAmount > 99 && userAmount < 1000000) {
      setOtherAmount(userAmount);
      setError(false);
    } else {
      setError(true);
    }
  };

  const onSubmit = (data) => {
    console.log(data.amount);
    // navigate(`/donation/${data.amount}`);

    if (data.amount > 99 && data.amount < 1000000) {
      navigate(`/donation/${data.amount}`);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          Donation
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div className={` bg-[#EBF1F6]py-10 md:my-10 w-full md:w-11/12 mx-auto`}>
        <div className="md:w-2/3 mx-auto">
          <div className="text-center mx-5">
            <p className="mb-6">
              Your Donation has the power to transform lives, from sheltering
              those who have no home, to feeding families who have endured
              hunger for days on end. Please, donate your Zakat/Sadaqah where
              the need is greatest.
            </p>
            <p>
              you can choose to make your donation through Child Adoption System
              Ador. Doing so will support our appeals, helping thousands of
              innocent lives living in poverty around the Community.
            </p>
          </div>
          <hr />
          <div className="mt-5 w-2/3 mx-auto">
            <h2 className="text-xl font-bold">Choses a Amount</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-32">
                <div className="">
                  <label htmlFor="q1" className="label cursor-pointer -mb-5">
                    <input
                      id="q1"
                      type="radio"
                      className="radio checked:bg-blue-500"
                      required
                      {...donationAmount("amount")}
                      value="1000"
                    />
                    <span className="font-bold">1,000 Taka</span>
                  </label>
                  <br />
                  <label htmlFor="q2" className="label cursor-pointer -mb-5">
                    <input
                      id="q2"
                      type="radio"
                      className="radio checked:bg-blue-500"
                      required
                      {...donationAmount("amount")}
                      value="2000"
                    />
                    <span className="font-bold">2,000 Taka</span>
                  </label>
                  <br />
                  <label htmlFor="q3" className="label cursor-pointer -mb-5">
                    <input
                      id="q3"
                      type="radio"
                      className="radio checked:bg-blue-500"
                      required
                      {...donationAmount("amount")}
                      value="3000"
                    />
                    <span className="font-bold">3,000 Taka</span>
                  </label>
                  <br />
                  <label htmlFor="q4" className="label cursor-pointer -mb-5">
                    <input
                      id="q4"
                      type="radio"
                      className="radio checked:bg-blue-500"
                      required
                      {...donationAmount("amount")}
                      value="4000"
                    />
                    <span className="font-bold">4,000 Taka</span>
                  </label>
                  <br />
                  <label htmlFor="q5" className="label cursor-pointer mb-2">
                    <input
                      id="q5"
                      type="radio"
                      className="radio checked:bg-blue-500"
                      required
                      {...donationAmount("amount")}
                      value="5000"
                    />
                    <span className="font-bold">5,000 Taka</span>
                  </label>
                </div>
              </div>
              <label htmlFor="q6" className="ml-1">
                <input
                  id="q6"
                  type="radio"
                  className="radio checked:bg-blue-500"
                  required
                  {...donationAmount("amount")}
                  value={otherAmount}
                />
                <span className="font-bold">
                  {" "}
                  Other:
                  <input
                    id="q6"
                    onChange={handleOtherAmount}
                    type="text"
                    className="input input-bordered input-sm w-32 max-w-xs"
                    defaultValue={1000}
                  />{" "}
                  Taka
                </span>
              </label>
              <br />
              {error && (
                <>
                  <span className="text-error text-xm font-bold">
                    Minimum Donation 100 Taka ,
                  </span>
                  <br />
                  <span className="text-error text-xm font-bold">
                    Maximum Donation 9,99,999 Taka
                  </span>
                </>
              )}

              <input
                className="btn btn-secondary font-bold w-full md:w-96 mt-5 rounded-none text-white"
                type="submit"
                value="Give Now"
              />
            </form>
          </div>
        </div>
        <hr className="mt-5" />
        <div className="mt-5">
          <h2 className="text-center text-2xl font-bold  ">
            OTHER WAYS TO DONATE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <DonationFirstPage></DonationFirstPage>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
