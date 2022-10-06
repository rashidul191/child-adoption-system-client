import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const AgencyInfo = () => {
  const { id } = useParams();

  const { data: agency, isLoading } = useQuery(["agency"], () =>
    fetch(`http://localhost:5000/agency/${id}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section>
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          {agency?.agencyName}
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>

      <div
        style={{
          backgroundImage: `url(${agency?.agencyImg})`,
          backgroundPosition: "center",
        }}
      >
        <div
          style={{ backgroundColor: "rgb(192,192,192,0.5)" }}
          className="py-10"
        >
          <div className="card w-4/5 mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
              <img
                className="mx-auto"
                width={300}
                src={agency?.agencyImg}
                alt={agency?.agencyName}
              />
              <hr />
              <h2 className="text-2xl">
                Agency Name:{" "}
                <span className="font-bold">{agency?.agencyName}</span>
              </h2>
              <hr />
              <p>
                Agency Director Name:{" "}
                <span className="font-bold">{agency?.agencyDirectorName}</span>
              </p>
              <hr />
              <p>
                Agency Location:{" "}
                <span className="font-bold">{agency?.agencyLocation}</span>{" "}
              </p>

              <hr />
              <p>
                <span className="font-bold">About Agency:</span>{" "}
                {agency?.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyInfo;
