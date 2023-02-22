import React from "react";

const DonationRow = ({ donation, index }) => {
  const { email, amount, cardNumber, trxId, paymentSystem, date } = donation;
  let paymentMethod;
  if (paymentSystem === "card") {
    paymentMethod = "card";
  } else {
    paymentMethod = "mobile banking";
  }
  return (
    <tr className="font-bold">
      {/* <td>{index + 1}</td> */}
    {/* <td>#</td> */}
      <td>৳ {amount}</td>
      <td>{paymentMethod}</td>
      <td>{cardNumber || trxId}</td>
      <td>{date}</td>
      <td>
        {email ? email : <span className="text-info">Anonymous Donor</span>}
      </td>
    </tr>
  );
};

export default DonationRow;
