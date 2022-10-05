import React from "react";

const DonationRow = ({ donation, index }) => {
  const { email, amount, cardNumber, phoneNumber, paymentSystem, date } =
    donation;
  let paymentMethod;
  if (paymentSystem === "card") {
    paymentMethod = "card";
  } else {
    paymentMethod = "mobile banking";
  }
  return (
    <tr className="font-bold">
      <td>{index + 1}</td>
      <td>৳ {amount}</td>
      <td>{paymentMethod}</td>
      <td>{cardNumber || phoneNumber}</td>
      <td>{date}</td>
      <td>{email}</td>
    </tr>
  );
};

export default DonationRow;
