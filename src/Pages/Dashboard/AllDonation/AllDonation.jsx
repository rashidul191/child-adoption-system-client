import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../Shared/Loading/Loading";
import Pagination from "../../Shared/Pagination/Pagination";
import DonationRow from "./DonationRow/DonationRow";

const AllDonation = () => {
  DynamicTitle("All Donation");
  const [count, setCount] = useState(1);
  let limit = 8;
  const skip = (count - 1) * limit;
  // query
  const { data: allDonation, isLoading } = useQuery(["donation"], () =>
    fetch(`https://child-adoption-system-server.onrender.com/api/v1/payment`, {
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
    <section>
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
              {allDonation?.data
                ?.slice(skip, skip + limit)
                ?.reverse()
                ?.map((donation, index) => (
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

      {/* pagination */}
      {allDonation?.data?.length >= limit && (
        <Pagination
          data={allDonation?.data}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default AllDonation;
