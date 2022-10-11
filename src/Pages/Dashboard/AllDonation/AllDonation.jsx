import { useQuery } from "@tanstack/react-query";
import React from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";
import DonationRow from "./DonationRow/DonationRow";

const AllDonation = () => {
  DynamicTitle("All Donation");
  const { data: allDonation, isLoading } = useQuery(["donation"], () =>
    fetch(`http://localhost:5000/allDonation`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="md:text-xl font-bold uppercase">User Manage</h1>
      <hr />
      <div>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Amount</th>
                <th>Payment System</th>
                <th>Number</th>
                <th>Date</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {allDonation?.map((donation, index) => (
                <DonationRow
                  key={donation._id}
                  index={index}
                  donation={donation}
                ></DonationRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllDonation;
