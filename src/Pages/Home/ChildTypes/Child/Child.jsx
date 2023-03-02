import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../Shared/Loading/Loading";
import DynamicTitle from "../../../Shared/DynamicTitle/DynamicTitle";

const Child = () => {
  DynamicTitle("Child Details");
  const { id } = useParams();
  // react query
  const {
    data: child,
    isLoading,
    error,
  } = useQuery(["child"], () =>
    fetch(
      `https://child-adoption-system-server.onrender.com/api/v1/child/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const {
    img,
    name,
    ageYear,
    ageMonth,
    addChildYear,
    location,
    city,
    disabilities,
    childType,
    gender,
    religion,
    agency,
    description,
  } = child?.data;

  let currentYear = new Date().getFullYear();
  let childDifferentAge = currentYear - parseInt(addChildYear);
  let updateChildAge = parseInt(ageYear) + childDifferentAge;

  if (error) {
    console.log(error);
  }

  return (
    <section className="md:pt-16">
      <div className="bg-info py-10">
        <h1 className="text-center text-2xl font-bold uppercase text-white">
          About Child
        </h1>
        <div className="border-dotted border-b-4 border-indigo-600 w-28 mx-auto mt-1"></div>
      </div>
      <div className="card w-10/12 bg-base-100 shadow-sm rounded-none mx-auto my-5 md:my-10 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2  mx-auto">
          <div className="md:ml-28">
            <img width={200} src={img} alt={name} />
            <h2 className="text-xl mt-2">
              Name: <span className="text-2xl font-bold">{name}</span>
            </h2>
            <p>
              Age:{" "}
              <span className="font-bold">
                {updateChildAge} year, {ageMonth} month
              </span>
            </p>
          </div>
          <div className="md:ml-5">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      Child Type: <span className="font-bold">{childType}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      Gender: <span className="font-bold">{gender}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      Religion: <span className="font-bold">{religion}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      Location: <span className="font-bold">{location}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      City: <span className="font-bold">{city}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      Disabilities:{" "}
                      <span className="font-bold">{disabilities}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      Agency: <span className="font-bold">{agency}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {" "}
                      <Link to={`/child-adoption-form/${id}`}>
                        <button className="btn btn-info text-white rounded-none btn-block">
                          Child Adoption
                        </button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <p className="sm:ml-10 mb-10 mt-4 md:mx-36 text-justify">
          <span className="font-bold">More about child:</span> {description}
        </p>
      </div>
    </section>
  );
};

export default Child;
