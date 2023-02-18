import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DynamicTitle from "../DynamicTitle/DynamicTitle";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import DonationFirstPage from "./DonationFirstPage";
import MobileBanking from "./MobileBanking/MobileBanking";

const stripePromise = loadStripe(
  "pk_test_51LpY8iE01qgurHugwgq5f5TBPj3khq3unaaKZRf9OOn5lOI5fxLskN6TeOc1y2kak2kNf5Y9gU6e36gmbZcbWLy100l4rI3NqF"
);

const Donation = () => {
  DynamicTitle("Donate");
  const [donation, setDonation] = useState(false);
  const [card, setCard] = useState(true);
  const [mobileBanking, setMobileBanking] = useState(false);
  const [amount, setAmount] = useState(0);
  const [otherAmount, setOtherAmount] = useState(0);

  const { register: donationAmount, handleSubmit } = useForm();
  const handleCard = () => {
    setCard(true);
    setMobileBanking(false);
  };
  const handleMobileBanking = () => {
    setMobileBanking(true);
    setCard(false);
  };

  const handleOtherAmount = (event) => {
    event.preventDefault();
    setOtherAmount(event.target.value);
  };

  const onSubmit = (data) => {
    setAmount(data.amount);
    setDonation(true);
  };

  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          Donation
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      {/* <DonationFirstPage></DonationFirstPage> */}

      <div
        className={` bg-[#EBF1F6] ${
          donation ? "hidden" : "block"
        } py-10 md:my-10 w-full md:w-11/12 mx-auto`}
      >
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
                    <span className="font-bold">1000 Taka</span>
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
                    <span className="font-bold">2000 Taka</span>
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
                    <span className="font-bold">3000 Taka</span>
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
                    <span className="font-bold">4000 Taka</span>
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
                    <span className="font-bold">5000 Taka</span>
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
                    onChange={handleOtherAmount}
                    type="text"
                    className="input input-bordered input-sm w-32 max-w-xs"
                    defaultValue={1000}
                  />{" "}
                  Taka
                </span>
              </label>
              <br />
              <input
                className="btn btn-secondary font-bold w-full md:w-96 mt-5 rounded-none"
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

      {/* handle card and mobile banking */}
      <div className={` ${donation ? "block" : "hidden"}`}>
        <div className="my-5 md:my-20">
          <div className="w-96 md:w-2/5 bg-base-100 border border-3 mx-auto">
            <div className="card-body">
              <div className="bg-blue-300 text-center py-3 uppercase text-white font-bold">
                {" "}
                <p>
                  <span
                    className={`mr-4 p-3  cursor-pointer   ${
                      card && "bg-blue-600"
                    }  `}
                    onClick={handleCard}
                  >
                    Cards
                  </span>{" "}
                  <span
                    className={`mr-4 p-3  cursor-pointer   ${
                      mobileBanking && "bg-blue-600"
                    }  `}
                    onClick={handleMobileBanking}
                  >
                    Mobile Banking
                  </span>
                </p>{" "}
              </div>

              <div className="">
                <div className={`${card ? "block" : "hidden"}`}>
                  <Elements stripe={stripePromise}>
                    <CheckoutForm amountCard={amount} />
                  </Elements>
                </div>

                <div className={`${mobileBanking ? "block" : "hidden"}`}>
                  <MobileBanking amount={amount} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
