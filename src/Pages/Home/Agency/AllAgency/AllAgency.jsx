import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";
import Loading from "../../../Shared/Loading/Loading";
import Pagination from "../../../Shared/Pagination/Pagination";
import AgencyGrid from "../AgencyGrid/AgencyGrid";

const AllAgency = () => {
  DynamicTitle("Agency");
  const [count, setCount] = useState(1);
  let limit = 9;
  const skip = (count - 1) * limit;
  // query
  const { data: allAgency, isLoading } = useQuery(["agencyInfo"], () =>
    fetch("https://child-adoption-system-server.onrender.com/allAgency", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          All Agency
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10">
        {allAgency?.slice(skip, skip + limit)?.map((agency) => (
          <AgencyGrid key={agency._id} agency={agency}></AgencyGrid>
        ))}
      </div>
      {/* pagination */}
      {allAgency.length >= limit && (
        <Pagination
          data={allAgency}
          count={count}
          setCount={setCount}
          limit={limit}
        ></Pagination>
      )}
    </section>
  );
};

export default AllAgency;
