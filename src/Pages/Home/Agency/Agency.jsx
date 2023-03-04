import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import AgencyGrid from "./AgencyGrid/AgencyGrid";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router-dom";

const Agency = () => {
  // react query
  const { data: allAgency, isLoading } = useQuery(["allAgency"], () =>
    fetch("https://child-adoption-system-server.onrender.com/api/v1/agency", {
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
    <section className="bg-[#EBF1F6] my-10 py-10">
      <div>
        <h1 className="text-center text-3xl font-bold uppercase">Agency</h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-10">
        {allAgency?.data
          ?.slice(0, 3)
          ?.reverse()
          ?.map((agency) => (
            <AgencyGrid key={agency._id} agency={agency}></AgencyGrid>
          ))}
      </div>
      {allAgency.data.length > 3 && (
        <div className="text-center">
          <Link to={`/all-agency`}>
            <button className="btn btn-primary rounded-none w-60 text-white font-bold">
              See More
              <FontAwesomeIcon
                className="ml-4"
                icon={faArrowRight}
              ></FontAwesomeIcon>
            </button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Agency;
