import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";

import auth from "../../../../firebase.init";
import Swal from "sweetalert2";

const CheckoutForm = ({ amountCard }) => {
  const date = new Date();
  const currentDate = format(date, "PP");
  const [user] = useAuthState(auth);
  const amountRef = useRef("");
  // let amount = amountRef.current.value || 10;
  let amount = amountCard;

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(
      "https://child-adoption-system-server.onrender.com/api/v1/payment/create-payment-intent",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.data?.clientSecret) {
          setClientSecret(data?.data?.clientSecret);
        }
      });
  }, [amount]);

  // Card Donate event handle
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "",
            email: user?.email || "",
          },
        },
      });

    const donation = {
      date: currentDate,
      paymentSystem: "card",
      amount: amount,
      cardNumber: paymentMethod?.card?.last4,
      name: user?.displayName || "",
      email: user?.email || "",
    };

    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError("");
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

      setSuccess("Thanks!! Your Donation is completed.");
    }
  };
  return (
    <div className="">
      {cardError && (
        <p className="text-error text-center font-bold mt-4">{cardError}</p>
      )}
      {success && (
        <p className="text-green-500 text-center font-bold mt-4">{success}</p>
      )}
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <p>Card Number, MM/YY, CVC & ZIP Here*:</p>
          <CardElement
            className="mb-5 border p-2"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder:": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />

          <label htmlFor="cardAmount">Amount (tk):* </label>
          <input
            type="text"
            id="cardAmount"
            placeholder="$ amount"
            name="cardAmount"
            value={amountCard}
            required
            ref={amountRef}
            className="input input-bordered input-sm w-full rounded-none"
          />
          <button
            className="btn btn-secondary rounded-none my-10 font-bold"
            type="submit"
            disabled={!stripe && !clientSecret}
          >
            Donated
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
