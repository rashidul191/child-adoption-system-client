import React from "react";
import { useQuery } from "@tanstack/react-query";
import {  Link, useParams } from "react-router-dom";
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
    fetch(`http://localhost:5000/child/${id}`, {
      method: "GET",
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const {
    img,
    name,
    age,
    location,
    city,
    disabilities,
    childType,
    gender,
    religion,
    agency,
    description,
  } = child;

  if (error) {
    console.log(error);
  }


  return (
    <section className="card w-10/12 bg-base-100 shadow-xl mx-auto my-10 md:mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 ml-10 mx-auto">
        <div className="md:ml-28">
          <img width={200} src={img} alt={name} />
          <h2 className="text-xl">
            Name: <span className="text-2xl font-bold">{name}</span>
          </h2>
          <p>
            Age: <span className="font-bold">{age}</span>
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
                    <Link to={`/child-adaption-form/${id}`}>
                    <button
                    
                      className="btn btn-info text-white rounded-none btn-block"
                    >
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
      <p className="ml-10 mb-10 mt-4 md:mx-36">
        <span className="font-bold">Description:</span> {description}
      </p>
    </section>
  );
};

export default Child;
