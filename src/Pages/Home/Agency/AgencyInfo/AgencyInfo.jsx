import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";

const AgencyInfo = () => {
  const { id } = useParams();
  const { data: agency, isLoading } = useQuery(["agency"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/agency/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          {agency?.data?.agencyName}
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div
        style={{
          backgroundImage: `url(${agency?.data?.agencyImg})`,
          backgroundPosition: "center",
        }}
      >
        <div
          style={{ backgroundColor: "rgb(192,192,192,0.5)" }}
          className="py-10"
        >
          <div className="card w-4/5 mx-auto bg-base-100 shadow-xl">
            <div className="card-body">
              {/* The button to open modal */}
              <label htmlFor={`my-modal-${id}`}>
                <img
                  className="mx-auto cursor-zoom-in"
                  width={300}
                  src={agency?.data?.agencyImg}
                  alt={agency?.data?.agencyName}
                />
              </label>
              <hr />
              <h2 className=" text-xl md:text-2xl">
                Agency Name:{" "}
                <span className="font-bold">{agency?.data?.agencyName}</span>
              </h2>
              <hr />
              <p>
                Agency Director Name:{" "}
                <span className="font-bold">
                  {agency?.data?.agencyDirectorName}
                </span>
              </p>
              <hr />
              <p>
                Agency Location:{" "}
                <span className="font-bold">
                  {agency?.data?.agencyLocation}
                </span>{" "}
              </p>

              <hr />
              <p>
                <span className="font-bold">About Agency:</span>{" "}
                {agency?.data?.description}
              </p>
            </div>
          </div>

          {/* img size modal here */}
          {/* Put this part before </body> tag */}
          <input
            type="checkbox"
            id={`my-modal-${id}`}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box md:w-3/4 max-w-5xl">
              <label
                htmlFor={`my-modal-${id}`}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <div>
                <img
                  width={1000}
                  src={agency?.data?.agencyImg}
                  alt={agency?.data?.agencyName}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgencyInfo;
