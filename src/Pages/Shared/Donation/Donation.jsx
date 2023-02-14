import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useState } from "react";
import DynamicTitle from "../DynamicTitle/DynamicTitle";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import MobileBanking from "./MobileBanking/MobileBanking";

const stripePromise = loadStripe(
  "pk_test_51LpY8iE01qgurHugwgq5f5TBPj3khq3unaaKZRf9OOn5lOI5fxLskN6TeOc1y2kak2kNf5Y9gU6e36gmbZcbWLy100l4rI3NqF"
);

const Donation = () => {
  DynamicTitle("Donate");
  const [card, setCard] = useState(true);
  const [mobileBanking, setMobileBanking] = useState(false);

  const handleCard = () => {
    setCard(true);
    setMobileBanking(false);
  };
  const handleMobileBanking = () => {
    setMobileBanking(true);
    setCard(false);
  };

  return (
    <section className="pt-16">
      <div className=" mx-20 md:mx-0 my-5 md:my-20">
        <div className="w-full md:w-2/5 bg-base-100 border border-3 mx-auto">
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
                  <CheckoutForm />
                </Elements>
              </div>

              <div className={`${mobileBanking ? "block" : "hidden"}`}>
                <MobileBanking />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donation;
