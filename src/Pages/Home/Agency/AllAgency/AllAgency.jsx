import { useQuery } from "@tanstack/react-query";
import React from "react";
import Loading from "../../../Shared/Loading/Loading";
import AgencyGrid from "../AgencyGrid/AgencyGrid";

const AllAgency = () => {
  const { data: allAgency, isLoading } = useQuery(["agencyInfo"], () =>
    fetch("http://localhost:5000/allAgency", {
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
    <section>
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          See All Agency
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10">
        {allAgency?.map((agency) => (
          <AgencyGrid key={agency._id} agency={agency}></AgencyGrid>
        ))}
      </div>
    </section>
  );
};

export default AllAgency;
